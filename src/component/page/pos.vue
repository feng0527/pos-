<template>
    <div class="pos">
        <div>
            <el-row>
                <el-col :span="7" id="order-list">
                    <el-tabs >
                        <el-tab-pane label="点餐" >
                            <el-table 
														:data="tabledata" 
														border 
														style="width:100%">
                                <el-table-column prop="goodsName" label="商品" align="center"></el-table-column>
                                <el-table-column prop="count" label="数量" align="center"></el-table-column>
                                <el-table-column prop="price" label="金额" align="center"></el-table-column>  
                                <el-table-column label="操作" width="100" fixed="right" align="center">
																	<template slot-scope="scope">
																			<el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
																			<el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
																	</template>
                                </el-table-column>      
                            </el-table>
                        </el-tab-pane>
												<div class="div-tabs">
													<p>合计</p>
													<p>数量:{{this.totalCount}}</p>
													<p>总价:{{this.totalMoney}}</p>
													<p></p>
                        </div>
                        <div class="div-tabs">
                            <el-button type="warning" >挂单</el-button>
                            <el-button type="danger" @click="delAllGoods()">删除</el-button>
                            <el-button type="success" >结账</el-button>
                        </div>
                        <el-tab-pane label="挂单"></el-tab-pane>
                        <el-tab-pane label="外卖"></el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :span="17">
                    <div class="often-goods">
                        <div class="title">常用商品</div>
                        <div class="often-goods-list">
                            <ul>
                                <li v-for="(goods, index)  in oftenGoods" :key="index" @click="addOrderList(goods)">
                                    <span>{{goods.goodsName}}</span>
                                    <span class="o-price">￥{{goods.price}}元</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="good-type">
                        <el-tabs>
                            <el-tab-pane label="汉堡">
                                <ul class="cookList">
                                    <li v-for="(goods,index) in type0Goods" :key="index" @click="addOrderList(goods)">
                                        <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                                        <span class="foodName">{{goods.goodsName}}</span>
                                        <span class="foodPrice">￥{{goods.price}}元</span>
                                    </li>
                                </ul>
                            </el-tab-pane>
                            <el-tab-pane label="小食">
                                <ul class="cookList">
                                    <li v-for="(goods,index) in type1Goods" :key="index" @click="addOrderList(goods)">
                                        <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                                        <span class="foodName">{{goods.goodsName}}</span>
                                        <span class="foodPrice">￥{{goods.price}}元</span>
                                    </li>
                                </ul>
                            </el-tab-pane>
                            <el-tab-pane label="饮料">
                                <ul class="cookList">
                                    <li v-for="(goods,index) in type2Goods" :key="index" @click="addOrderList(goods)">
                                        <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                                        <span class="foodName">{{goods.goodsName}}</span>
                                        <span class="foodPrice">￥{{goods.price}}元</span>
                                    </li>
                                </ul>
                            </el-tab-pane>
                            <el-tab-pane label="套餐">
                                <ul class="cookList">
                                    <li v-for="(goods,index) in type3Goods" :key="index" @click="addOrderList(goods)">
                                        <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                                        <span class="foodName">{{goods.goodsName}}</span>
                                        <span class="foodPrice">￥{{goods.price}}元</span>
                                    </li>
                                </ul>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import axios from "axios";

export default {
  name: "pos",
  data() {
    return {
      tabledata: [
        {
          goodsName: "可口可乐",
          price: 8,
          count: 1
        },
        {
          goodsName: "香辣鸡腿堡",
          price: 15,
          count: 1
        },
        {
          goodsName: "爱心薯条",
          price: 8,
          count: 1
        },
        {
          goodsName: "甜筒",
          price: 8,
          count: 1
        }
      ],
      tabledata: [],
      oftenGoods: [],
      type0Goods: [],
      type1Goods: [],
      type2Goods: [],
      type3Goods: [],
      totalCount: 0,
      totalMoney: 0
    };
  },
  created: function() {
		console.log(12)
    axios
      .get("http://jspang.com/DemoApi/oftenGoods.php")
      .then(repose => {
        console.log(repose);
        this.oftenGoods = repose.data;
      })
      .catch(error => {
        console.log(error);
        alert("网络错误，不能访问");
      });
    axios
      .get("http://jspang.com/DemoApi/typeGoods.php")
      .then(repose => {
        this.type0Goods = repose.data[0];
        this.type1Goods = repose.data[1];
        this.type2Goods = repose.data[2];
        this.type3Goods = repose.data[3];
      })
      .catch(error => {
        console.log(error);
        alert("网络错误，不能访问");
      });
  },
  methods: {
    addOrderList(goods) {
      let isHave = false;
      this.totalMoney = 0;
      this.totalCount = 0;
      for (let i = 0; i < this.tabledata.length; i++) {
        if (this.tabledata[i].goodsId == goods.goodsId) {
          isHave = true;
        }
      }
      if (isHave) {
        let arr = this.tabledata.filter(o => o.goodsId == goods.goodsId);
				arr[0].count++;
				this.getAllMoney();
      } else {
        let newGoods = {
          goodsId: goods.goodsId,
          goodsName: goods.goodsName,
          price: goods.price,
          count: 1
        };
				this.tabledata.push(newGoods);
				this.getAllMoney();
      }
    },
    delSingleGoods(goods) {
			this.tabledata = this.tabledata.filter(o => o.goodsId !== goods.goodsId);
			this.getAllMoney();
    },
    getAllMoney() {
      this.totalCount = 0;
      this.totalMoney = 0;
      if (this.tabledata) {
          this.tabledata.forEach(item => {
          this.totalCount += item.count;
          this.totalMoney = this.totalMoney + item.price * item.count;
        });
      }
		},
		  delAllGoods() {
            this.tabledata = [];
            this.totalCount = 0;
            this.totalMoney = 0;
			}
  }
};
</script>
<style scoped>
#order-list {
  text-align: center;
}
.div-tabs {
  margin-top: 80px;
}
.good-type {
  clear: both;
  margin-top: 300px;
}
.title {
  height: 20px;
  border-bottom: 1px solid #d3dce6;
  background: #f9fafc;
  padding: 10px;
}
.often-goods-list ul li {
  list-style: none;
  float: left;
  border: 1px solid #e5e9f2;
  padding: 10px;
  margin: 5px;
  background-color: #fff;
}
.o-price {
  color: #58b7ff;
}
.cookList li {
  list-style: none;
  width: 23%;
  border: 1px solid #e5e9f2;
  height: auot;
  overflow: hidden;
  background-color: #fff;
  padding: 2px;
  float: left;
  margin: 2px;
}
.cookList li span {
  display: block;
  float: left;
}
.foodImg {
  width: 40%;
}
.foodName {
  font-size: 18px;
  padding-left: 10px;
  color: brown;
}
.foodPrice {
  font-size: 16px;
  padding-left: 10px;
  padding-top: 10px;
}
</style>


