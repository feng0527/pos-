<template>
    <div class="leftnav">
      <ul>
          <li>
              <i class="el-icon-goods"></i>
              <div>收银</div>
          </li>
           <li>
              <i class="el-icon-sold-out"></i>
              <div>店铺</div>
          </li>
           <li>
              <i class="el-icon-more"></i>
              <div>商品</div>
          </li>
           <li>
              <i class="el-icon-star-on"></i>
              <div>会员</div>
          </li>
           <li>
              <i class="el-icon-edit-outline"></i>
              <div>统计</div>
          </li>
      </ul>
    </div>
</template>
<script>
export default {
    
    data(){
        return{

        }
    }
}
</script>
<style scoped>
  .leftnav{
       color:#fff;
       font-size:10px;
       height:100%;
       background-color: #1D8ce0;
       float:left;
       width:5%;
    }
    .iconfont{
       font-size:30px;
    }
    .leftnav ul{
        padding:0px;
        margin: 0px;
    }
    .leftnav li{
        list-style: none;
        text-align: center;
        border-bottom:1px solid #20a0ff;
        padding:20px;
        margin-top: 20px;
    }
    ul,li{
        list-style: none;
        padding: 0;
        margin: 0;
    }
</style>

