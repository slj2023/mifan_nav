<template>
  <!-- 浮动求bot -->
   <div class="bot-ion " @click="toggleOpen" title="我是米饭助手，有什么帮助你的吗">
    🍚
   </div>
   <!-- 对话面板 -->
    <div>
      <transition name="slide">
        <div v-if="isopen" class="bot-body">
        <!-- 标题栏 -->
        <div class="bot-title">
           <h3 class="title-text">米饭助手</h3>
           <button class="clear-bot" @click="clearChat" title="清除聊天记录">🗑</button>
           <button class="out-bot" @click="toggleOpen" title="关闭">✕</button>
        </div>
        <!-- 对话内容区 -->
        <div class="bot-content">
          <div class="bot-messages"
          v-for="(message,index) in messages"
          :key="index"
          :class="message.role === 'user' ? 'right-msg' : 'left-msg'"
          >
          <!--头像和名字-->
          <div class="message-sender" :class="message.role === 'user' ? 'flex-row-reverse' : ''">
            <img
            :src="message.role === 'user'? '/logo.png': '/bot.png'"
            :class="message.role === 'user'? 'sender-useravater' : 'sender-botavater'">
            <span  :class="message.role === 'user' ? 'sender-username' : 'sender-botname'">
              {{ message.role === 'user' ? '用户' : '米饭助手' }}
            </span>
          </div>
          <span class="bubble"
            :class="message.role === 'user' ? ' bubble-user' : ' bubble-assistant'"
          >
          {{ message.content }}
          </span>
          </div>
        </div>
        <!-- 输入框 -->
         <div class="bot-input">
          <input
          text="text"
          v-model="inputMessage"
          :disabled="isLoading"
          placeholder="请输入"
          @keyup.enter="sendMessage"
          />
          <button  @click="sendMessage" :disabled="isLoading" title="发送消息">{{ isLoading ? "思考中..." : "发送" }}</button>
         </div>
      </div>
      </transition>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useCounterStore } from '@/stores/counter';
const counterStore = useCounterStore();
const { messages, inputMessage, isopen, isLoading } = storeToRefs(counterStore);
const { toggleOpen, clearChat,sendMessage} = counterStore;
</script>

<style scoped>
.bot-ion{
  position: fixed;
  width: 50px;
  height: 50px;
  bottom:23px;
  right:23px;
  background-color: #FFA500;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1000;
}
.bot-ion:hover{
  transform: scale(1.1);
}
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
.bot-body{
  display: flex;
  position:fixed;
  right: 10px;
  height: 80%;
  width: 400px;
  background-color: #F5F5F5;;
  bottom: 50px;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  flex-direction: column;
  z-index: 1000;
}
.bot-title{
  height: 60px;
  background-color: #FFFFFF;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.title-text{
  font-size: 20px;
  margin: 0;
  color: #333;
  flex: 1;
}
.clear-bot{
  font-size:25px;
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 5px;
}
.out-bot{
  font-size:25px;
  background: none;
  border: none;
  cursor: pointer;
}
.bot-content{
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background: #f9f9fb;
}
.message-sender{
  display:flex;
  align-items:center;
  margin-bottom:4px;
}
 .flex-row-reverse {
  flex-direction: row-reverse;
}
.sender-useravater{
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 8px;
  border: 1px solid #eee;
  text-align: right;
}
.sender-username {
  font-size:12px;
  color:#888;
  margin-bottom:4px;
  display:block;
  text-align: right;
}
.sender-botavater{
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 8px;
  border: 1px solid #eee;
  text-align: left;
}
.sender-botname{
  font-size:12px;
  color:#888;
  margin-bottom:4px;
  display:block;
  text-align: left;
}
.bot-messages{
  margin: 5px 0;
  display:flex
}
.right-msg {
  text-align: right;
  flex-direction: row-reverse;
  margin-left: auto;
}
.left-msg {
  text-align: left;
}
.bubble{
  display: inline-block;
  max-width: 80%;
  word-break: break-word;
  white-space: pre-wrap;
  margin-bottom: 10px;
}
.bubble-user {
  background-color: #7B68EE;
  color: #ffffff;
  padding: 12px 18px;
  border-radius: 18px 18px 4px 18px;
  line-height: 1.6;
  font-size: 15px;
  box-shadow: 0 2px 8px rgba(22, 93, 255, 0.12);
  margin: 4px 0;
}
.bubble-assistant {
  background-color: #e7e8ea;
  color: #333842;
  padding: 12px 18px;
  border-radius: 18px 18px 18px 4px;
  line-height: 1.6;
  font-size: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin: 4px 0;
}
.bot-input {
  display: flex;
  gap: 12px;
  padding: 16px;
  border-top: 1px solid #f0f2f5;
  background-color: #ffffff;
}
.bot-input input {
  flex: 1;
  padding: 14px 16px;
  border: none;
  border-radius: 24px;
  background-color: #f5f7fa;
  font-size: 15px;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
.bot-input input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(22, 93, 255, 0.2);
  background-color: #ffffff;
}
.bot-input button {
  padding: 14px 24px;
  background: #165DFF;
  color: #fff;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(22, 93, 255, 0.2);
}
.bot-input button:hover {
  background: #0E4CD3;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(22, 93, 255, 0.25);
}
</style>