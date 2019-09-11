<template>
    <div>
        <li><p :class="className"><slot></slot></p></li><br>
        <small :class="userClass">{{ user }}</small><small :class="timeClass">{{ time }}</small><br>
    </div>
</template>

<script>
    export default {
        props:[
            'color',
            'user',
            'time'
        ],
        computed:{
           className(){
             return 'alert py-1 px-2 mb-2 msg-txt alert-'+this.color;
           },
            userClass(){
               return 'd-inline badge user badge-'+this.color;
           },
            timeClass(){
               return "time d-inline text-dark"+this.color;
            }
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
