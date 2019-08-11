<template>
  <div class="my-image">
    <div class="img-btn">
      <img :src="value||defaultImage" @click="openDialog" alt />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <el-radio-group v-model="reqParams.collect" @change="changeCollect" size="mini">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <div class="img_list">
            <div
              class="img_item"
              @click="selectedImage(item.url)"
              :class="{selected:item.url===selectedImageUrl}"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" alt />
            </div>
          </div>
          <el-pagination
            v-if="total>reqParams.per_page"
            background
            layout="prev,pager,next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="changePager"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleSuccess"
            :headers="uploadHeaders"
            name="image"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" alt />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary" @click="confirmImage">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      activeName: 'image',
      images: [],
      total: 0,
      selectedImageUrl: null,
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      uploadImageUrl: null,
      // value: defaultImage
      defaultImage
    }
  },
  methods: {
    openDialog () {
      this.dialogVisible = true
      this.selectedImageUrl = null
      this.uploadImageUrl = null
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    changeCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    handleSuccess (res) {
      this.uploadImageUrl = res.data.url
    },
    confirmImage () {
      if (this.activeName === 'image') {
        this.$emit('input', this.selectedImageUrl)
        // this.value = this.selectedImageUrl
      } else {
        this.$emit('input', this.uploadImageUrl)
        // this.value = this.uploadImageUrl
      }
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.img-btn {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.dialog-footer {
  display: inline-block;
  width: 100%;
  text-align: center;
}
.img_list {
  margin-top: 10px;
  .img_item {
    position: relative;
    display: inline-block;
    width: 160px;
    height: 120px;
    border: 1px dashed #ddd;
    margin: 0 15px 10px 0;
    &.selected {
      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 160px;
        height: 120px;
        background: url(../assets/images/selected.png) rgba(0, 0, 0, 0.2)
          no-repeat center / 150px 150px;
      }
    }
    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: contain;
    }
  }
}
.my-image{
  display: inline-block;
  margin-right: 20px;
}
</style>
