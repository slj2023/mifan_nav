
import { defineStore } from 'pinia'
export  const useCounterStore=defineStore('messages',{
  state: ()=>({
    isopen: false,
    messages:[
      {
        role: "system",
        content: "您好！我是您的AI助手，有什么可以帮助您的吗？"

      }
    ],
    inputMessage:'',
    isLoading: false,
  }),

  actions: {
     // 切换AI助手的打开状态
    toggleOpen() {
      this.isopen = !this.isopen
    },
    clearChat() {
      this.messages = [
      { role: 'system', content: '你好！我是米饭助手，有什么可以帮助你的吗？' }
    ]
    },
    async sendMessage(){
      if (this.inputMessage.trim() === '') return; // 如果输入为空则不发送消息
      this.messages.push({
      role: 'user',
      content: this.inputMessage
    })
    // 调用ai接口获取回复
    const userInput= this.inputMessage;
    this.inputMessage = ''; // 清空输入框
    this.isLoading = true; // 设置加载状态   

    try{
      const {OpenAI}=await import('openai');
      const openai=new OpenAI({
        apiKey:import.meta.env.VITE_OPENAI_API_KEY,
        baseURL:import.meta.env.VITE_OPENAI_PROXY,
        dangerouslyAllowBrowser: true,
      });
      const messagesToSend=
        this.messages.map(msg=>({
          role:msg.role,
          content:msg.content,
        }));
        const response=await openai.chat.completions.create({
          model:"gpt-3.5-turbo",
          messages:messagesToSend,
        });
        if(response.choices.length>0){
          this.messages.push({
            role:'assistant',
            content:response.choices[0].message.content,
          });
        }
        console.log('代理 URL:', import.meta.env.VITE_OPENAI_PROXY);
      
    }catch(error){
      console.error('OpenAI API 调用失败:', error);
      this.messages.push({
        role:'assistant',
        content:'很抱歉，我现在无法回答您的问题。',
      })
    }finally{
      this.isLoading = false; // 加载状态结束
    }
  }
  
    
} 
})
