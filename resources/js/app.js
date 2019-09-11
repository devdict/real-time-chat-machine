
require('./bootstrap');

window.Vue = require('vue');
import Vue from 'vue'

//For auto scrolling
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

//Toster Notification
import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'
Vue.use(Toaster, {timeout: 5000})

Vue.component('message', require('./components/message.vue'));

const app = new Vue({
    el: '#app',
    data:{
        message:'',
        chat:{
            message:[],
            user:[],
            color:[],
            time:[],
        },
        typing:'',
        activeUser:0
    },
    watch:{
      message(){
          Echo.private('chat')
              .whisper('typing', {
                  name: this.message
             });
      }
    },
    methods:{ //Event part here
        send(){
            if(this.message.length != 0){
                this.chat.message.push(this.message);
                this.chat.user.push('You');
                this.chat.color.push('success float-right');
                this.chat.time.push(this.getTime());
                axios.post('/send', {
                   message: this.message
                })
                .then(response=> {
                     console.log(response);
                })
                .catch(error=> {
                     console.log(error);
                });
                this.message = "";
            }
        },
        getTime(){
            let time = new Date();
            return time.getHours()+":"+time.getMinutes();
          }
    },
    mounted(){ //Lisiting Part is here
        Echo.private('chat')
            .listen('chatEvent', (e) => {
                this.chat.message.push(e.message);
                this.chat.user.push(e.user);
                this.chat.color.push('secondary float-left');
                this.chat.time.push(this.getTime());
            })
            .listenForWhisper('typing', (e) => {
                if(e.name != ''){
                    this.typing = 'Someone Typing...'
                    // this.typing = e.name
                }else{
                    this.typing = ''
                }
            });
           Echo.join('chat')
                .here((user) => {
                    this.activeUser = user.length;
                })
                .joining((user) => {
                    console.log(user);
                    this.activeUser += 1;
                    this.$toaster.success(user.name+' joined.')
                })

                .leaving((user) => {
                    this.activeUser -= 1;
                    this.$toaster.error(user.name+' leave.')
            });
    }
});
