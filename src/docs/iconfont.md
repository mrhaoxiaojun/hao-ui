
# iconfont

----
- 将阿里图标官网下载的文件，在demo_index.html中引入```jquery```加入如下代码，生成图标JSON文件内容及样式表内容，粘贴到对应的地方

```js
<script>
  $(document).ready(function () {
    let iconStyle = "";
    let iconJson = [];

    $(`.tab-container .unicode .icon_lists>li`).each(function() {
      var name = $(this).find(`.name`).html();
      var code =$(this).find(`.code-name`).html().replace('&amp;#x','').replace(';','')

      iconStyle += '.h-icon-'+name+':before { content: "\\'+code + '"; }\n';
      iconJson.push(`icon-${name}`)
    })
    console.log(iconStyle);
    console.log(JSON.stringify(iconJson));
  })
</script>
```
- iconStyle：图标样式，拷贝至icon.styl
- iconJson：图标json，方便遍历
