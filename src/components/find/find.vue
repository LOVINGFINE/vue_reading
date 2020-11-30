<template>
    <div class="container">
        <div class="top">
            <input type="text" class="search boxW_info" placeholder="输入要搜索的书籍/作者" v-model="search">
            <router-link 
            :to="'/find_detail?words='+search"
            class="search_icon icon-search"></router-link>
        </div>
        <div class="hot_title">
            搜索热词:
        </div>
        <div class="hot_body clear">
            <router-link
            :class="{'search_words':true,'red':i<3}" 
            :to="'/find_detail?words='+item.word" 
            tag="div"
            v-for="(item,i) in words"
            :key="i">
            {{item.word}}
            </router-link>
        </div>
        <div class="hot_title">
            搜索排行:
        </div>
        <div class="hot_body clear">
            <router-link
            :class="{'hot_link text':true,'red':i<3}" 
            :to="'/find_detail?words='+item.word" 
            tag="div"
            v-for="(item,i) in hot_list"
            :key="i">
            {{i+1}}.{{item.word}}
            </router-link>
        </div>
        <navbar></navbar>
    </div>
</template>
<script>
import navbar from '../nav_bar/nav_bar.vue'
export default {
    data(){
        return {
           search:'',
           hot_list:[],
           words:[]
        }
    },
    components:{
       navbar 
    },
    methods:{
        getInfo(){
            let data = JSON.parse(window.localStorage.getItem('search'))
            console.log(data);
            this.words = data.words.searchHotWords.slice(0,10)
            this.hot_list = data.books.newHotWords.slice(0,10)
        }
    },
    created(){
        this.$store.state.flog = true
        this.getInfo()
    }
}
</script>

<style scoped lang="scss">
.container {
    width: 100%;
    padding-bottom: 55px;
    .top {
        width: 100%;
        height: 60px;
        padding-top: 15px;
        box-sizing: border-box;
        position: relative;
        .search {
            width: 80%;
            height: 35px;
            outline: none;
            border: 1px solid rgb(168, 167, 167);
            border-radius: 17px;
            padding-left: 40px;
            font-size: 15px;
            box-sizing: border-box;
            color: rgb(128, 126, 126);    
        }
        .search_icon {
            position: absolute;
            top: 21px;
            left: 45px;
            font-size: 20px;
            color: rgb(129, 127, 127);
        }
    }
    .hot_title {
        width: 100%;
        height: 35px;
        line-height: 35px;
        padding-left: 25px;
        color: #333;
        font-size: 14px;
        margin-bottom: 12px;
    }
    .hot_body {
        width: 90%;
        margin: 0 auto 25px;
        .search_words {
            padding: 3px 8px;
            float: left;
            margin-right: 10px;
            font-size: 12px;
            color: #333;
        }
        .hot_link {
            width: 40%;
            float: left;
            margin: 5px 5%;
            height: 30px;
            font-size: 12px;
            border-radius: 15px;
            box-sizing: border-box;
            padding-left: 14px;
            background-color: rgb(235, 235, 235);
            line-height: 30px;
        }
        .red {
            color: rgb(160, 1, 1);
        }
    }
    .all {
        width: 100%;
        background-color: rgb(230, 230, 230);
        padding-top: 15px;
        .all_link {
            float: left;
            background-color: #fff;
            width: 46%;
            height: 95px;
            margin: 0 7px 10px;
            position: relative;
            border-radius: 4px;
            .tag_img {
                width: 40px;
                height: 40px;
                position: absolute;
                top: 15px;
                left: 15px;
            }
            .all_name {
                color: rgb(88, 88, 88);
                font-size: 14px;
                display: block;
                margin: 15px 0 0 80px;
            }
            .longInfo {
                font-size: 14px;
                color: rgb(107, 107, 107);
                display: block;
                margin: 32px 0 0 15px;
            }
        }
    }
}
</style>