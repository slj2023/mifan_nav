
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

<style  scoped>
.bot-ion{
  position: fixed;/* 绝对定位 */
  width: 50px;
  height: 50px;
  bottom:23px;
  right:23px;
  background-color: #FFA500; /* 橙色背景 */
  border-radius: 50%; /* 圆形 */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1000; /* 确保在最上层 */
}
.bot-ion:hover{
  transform: scale(1.1); /* 鼠标悬停时放大 */
}
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease; /* 过渡效果 */
}
.slide-enter-from, .slide-leave-to {
  transform: translateY(20px); /* 初始位置 */
  opacity: 0; /* 初始透明度 */
}
.bot-body{
  display: flex;
  position:fixed;/* 绝对定位 */
  right: 10px;
  height: 80%;
  width: 400px;
  background-color: #F5F5F5;;
  bottom: 50px;
  border-radius: 10px; /* 圆角 */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);/* 阴影 */
  flex-direction: column;/* 垂直布局 */
  z-index: 1000; /* 确保在最上层 */
}
.bot-title{
  height: 60px;
  background-color: #FFFFFF;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05); /* 标题栏阴影 */
}
.title-text{
  font-size: 20px;
  margin: 0;
  color: #333; /* 深色文字 */
  flex: 1;  /*占满剩余空间 */
}
.clear-bot{
  font-size:25px;
  background: none;
  border: none;
  cursor: pointer;/* 鼠标样式 */
  margin-right: 5px;
}
.out-bot{
  font-size:25px;
  background: none;
  border: none;
  cursor: pointer;/* 鼠标样式 */
}
.bot-content{
  display: flex;
  flex-direction: column; /* 垂直布局 */
  flex: 1; /* 占满剩余空间 */
  padding: 10px;
  overflow-y: auto; /* 滚动条 */
  background: #f9f9fb;
}
.message-sender{
  display:flex;
  align-items:center;
  margin-bottom:4px; /* 头像和消息间距 */
}
 .flex-row-reverse {
  flex-direction: row-reverse; /* 反转布局*/
}
.sender-useravater{
  width: 36px;
  height: 36px;
  border-radius: 50%; /* 圆形头像 */
  object-fit: cover; /* 保持图片比例 */
  margin-right: 8px; /* 头像与文字间距 */
  border: 1px solid #eee; /* 轻微边框 */
  text-align: right;
}
.sender-username {
  font-size:12px;
  color:#888;
  margin-bottom:4px;
  display:block; /* 让名字独占一行 */
  text-align: right;
}
.sender-botavater{
  width: 36px;
  height: 36px;
  border-radius: 50%; /* 圆形头像 */
  object-fit: cover; /* 保持图片比例 */
  margin-right: 8px; /* 头像与文字间距 */
  border: 1px solid #eee; /* 轻微边框 */
  text-align: left;
}
.sender-botname{
  font-size:12px;
  color:#888;
  margin-bottom:4px;
  display:block; /* 让名字独占一行 */
  text-align: left;

}

.bot-messages{
  margin: 5px 0;/* 上下间距10px 左右间距0 */
  display:flex
}
.right-msg {
  text-align: right;
  flex-direction: row-reverse; /* 右侧消息反转布局 */
  margin-left: auto; /* 自动左边距使消息靠右 */
}
.left-msg {
  text-align: left;
}
.bubble{
  display: inline-block;
  max-width: 80%; /* 限制最大宽度 */
  word-break: break-word; /* 自动换行 */
  white-space: pre-wrap; /* 保留空格和换行 */
  margin-bottom: 10px; /* 消息间距 */

}
.bubble-user {
  background-color: #7B68EE; /* 深邃蓝作为主色调 */
  color: #ffffff;
  padding: 12px 18px;
  border-radius: 18px 18px 4px 18px;
  line-height: 1.6;
  font-size: 15px;
  box-shadow: 0 2px 8px rgba(22, 93, 255, 0.12); /* 微妙阴影增强层次感 */
  margin: 4px 0; /* 增加消息间距 */
}
.bubble-assistant {
  background-color: #e7e8ea; /* 浅灰底色提升质感 */
  color: #333842; /* 深灰文字确保可读性 */
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
  border: none; /* 移除边框 */
  border-radius: 24px; /* 更大圆角提升现代感 */
  background-color: #f5f7fa;
  font-size: 15px;
  transition: all 0.2s ease; /* 平滑过渡效果 */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
.bot-input input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(22, 93, 255, 0.2); /* 聚焦状态高亮 */
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
  transform: translateY(-1px); /* 微小上浮效果 */
  box-shadow: 0 4px 12px rgba(22, 93, 255, 0.25);
}
</style>
