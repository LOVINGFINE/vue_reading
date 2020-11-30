<template>
    <div class="container">
        <div class="top">
            <a href="" class="mybooks"><span class="mybooks-icon icon-file-text"></span>我的书架</a>
            <div class="top_right">
                <a href="" class="top_search icon-search"></a>
                <a href="" class="top_more icon-ellipsis-v"></a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
          list:{}
        }
    },
    methods:{
         getRecommend(){
             let recommend_m = JSON.parse(window.localStorage.getItem('rank_male')).hot.ranking.books
             let recommend_f = JSON.parse(window.localStorage.getItem('rank_female')).hot.ranking.books
             let recommend_pic = JSON.parse(window.localStorage.getItem('rank_pic')).hot.ranking.books  
               
            this.$axios.get(`https://novel.juhe.im/recommend/${recommend_m[0]._id}`).then(res=>{
                window.localStorage.setItem('recommend_m',JSON.stringify(res.data.books))
            })
            this.$axios.get(`https://novel.juhe.im/recommend/${recommend_f[0]._id}`).then(res=>{
                window.localStorage.setItem('recommend_f',JSON.stringify(res.data.books))
            })
            this.$axios.get(`https://novel.juhe.im/recommend/${recommend_pic[0]._id}`).then(res=>{
                window.localStorage.setItem('recommend_pic',JSON.stringify(res.data.books))
            })
         },
         getSearch(){
            let all = [
                this.$axios.get(`https://novel.juhe.im/search-hotwords`),
                this.$axios.get(`https://novel.juhe.im/hot-books`)
            ]
            this.$axios.all(all).then(this.$axios.spread((a,b)=>{
                   let data_m = {words:a.data,books:b.data}
                   window.localStorage.setItem('search',JSON.stringify(data_m)) 
            }))
        }
    },
    created(){
        this.$store.state.flog = true
         this.getSearch()
    //    this.getRecommend()  
    },
    beforeMount(){
        
    }
}
</script>

<style scoped lang="scss">
  .container {
        width: 100%;
        overflow-x: hidden;
        .top {
            width: 100%;
            height: 65px;
            border-bottom: 1px solid #ccc;
            position: relative;
            .mybooks {
                font-size: 18px;
                color: rgb(136, 14, 14);
                padding-left: 50px;
                line-height: 65px;
                .mybooks-icon {
                    position: absolute;
                    font-size: 26px;
                    color: #333;
                    padding-top: 18px;
                    left: 12px;
                    top: 5px;
                }
            }
            .top_right {
                float: right;
                height: 100%;
                width: 120px;
                box-sizing: border-box;
                position: relative;
                .top_search {
                    position: absolute;
                    top: 20px;
                    font-size: 24px;
                    color: rgb(126, 125, 125);
                }
                .top_more {
                    font-size: 32px;
                    color: rgb(141, 139, 139);
                } 
            }
    }

  }
</style>