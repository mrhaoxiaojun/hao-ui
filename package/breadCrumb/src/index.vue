
<template>
  <div class="h-breadcrumb">
    <span v-for="(item, index) in breadcrumb" :key="index" class="item">
      <template v-if="item.name">
        <router-link :to="{name:item.name}">{{item.bcName}}</router-link>
      </template>
      <template v-else>
        <router-link :to="{path:item.path}">{{item.bcName}}</router-link>
      </template>
      <span class="h-breadcrumb-item-separator" v-if="breadcrumb.length !== index+1">/</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'HBreadCrumb',
  props: {
    breadcrumb: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>>
<style lang="less" scoped>
.h-breadcrumb {
  background: #409eff;
  width: 100%;
}
.h-breadcrumb .item a {
  display: inline-block;
  font-size: 14px;
  color: #fff;
  padding: 5px 10px;
}

.h-breadcrumb .item:last-child a {
  font-weight: 700;
}
.h-breadcrumb .h-breadcrumb-item-separator {
  color: #dcdee2;
}
</style>
