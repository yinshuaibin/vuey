<style>
    .node circle {
      fill: #fff;
      stroke: steelblue;
      stroke-width: 3px;
    }

    .node text {
      font: 12px sans-serif;
    }

    .link {
      fill: none;
      stroke: #ccc;
      stroke-width: 2px;
    }
</style>
<template>
<div>
  <d3-tree :data="treey" node-text="name" zoomable="true" radius="10" style="width:800px;height:1000px"></d3-tree>
</div>
</template>
<script>
import * as d3 from 'd3'
import d3Tree from '../d3test2/Tree.vue'
export default {
  name: 'd3Test',
  components: {
    d3Tree
  },
  props: {
    rect: {
      type: Object,
      default: function () {
        return { left: 0, top: 0, width: 0, height: 0 }
      }
    },
    startId: {
      type: String
    },
    endId: {
      type: String
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isActive: false,
      data1: [99, 71, 78, 25, 36, 92],
      line: '',
      index: [0, 1, 2, 3, 4, 5],
      colorList: ['red', 'blue', 'green', 'yellow', 'black', 'orange'],
      zwidth: 500,
      zheight: 500,
      rectHeight: 60,
      treey: {
        name: '第一个节点',
        children: [
          {
            name: '123'
          },
          {
            name: '456'
          }
        ]
      }
    }
  },
  mounted () {
    // this.makeZ2()
  },
  methods: {
    makeZ2 () {
      var _this = this
      // 设置图表的宽高和margin
      var margin = {top: 20, right: 90, bottom: 30, left: 90}
      var width = 1220 - margin.left - margin.right
      var height = 900 - margin.bottom - margin.top
      // 选中svg对象,将svg元素和子group元素拆分
      var svg = d3.select(this.$el)
        .append('svg')
      // 设置宽高
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)
        // 添加group元素
      var view = svg.append('g')
        // 将group放置在左上方
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      // 创建zoom操作
      var zoom = d3.zoom()
        .scaleExtent([0.1, 100]) // 设置缩放区域为0.1-100倍
        // .filter(function () {
        //   // isWheelEvent为是否滚轮事件
        //   var isWheelEvent = d3.event instanceof WheelEvent
        //   // 返回是否ctrl与滚轮同时触发
        //   return !isWheelEvent || (isWheelEvent && d3.event.ctrlKey)
        // })
        .on('zoom', () => {
          view.attr('transform', 'translate(' + d3.event.transform.x + margin.left + ',' +
          (d3.event.transform.y + margin.top) + ') scale(' + d3.event.transform.k + ')')
        })

      // svg层绑定zoom事件,同时释放zoom双击事件
      svg.call(zoom).on('dblclick.zoom', () => {})

      initdata()
      // var i = 0
      var duration = 750
      var root
      function initdata () {
        // 计算父节点,子节点,高度和深度(parent,children,height,depth)
        root = d3.hierarchy(_this.treey, d => d.children)
        root.x0 = height / 2
        root.y0 = 0

        // 第二层以上元素收起
        // root.children.forEach(collapse)
        // 更新节点状态
        update(root)
        // collapse方法，用于切换子节点的展开和收起状态
        // function collapse (d) {
        //   if (d.children) {
        //     d._children = d.children
        //     d._children.forEach(collapse)
        //     d.children = null
        //   }
        // }
      }

      function update (source) {
        // 大致计算需要放大的倍数
        var scale = (getDepth(root) / 8 || 0.5) + (getMax(root) / 12 || 0.5)
        // 定义Tree层级，并设置宽高
        var treemap = d3.tree().size([height * scale, width])
        // 设置节点的x、y位置信息
        var treeData = treemap(root)
        // 计算新的Tree层级
        var nodes = treeData.descendants()
        var links = treeData.descendants().slice(1)
        // 设置每个同级节点间的y间距为180
        nodes.forEach(function (d) {
          d.y = d.depth * 400
        })
        // node交互绘制
        updateNodes(source, nodes)
        // link交互绘制
        updateLinks(source, links)
        // 为动画保存旧的位置
        nodes.forEach(function (d) {
          d.x0 = d.x
          d.y0 = d.y
        })
        /**      4 node交互绘制 */
        function updateNodes (source, nodes) {
          // 给节点添加id, 用于选择集索引
          var node = svg.selectAll('g.node').data(nodes, (d, i) => d.id || (d.id = ++i))

          // 添加enter操作, 添加类名为node的group元素
          var nodeEnter = node
            .enter()
            .append('g')
            .attr('class', 'node')
            // 默认位置为当前父节点的位置
            .attr('transform', d => 'translate(' + source.y0 + ',' + source.x0 + ')')
            // 给每个新加的节点绑定click事件
            .on('click', click)
          // 给每个新加的group元素添加cycle元素
          nodeEnter.append('circle').attr('class', 'node').attr('r', 1e-6)
            // 如果元素有子节点, 且为收起状态, 则填充浅蓝色
            .style('fill', d => d._children ? 'lightsteelblue' : '#fff')
            .attr('cursor', 'pointer')
          // 给每个新加的group元素添加文字说明
          nodeEnter.append('text').attr('dy', '.35em')
            .attr('x', '13')
            .attr('text-anchor', 'middle') // start: 右对齐  end:左对齐  当前: 居中
            .append('tspan').text(d => d.data.name).attr('x', '-13').attr('y', '-25').style('fill', 'red').style('font-size', '18')
            .append('tspan').text(d => d.data.name).attr('x', '-13').attr('y', '0')
            .append('tspan').text(d => d.data.name).attr('x', '-13').attr('y', '25')
          // 获取update集
          var nodeUpdate = nodeEnter.merge(node)
          // 设置节点的位置变化,添加过渡动画效果
          nodeUpdate.transition().duration(duration)
            .attr('transform', d => 'translate(' + d.y + ',' + d.x + ')')
          // 更新节点的属性和样式
          nodeUpdate.select('circle.node').attr('r', 40)
            .attr('cursor', 'pointer')
            .style('fill', d => d._children ? 'lightsteelblue' : '#fff')
          // 获取exit操作
          var nodeExit = node.exit()
            // 添加过渡动画
            .transition()
            .duration(duration)
            .attr('transform', d => 'translate(' + source.y + ',' + source.x + ')')
            // 移除元素
            .remove()
          // exit集中节点的cycle元素尺寸变为0
          nodeExit.select('circle').attr('r', 1e-6)
          // exit集中节点的text元素可见度将为0
          nodeExit.select('text').style('fill-opacity', 1e-6)
        }
        /**  5. link交互绘制 */
        function updateLinks (source, links) {
          // 更新数据
          var link = svg.selectAll('path.link').data(links, d => d.id)
          // 添加enter操作, 添加类名为link的path元素
          var linkEnter = link
            .enter()
            .insert('path', 'g')
            .attr('class', 'link')
            // 给path添加id
            .attr('id', d => 'textPath' + d.id)
            // 默认位置为当前父节点位置
            .attr('d', function (d) {
              var o = {x: source.x0, y: source.y0}
              return diagonal(o, o)
            })
          // 在link的enter操作中,添加text,同时添加与path匹配的textPath
          link
            .enter()
            .append('text')
            // 给text添加textPath元素
            .append('textPath')
            .attr('xlink:href', d => '#textPath' + d.id)
            // 字体居中
            .style('text-manchor', 'middle')
            .attr('startOffset', '40%')
            // 父节点的name
            .style('fill', 'yellow')
            .text(d => d.parent.data.name)
            .style('font-size', '18')
            .append('tspan')
            .style('fill', 'orange')
            .text(' --> ')
            // 子节点的name
            .append('tspan')
            .style('fill', 'red')
            .text(d => d.data.name)
            .style('font-size', '18')
          // 获取update集
          var linkUpdate = linkEnter.merge(link)
          // 更新添加过渡动画
          linkUpdate.transition().duration(duration).attr('d', function (d) {
            return diagonal(d, d.parent)
          })
          // 获取exit集
          link.exit()
            // 设置过度动画
            .transition()
            .duration(duration)
            .attr('d', function (d) {
              var o = {x: source.x0, y: source.y0}
              return diagonal(o, o)
            })
            // 移除link
            .remove()
        }

        function click (d) {
          if (d._clickid) {
            // 若在200ms内点击第二次, 则不做任何操作, 清空定时器
            clearTimeout(d._clickid)
            d._clickid = null
          } else {
            // 首次点击, 添加定时器,150ms后进行toggle切换
            d._clickid = setTimeout(() => {
              if (d.children) {
                d._children = d.children
                d.children = null
              } else {
                d.children = d._children
                d._children = null
              }
              update(d)
              d._clickid = null
            }, 150)
          }
          // restApi.getAllUser(1, 1000).then(data => {
          // })
          // d.children = [{name: '测试添加'}]
        }
      }
      // 添加贝塞尔曲线的path，衔接与父节点和子节点间
      function diagonal (s, d) {
        return `
          M ${d.y} ${d.x}
                  C ${(s.y + d.y) / 2} ${d.x},
                  ${(s.y + d.y) / 2} ${s.x},
                  ${s.y} ${s.x}
        `
      }
      // 获取最多的子节点数
      function getMax (obj) {
        let max = 0
        if (obj.children) {
          max = obj.children.length
          obj.children.forEach(d => {
            const tmpMax = getMax(d)
            if (tmpMax > max) {
              max = tmpMax
            }
          })
        }
        return max
      }
      // 获取最深层级数
      function getDepth (obj) {
        var depth = 0
        if (obj.children) {
          obj.children.forEach(d => {
            var tmpDepth = getDepth(d)
            if (tmpDepth > depth) {
              depth = tmpDepth
            }
          })
        }
        return 1 + depth
      }
    },
    aaaaa (d) {
      let yyy = {
        name: '新添加的节点'
      }
      console.log(this.treey)
      this.treey.children.push(yyy)
    }
  }
}
</script>
