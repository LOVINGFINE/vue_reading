<template>
    <div class="text">
        <transition
            enter-active-class="fadeInDown"
            leave-active-class="fadeOutUp">
            <div class="animated top_methods" v-show="flog">
                <span class="top_icon icon-chevron-thin-left" @touchstart="$router.back(-1)"></span>
            </div>
        </transition>
        <transition
        enter-active-class="fadeInDown"
        leave-active-class="fadeOutDown">
         <v-touch
         tag="div"
         class="touch_box animated"
         @tap="tapgo"
         @swipeleft="swipeleft"
         @swiperight="swiperight"
         v-show="show_text"
         :swipe-options="{ direction:'all', threshold: 50 }">
            <div class="text_main_box"
            :style="'height:'+this.$store.state.height+'px'">
                <div class="text_top">
                    <h2>{{content.title}}</h2>
                    <i>最近更新: {{updated | opDate(updated)}}</i>
                </div>
                <div :style="'height:'+(this.$store.state.height-100)+'px;fontSize:'+font+'px'" 
                    class="contents">
                    <p class="text_box">{{text}}</p>   
                </div>            
            </div>             
         </v-touch>            
        </transition>
        <transition
        enter-active-class="fadeInUp"
        leave-active-class="fadeOutDown">
        <div id="" class="animated methods" v-show="flog">
            <div class="light_change">
                <span class="pev"
                @touchend="changePage(false)">上一章</span>
                <p id="proess_lang" class="lang" 
                @touchmove="proGet"
                @touchend="changeEnd">
                    <span class="short" :style="'width:'+w_change+'px'">
                        <i class="dot"
                        @touchstart="changeStart"></i>
                    </span>
                </p>
                <span class="next"
                @touchend="changePage(true)">下一章</span>
            </div>            
            <div class="fontSize">
                <span 
                class="fontSize_s icon-subscript2"
                @touchend="fontchange(-1)"></span>
                <input type="number" 
                v-model="font"
                class="font_num">
                <span 
                class="fontSize_l icon-superscript2"
                @touchend="fontchange(1)"></span>
            </div>
            <div class="color_change">
                <a href="#" class="color_item"></a>
                <a href="#" class="color_item"></a>
                <a href="#" class="color_item"></a>
                <a href="#" class="color_item"></a>
                <a href="#" class="color_item"></a>
            </div>
            <div class="more_change">
                <a href="#" class="more_item"><i class="icon-inbox-full"></i>翻页动画</a>
                <a href="#" class="more_item"><i class="icon-eye"></i>护眼模式</a>
                <a href="#" class="more_item"><i class="icon-sidebar"></i>自动阅读</a>
                <a href="#" class="more_item"><i class="icon-flickr2"></i>更多设置</a>
            </div>
        </div>            
        </transition>
    </div>
</template>
<script>
import { log } from 'util'
export default {
    data(){
        return {
          flog:false,
          show_text:false,
          content:{},
          updated:'00-00-00T00:00:00.239Z',
          text:'',
          list:[],
          page_w:null,
          page: null,
          w_change:null,
          left:null,
          max_x:null,
          font:'14'
        }
    },
    watch:{
        'page':function(newval,oldval){
              this.w_change = this.page*this.page_w 
              if(newval>=0){
                this.show_text = false
                this.getData(encodeURIComponent(this.list[newval].link)) 
              }     
            }
    },
    computed:{

    },
    methods:{
        getData(link){
            this.$axios.get(`https://novel.juhe.im/chapters/${link}`).then(res=>{
                this.content = res.data.chapter
                this.updated = res.data.chapter.updated
                this.text = res.data.chapter.cpContent 
                this.show_text = true  
            })
        },
        swipeleft(){
             
           
        },
        swiperight(){
            console.log(1);
                    
        },
        tapgo(){
            let x = event.clientX
            if(this.flog){
                this.flog = false
            }else if(x>(this.max_x/2-30)&&x<(this.max_x/2+30)){
                this.flog = true
            }else if(x<(this.max_x/2-30)){
                this.page--
                this.flog = false
            }else if(x>(this.max_x/2+30)){
                this.page++
            }
        },
        changePage(e){
            if(e){
                this.page++
            }else if(this.page>0){
                this.page--
            }
        },
        fontchange(e){
            if(e==1&&this.font<28){
                this.font = parseInt(this.font)+2
            }else if(e==(-1)&&this.font>12){
                 this.font = parseInt(this.font)-2
            }   
        },
        changeStart(){
            this.start_dot = true
        },
        changeEnd(){
            this.start_dot = false
            console.log(parseInt(this.w_change/this.page_w));
            this.page =  parseInt(this.w_change/this.page_w)
        },
        proGet(){
            let w = event.targetTouches[0].clientX
            if(this.start_dot){
                this.w_change = w - this.left
            }   
        }
    },
    filters:{
        opDate(updated){
            let arr = updated.split(/[T\:\-]/g)
            return `${arr[0]}年${arr[1]}月${arr[2]}日${arr[3]}:${arr[4]}`
        }
    },
    created(){
        this.$store.state.flog = false
        this.getData(encodeURIComponent(this.$route.query.link))
        this.list = JSON.parse(window.localStorage.getItem('chapters'))
                
    },
    mounted(){
        this.max_x = window.screen.availWidth
        this.page_w = this.max_x*12/(this.list.length*25)
        this.page = parseInt(this.$route.query.p)||0
        this.left = this.max_x*13/50
        this.max_y = window.screen.availHeight   
    }
}
</script>

<style scoped lang="scss">
    .text {
        width: 100%;
        .methods {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            width: 100%;
            position: fixed;
            bottom: 0;
            height: 200px;
            background-color: rgb(255, 255, 255);
            z-index: 6000;
            transition: all 0.5s linear;
            .light_change {
                width: 80%;
                height: 45px;
                margin: 0 auto;
                position: relative;
                .pev {
                   font-size: 14px;
                   float: left;
                   line-height: 45px;
                   color: #333;
                }
                .pev:hover {
                    color: rgb(133, 2, 2);
                }
                .lang {
                    position: absolute;
                    width: 60%;
                    height: 2px;
                    background-color: rgb(58, 58, 58);
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                    .short {
                        width: 0;
                        height: 2px;
                        background-color: rgb(221, 220, 220);
                        display: block;
                        position: relative;
                    }
                    .dot {
                        width: 13px;
                        height: 13px;
                        border: 1px solid rgb(194, 194, 194);
                        position: absolute;
                        top: 50%;
                        right: 0;
                        transform: translateY(-50%);
                        background-color: rgb(255, 255, 255);
                        border-radius: 50%;
                    }
                }
                .next {
                   font-size: 14px;
                   color: #333;
                   float: right;
                   line-height: 45px;
                }
                .next:hover {
                    color: rgb(131, 2, 2);
                }
            }
            .fontSize {
                width: 40%;
                height: 60px;
                position: relative;
                .font_num {
                    position: absolute;
                    width: 25px;
                    height: 25px;
                    font-size: 16px;
                    outline: none;
                    border: none;
                    font-weight: 700;
                    background-color: rgba(0, 0, 0 ,0.4);
                    color: rgb(15, 15, 15);
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                }
                .fontSize_s {
                    float: left;
                    width: 30%;
                    font-size: 24px;
                    margin: 19px 0 0 12px;
                    height: 30px;
                     text-align: center;
                     color: #333;
                }
                .fontSize_l {
                    float: right;
                    color: #333;
                    margin: 19px 16px 0 0;
                    width: 30%;
                    height: 30px;
                    font-size: 24px;
                    text-align: center;
                }
            }
            .color_change {
                width: 90%;
                height: 40px;
                margin: 0 auto;
                white-space: nowrap;
                overflow: auto;
                .color_item {
                    float: left;
                    height: 25px;
                    width: 65px;
                    margin: 8px 10px;
                    background-color: #888;
                    border-radius: 15px;
                }
            }
            .more_change {
                width: 90%;
                height: 35px;
                display: flex;
                margin: 0 auto;
                .more_item {
                    flex: 1;
                    height: 35px;
                    text-align: center;
                    font-size: 12px;
                    color: rgb(65, 65, 65);
                    i {
                        font-style: normal;
                        font-size: 16px;
                        display: block;
                        color: rgb(64, 64, 65);
                        margin: 5px auto;
                    }
                }
            }
        }
        .top_methods {
            position: fixed;
            z-index: 50;
            top: 0;
            width: 100%;
            height: 45px;
            padding: 0 15px; 
            background-color: rgba(24, 23, 23,0.5);
            transition: all 0.2s linear;
            .top_icon {
                font-size: 20px;
                line-height: 45px;
                color: #fff;
            }

        }
        .touch_box {
            width: 100%;
            height: 667px;
        }
        .text_main_box {
            width: 100%;
            background-color: #fff;
            .text_top {
                width: 100%;
                height: 55px;
                position: relative;
                h2 {
                    font-size: 20px;
                    font-weight: 400;
                    color: rgb(12, 12, 12);
                    line-height: 55px;
                    width: 100%;
                    text-align: center;
                }
               i {
                    font-style: normal;
                    font-size: 14px;
                    color: #999;
                    position: absolute;
                    right: 25px;
                    top: 45px;
                }            
            }            
            .contents {
                font-size: 14px;
                line-height: 35px;
                margin-top: 20px;
                padding: 0 15px;
                color: #333;
                width: 100%;
                box-sizing: border-box;
                white-space:normal;
                word-break:break-all;
                word-wrap:break-word;
                overflow: auto;
            }
        }
        
    }
</style>