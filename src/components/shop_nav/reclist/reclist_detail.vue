<template>
    <div class="reclist_detail">
        <div class="reclist_top">
            <router-link to="/shop/reclist"
            class="go_back icon-chevron-thin-left">
            </router-link>
        </div>
        <div class="show_main" :style="'height:'+(this.$store.state.height-80)+'px'">
            <div class="booklist_logo text"><span class="icon-award logo_tag"></span>{{list.title}}</div>
            <div class="author_message">
                <div class="message_top">
                    <img :src="url" class="author_img">
                    <div class="author_info">
                        <span class="author_name"></span>
                        <i class="updated_info">共部 · {{list.created | optime(list.created)}}</i>
                    </div>
                </div>
                <p class="book_desc">{{list.desc}}</p>
            </div>
            <div class="booklist_tags">

            </div>
            <div class="booklist_item" v-for="item in books" :key="item._id">
                <router-link
                :to="'/book_detail?id='+item.book._id"
                class="item_link">
                <img :src="'http://statics.zhuishushenqi.com'+item.book.cover" class="link_img">
                <div class="item_right">
                    <span>{{item.book.title}}</span>
                    <i>{{item.book.author}} · {{item.book.majorCate}} · {{item.book.cat}}</i>
                </div>
                </router-link>
                <p class="book_comments">
                    {{item.comment}}
                </p>
                <div class="item_methods">
                    <a href="#" class="methods-single">
                        <span class="icon-thumbs-up"></span>
                        {{item.book.latelyFollower | opfans(item.book.latelyFollower)}}
                    </a>
                    <a href="#" class="methods-single">
                        <span class="icon-link"></span>
                        分享
                    </a>
                    <a href="#" class="methods-single">
                        <span class="icon-stack"></span>
                        加入书架
                    </a>
                </div>
            </div>
        </div>
        <div class="bottom_nav">
            <a href="#" class="add_bottom">
                <span class="bottom_icon icon-map-pin"></span>
                22万</a>
                <span class="dived"></span>
            <a href="#" class="add_bottom">
                <span class="bottom_icon icon-star-empty"></span>
                {{list.collectorCount}}</a>
                <span class="dived"></span>
            <router-link to="" class="add_bottom">
                <span class="bottom_icon icon-comments"></span>
                4445</router-link>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
           url:'',
           list:{},
           books:[]
        }
    },
    filters:{
    optime(str){
        let newstr = str || '2019-01-01T00:00:00.450Z'
        let arr = newstr.split(/[T\:\-]/g)
        return `${arr[0]}年${arr[1]}月${arr[2]}日${arr[3]}:${arr[4]}`
       },
       opfans(str){
           return parseInt(str/10000)>0?parseInt(str/10000)+'万':str
       }
    },
    methods:{
        getList(id){
            this.$axios.get(`https://novel.juhe.im/booklists/${id}`).then(res=>{
                console.log(res.data.bookList);
                this.url = 'http://statics.zhuishushenqi.com'+res.data.bookList.author.avatar
                this.list = res.data.bookList
                this.books = res.data.bookList.books
            })
        },
        soll(){   
        }
    },
    created(){
        this.$store.state.flog = false
        this.getList(this.$route.query.id)
    },
    mounted(){

    }
}
</script>

<style scoped lang="scss">
.reclist_detail {
    width: 100%;
    .reclist_top {
        width: 100%;
        height: 45px;
        padding-left: 15px;
        line-height: 45px;
        box-sizing: border-box;
        border-bottom: 1px solid rgb(197, 196, 196);
        .go_back {
            line-height: 45px;
            font-size: 20px;
            color: rgb(139, 3, 3);
        }
    }
    .bottom_nav {
        width: 100%;
        height: 35px;
        position: fixed;
        border-top: 1px solid rgb(211, 211, 211);
        display: flex;
        bottom: 0;
        background-color: #fff;
        .add_bottom {
            flex: 1;
            line-height: 35px;
            color: #333;
            font-size: 12px;
            text-align: center; 
            position: relative; 
        }
        .dived {
            width: 1px;
            height: 12px;
            background-color: rgb(167, 167, 167);
            position: relative;
            top: 50%;
            transform: translateY(-50%);
        }
        .bottom_icon {
            color: #333;
            font-size: 18px;
            position: absolute;
            top: 50%;
            transform: translateY(-60%);
            left: 20px;
        }
    }
    .show_main {
        width: 100%;
        background-color: rgb(245, 245, 245);
        box-sizing: border-box;
        overflow: auto;
        .booklist_logo {
            width: 100%;
            height: 35px;
            font-size: 14px;
            color: rgb(87, 2, 2);
            box-sizing: border-box;
            line-height: 35px;
            background-color: #fff;
            padding: 0 20px 0 70px;
            box-sizing: border-box;
            position: relative;
            .logo_tag {
                position: absolute;
                font-size: 22px;
                color: rgb(143, 3, 3);
                top: 3px;
                left: 40px;
            }
        }
        .author_message {
            width: 100%;
            height: 160px;
            padding: 10px 15px;
            background-color: #fff;
            box-sizing: border-box;
            margin-bottom: 10px;
            border-bottom: 1px solid rgb(224, 224, 224);
            .message_top {
                width: 100%;
                height: 40px;
                .author_img {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    float: left;
                }
                .author_info {
                     float: left;
                     width: 60%;
                     margin-left: 10px;
                     height: 100%;
                     .author_name {
                         display: block;
                         width: 100%;
                         height: 20px;
                         color: #333;
                         font-size: 14px;
                         line-height: 20px;
                     }
                     .updated_info {
                         font-style: normal;
                         font-size: 12px;
                         color: rgb(131, 130, 130);
                         line-height: 20px;
                     }
                }                
            }
            .book_desc {
                width: 100%;
                line-height: 25px;
                font-size: 14px;
                color: #333;
                margin-top: 15px;
                word-break: break-all;
            }            
        }
        .booklist_tags {
            width: 100%;
            height: 40px;
            border-bottom: 1px solid rgb(219, 219, 219);
            background-color: #fff;
        }
        .booklist_item {
            width: 100%;
            height: 200px;
            background-color: #fff;
            margin-bottom: 10px;
            padding: 15px 15px 0;
            box-sizing: border-box;
            position: relative;
            .item_link {
                display: block;
                width: 100%;
                height: 60px;
                color: #333;
                position: relative;
                .link_img {
                    width: 45px;
                    height: 60px;
                    position: absolute;
                }
                .item_right {
                    width: 70%;
                    margin-left: 60px;
                    height: 60px;
                    i {
                        display: block;
                        width: 100%;
                        height: 20px;
                        font-size: 13px;
                        color: rgb(104, 103, 103);
                        line-height: 20px;
                        font-style: normal;
                    }
                    span {
                        display: block;
                        font-size: 16px;
                        width: 100%;
                        height: 40px;
                        line-height: 40px;                    
                    }
                }
            }
            .book_comments {
                line-height: 25px;
                font-size: 14px;
                color: rgb(100, 100, 100);
                width: 100%;
                margin-top: 12px;
                word-break: break-all;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;
            }
            .item_methods {
                width: 90%;
                height: 35px;
                border-top: 1px solid rgb(231, 230, 230);
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                }
                .methods-single {
                    flex: 1;
                    color: rgb(102, 101, 101);
                    line-height: 35px;
                    text-align: center;
                    position: relative;
                    span {
                        position: absolute;
                        top: 50%;
                        transform: translateY(-60%);
                        font-size: 14px;
                        left: 15px;
                    }
                }
        }
    }
}

</style>