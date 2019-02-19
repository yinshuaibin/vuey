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
    <h1>d3测试页面</h1>
    <div>
        <hr>
        <svg ref="oneSvg"></svg>
        <hr>
        <div ref="twoSvg"></div>
    </div>
</div>
</template>
<script>
import * as d3 from 'd3'
export default {
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
      rectHeight: 60
    }
  },
  mounted () {
    // this.calculatePath()
    this.makeZ()
    this.makeZ2()
  },
  methods: {
    getScales () {
      const x = d3.scaleTime().range([0, 430])
      const y = d3.scaleLinear().range([210, 0])
      d3.axisLeft().scale(x)
      d3.axisBottom().scale(y)
      x.domain(d3.extent(this.data1, (d, i) => i))
      y.domain([0, d3.max(this.data1, d => d)])
      return { x, y }
    },
    calculatePath () {
      const scale = this.getScales()
      const path = d3.line()
        .x((d, i) => scale.x(i))
        .y(d => scale.y(d))
      this.line = path(this.data1)
    },
    makeZ () {
      // 线性比例尺,用来给柱状图的高度赋值
      var linear = d3.scaleLinear()
        .domain([0, d3.max(this.data1)])
        .range([0, this.zwidth])
      // 序数比例尺,用来给柱状图的颜色赋值
      var ordinal = d3.scaleOrdinal()
        .domain(this.index)
        .range(this.colorList)
      var oneSvg = d3.select(this.$refs.oneSvg)
      oneSvg.attr('width', this.zwidth)// 设定宽度
        .attr('height', this.rectHeight * this.data1.length + 5)// 设定高度
      oneSvg.selectAll('rect').data(this.data1).enter().append('rect')
        .attr('transform', (d, i) => 'translate(20,' + i * this.rectHeight + ')')
        // .attr('x', 20)
        // .attr('y', (d, i) => i * this.rectHeight)
        .attr('width', linear)
        .attr('height', this.rectHeight - 10)
        .attr('fill', ordinal)
    },
    makeZ2 () {
      var treeData = {
        name: 'Top Level',
        children: [
          {
            name: 'Level 2: A',
            children: [{ name: 'Son of A' }, { name: 'Daughter of A' }]
          },
          { name: 'Level 2: B' }
        ]
      }
      var margin = { top: 20, right: 90, bottom: 30, left: 90 }
      var width = 960 - margin.left - margin.right
      var height = 500 - margin.top - margin.bottom
      // 设置图表的宽高和Margin
      console.log(treeData)
      // d3.select(this.$refs.mytest).style('color', '#fff000').style('font-size', '24px')
      var svg = d3.select(this.$refs.twoSvg)
        .append('svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)

        // 在svg中 添加group元素
       var ivew = svg.append('g')
        // 将group放置在左上方
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      // 创建zoom操作
      var zoom = d3.zoom()
        .scaleExtent([1, 8]) // 设置缩放区域为1-8倍
        .on('zoom', () => {
          ivew.attr('transform', 'translate(' + d3.event.transform.x + margin.left + ',' +
          (d3.event.transform.y + margin.top) + ') scale(' + d3.transform.k + ')')
        })
      // svg绑定zoom事件
      svg.call(zoom).on('dblclick.zoom', () => {})

      var i = 0
      var duration = 750
      var root = {}
      // 定义Tree层级 并设置宽高
      var treemap = d3.tree().size([height, width])
      // 计算父节点，子节点， 高度和深度 （parent , children, height, depth）
      root = d3.hierarchy(treeData, function (d) {
        return d.children
      })
      // 设置第一个 元素的起始位置
      root.x0 = height / 2
      root.y0 = 0
      // 第二个节点 以上元素收起
      root.children.forEach(collapse)
      // 更新节点状态
      update(root)
      function collapse (d) {
        if (d.children) {
          d._children = d.children
          d._children.forEach(collapse)
          d.children = null
        }
      }
      function update (source) {
        // 设置节点的x, y位置信息
        var treeData = treemap(root)
        // 计算新的 Tree层级
        var nodes = treeData.descendants()
        var links = treeData.descendants().slice(1)
        // 设置每个同级节点间的 y 间距
        nodes.forEach(function (d) {
          d.y = d.depth * 180
        })
        // ****************** 节点部分操作 ***************************
        // 给节点添加id, 用于选择集 索引
        var node = svg.selectAll('g.node').data(nodes, function (d) {
          return d.id || (d.id = ++i)
        })
        // 添加enter操作， 添加类名为node的group元素
        var nodeEnter = node.enter()
          .append('g')
          .attr('class', 'node')
          // 默认位置为当前父节点的位置
          .attr('transform', function (d) {
            return 'translate(' + source.y0 + ',' + source.x0 + ')'
          })
          // 给每个新加的group节点绑定click事件
          .on('click', click)
        // 给每个新加的 group元素添加cycle元素
        nodeEnter.append('circle')
          .attr('class', 'node')
          .attr('r', 1e-6)
          // 如果有子节点，并且为手气装填，则填充浅蓝色
          .style('fill', function (d) {
            return d._children ? 'lightsteelblue' : '#fff'
          })
        // 给每个新加的group 添加文字说明
        nodeEnter.append('text')
          .attr('dy', '.35em')
          .attr('x', function (d) {
            return d.children || d._children ? -13 : 13
          })
          .attr('text-anchor', function (d) {
            return d.children || d._children ? 'end' : 'start'
          })
          .text(function (d) {
            return d.data.name
          })
        // 获取update集
        var nodeUpdate = nodeEnter.merge(node)
        // 设置节点的位置变化， 添加过度动画效果
        nodeUpdate.transition()
          .duration(duration)
          .attr('transform', function (d) {
            return 'translate(' + d.y + ',' + d.x + ')'
          })
        // 更新节点的属性和样式
        nodeUpdate.select('circle.node')
          .attr('r', 10)
          .style('fill', function (d) {
            return d._children ? 'lightsteelblue' : '#fff'
          })
          .attr('cursor', 'pointer')
        // 获取exit操作
        var nodeExit = node.exit()
          // 添加过度动画
          .transition()
          .duration(duration)
          .attr('transform', function (d) {
            return 'translate(' + source.y + ',' + source.x + ')'
          })
          // 移除元素
          .remove()
        // exit集中 节点的cycle元素尺寸变为0
        nodeExit.select('circle').attr('r', 1e-6)
        // exit集中节点的text元素 可见度降为0
        nodeExit.select('text').style('fill-opacity', 1e-6)
        // ****************** 连接线部分操作 ***************************
        // 更新数据
        var link = svg.selectAll('path.link').data(links, function (d) {
          return d.id
        })
        // 添加enter操作, 添加类名 为link的path元素
        var linkEnter = link.enter()
          .insert('path', 'g')
          .attr('class', 'link')
          // 默认位置为当前父节点的位置
          .attr('d', function (d) {
            var o = {x: source.x0, y: source.y0}
            return diagonal(o, o)
          })
        // 获取updata集
        var linkUpdate = linkEnter.merge(link)
        linkUpdate.transition()
          .duration(duration)
          .attr('d', function (d) {
            return diagonal(d, d.parent)
          })
        // 获取exit集
        link.exit()
          .transition()
          .duration(duration)
          .attr('d', function (d) {
            var o = {x: source.x, y: source.y}
            return diagonal(o, o)
          })
          .remove()
        // 为动画过渡保存旧的 位置
        nodes.forEach(function (d) {
          d.x0 = d.x
          d.y0 = d.y
        })
        // 添加贝塞尔曲线的path， 衔接父节点和子节点间距
        function diagonal (s, d) {
          var path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`
          return path
        }
        // 当点击时  切换children,同时用 _children来保存原子节点信息
        function click (d) {
          if (d.children) {
            d._children = d.children
            d.children = null
          } else {
            d.children = d._children
            d._children = null
          }
          update(d)
        }
      }
    }
  }
}
</script>
