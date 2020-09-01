<template>
  <div>
    <h3>job List Page</h3>
    <button type="button" class="btn btn-danger" @click="cancelAllJobs()"
      style="margin: 0px 0px 5px 5px; float: right; font-size: 20px;">Cancel All Jobs</button>
    <div>
      <JqxDataTable ref="myDataTable" @filter="onFilter()" @rowDoubleClick="onRowDoubleClick($event)"
        :width="width" :height="550"  :pagerButtonsCount="8" :source="dataAdapter" 
        :columns="columns" :altRows="true" :pageable="true" :pageSize=15 :pageSizeOptions=[15,30,45]
        :filterable="true" :columnsResize="true" :pagerMode="'advanced'">
      </JqxDataTable>
    </div>
  </div>
</template>

<script>
  import JqxDataTable from "jqwidgets-scripts/jqwidgets-vue/vue_jqxdatatable.vue";
  import JqxNumberInput from "jqwidgets-scripts/jqwidgets-vue/vue_jqxnumberinput.vue";
  import JqxDateTimeInput from "jqwidgets-scripts/jqwidgets-vue/vue_jqxdatetimeinput.vue";
  import JqxButton from "jqwidgets-scripts/jqwidgets-vue/vue_jqxbuttons.vue";
  import axios from 'axios';
  const vurl = process.env.VUE_APP_BACKEND_URL

  export default {
    name: "Job",
    components: {
      JqxDataTable,
      JqxNumberInput,
      JqxDateTimeInput,
      JqxButton
    },
    data: function () {
      return {
        // eslint-disable-next-line
        selectedRows: '',
        width: 1220,
        dataAdapter: new jqx.dataAdapter(this.source, {
          loadComplete: function (data) {
            // data is loaded.
            // this.source.localdata = data.data.list;
          },
          loadError: function (xhr, status, error) {
            // data is not loaded.
            console.log('error occure while data is loaded')
          }
        }),
        columns: [{
            text: 'Job ID',
            cellsAlign: 'center',
            datafield: 'ID',
            width: 50,
            align: 'center',
          },
          {
            text: 'Sort',
            cellsAlign: 'center',
            datafield: 'chk_temp',
            width: 100,
            align: 'center',
          },
          {
            text: 'tid',
            cellsAlign: 'center',
            datafield: 'tid',
            width: 50,
            align: 'center',
            hidden: true
          }, {
            text: 'Name',
            cellsAlign: 'center',
            datafield: 'name',
            width: 119,
            align: 'center'
          },
          {
            text: 'iid',
            cellsAlign: 'center',
            datafield: 'iid',
            width: 50,
            align: 'center',
            hidden: true
          },  {
            text: 'Inventory',
            datafield: 'iname',
            width: 150,
            align: 'center'
          },
          {
            text: 'Status',
            cellsAlign: 'center',
            datafield: 'status',
            width: 100,
            align: 'center'
          },
          {
            text: 'Forks',
            cellsAlign: 'center',
            datafield: 'forks',
            width: 50,
            align: 'center'
          },
          {
            text: 'verb',
            cellsAlign: 'center',
            datafield: 'verb',
            width: 50,
            align: 'center',
            hidden: true
          },
          {
            text: 'Limits',
            cellsAlign: 'center',
            datafield: 'limits',
            width: 100,
            align: 'center'
          },
          {
            text: 'variables',
            cellsAlign: 'center',
            datafield: 'variables',
            width: 50,
            align: 'center',
            hidden: true
          },
          {
            text: 'Start_time',
            cellsAlign: 'center',
            datafield: 'start_dt',
            width: 275,
            cellsFormat: 'dd-MMM-yyyy hh:mm',
            align: 'center'
          },
          {
            text: 'End_time',
            cellsAlign: 'center',
            datafield: 'end_dt',
            width: 275,
            cellsFormat: 'dd-MMM-yyyy hh:ss',
            align: 'center'

          }
        ],
      }
    },
    beforeCreate: function () {
      this.rowIndex;
      this.myAddButton;
      this.myDeleteButton;
      this.myCancelButton;
      this.source = {
        datatype: "json",
        theme: "fresh",
        checked: true,
        datafields: [{
            name: 'ID',
            map: 'jid'
          },
          {
            name: 'chk_temp',
            map: 'chk_temp',
            type: 'string'
          },
          {
            name: 'name',
            map: 'tname'
          },
          {
            name: 'tid',
            map: 'tid'
          },
          {
            name: 'iid',
            map: 'iid',
            type: 'string'
          },
          {
            name: 'iname',
            map: 'iname',
            type: 'string'
          },
          {
            name: 'forks',
            map: 'forks',
            type: 'string'
          },
          {
            name: 'verb',
            map: 'verb',
            type: 'string'
          },
          {
            name: 'variables',
            map: 'variables',
            type: 'string'
          },
          {
            name: 'limits',
            map: 'limits',
            type: 'string'
          },
          {
            name: 'status',
            map: 'status',
            type: 'string'
          },
          {
            name: 'start_dt',
            map: 'start_dt',
            type: 'date'
          },
          {
            name: 'end_dt',
            map: 'end_dt',
            type: 'date'
          },
        ],
        id: 'jid',
        //localdata: data
        url: vurl + "/job",
        recordids: 'data',
        records: 'data',
        root: 'data>list',
      }
    },
    methods: {
      onRowDoubleClick: function (event) {
        //console.log(event);
        let args = event.args;
        let index = args.index;
        let row = args.row;
        this.tempIndexHolder = index;
        this.$router.push({ name: 'jobDetail', params: {'id': row.ID} })
      },
      cancelAllJobs: function () {
        if (confirm("Are you sure you want to cancel all jobs?")) {
          axios.get(vurl + '/terminateOneJob')
          .then(res => {
            if (res.data.code === '880') {
              alert('Successfully Cancel job : '+res.data.statusMsg)
            } else if (res.data.code === '820') {
              alert('There is no Proccess ID');
            } else {
              alert('Random Error Occur!')
            }
          })
          .catch(err => console.log(err))
        } else {
          alert('Unexpected Error!')
        }
      }
    }
  }
</script>
<style scoped>
  #btn-group {
    border-color: rgb(0, 204, 255);
    float: right;
  }
  
</style>
<style src='../assets/styles/jqwidgets/jqx.fresh.css'></style>
<style src='../assets/styles/jqwidgets/jqx.base.css'></style>