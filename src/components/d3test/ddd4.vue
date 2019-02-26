<style>
</style>
<template>
<div>
    <div>
        <hierarchical-edge-bundling style="width:800px;height:900px" identifier="id" :data="tree" :links="links" node-text="name"></hierarchical-edge-bundling>
    </div>
</div>
</template>
<script>
import hierarchicalEdgeBundling from '../d3test2/HierarchicalEdgeBundling.vue'
export default {
  components: {
    hierarchicalEdgeBundling
  },
  data () {
    return {
      tree: {
        name: 'father',
        children: [{
          name: 'son1',
          children: [{name: 'grandson', id: 1}, {name: 'grandson2', id: 2}]
        },
        {
          name: 'son2',
          children: [{name: 'grandson3', id: 3}, {name: 'grandson4', id: 4}]
        }]
      },
      links: [
        {source: 3, target: 1, type: 1},
        {source: 3, target: 4, type: 2}
      ],
      linkTypes: [
        {
          id: 1, name: 'depends', symmetric: true
        },
        {
          id: 2, name: 'implement', inName: 'implements', outName: 'is implemented by'
        },
        {
          id: 3, name: 'uses', inName: 'uses', outName: 'is used by'
        }
      ]
    }
  },
  mounted () {
    this.makeZ2()
  },
  methods: {
    makeZ2 () {

    }
  }
}
</script>
