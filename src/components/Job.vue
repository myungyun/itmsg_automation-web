<template>
  <div>
    <h3>job List Page</h3>
    <div>
      <JqxDataTable ref="myDataTable" @filter="onFilter()" @rowDoubleClick="onRowDoubleClick($event)"
        @rowSelect="tableOnRowSelect($event)" @rowUnselect="tableOnRowUnselect($event)" :width="width" :height="450"
        :pagerButtonsCount="8" :source="dataAdapter" :columns="columns" :altRows="true" :pageable="true"
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
  import vurl from './url.js'

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
        width: 1500,
        dataAdapter: new jqx.dataAdapter(this.source, {
          loadComplete: function (data) {
            // data is loaded.
            //console.log('dddd', data )
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
            width: 200,
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
            width: 170,
            align: 'center'
          },
          {
            text: 'Status',
            cellsAlign: 'center',
            datafield: 'status',
            width: 170,
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
            width: 150,
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
      //let data = {"rowCount":7,"totalCount":"7","list":[{"iid":44,"name":"0925test","content":"","total_hosts":0,"use_yn":"Y","create_dt":"2019-09-25 17:23:04","create_id":"admin","update_dt":null},{"iid":39,"name":"","content":"0904ss1","total_hosts":0,"use_yn":"Y","create_dt":"2019-09-04 14:33:31","create_id":"admin","update_dt":null},{"iid":21,"name":"localhost","content":"","total_hosts":1,"use_yn":"Y","create_dt":"2019-06-19 16:45:03","create_id":"admin","update_dt":null},{"iid":9,"name":"Linux_ssh_inv","content":"","total_hosts":2,"use_yn":"Y","create_dt":"2019-03-18 17:02:56","create_id":"admin","update_dt":"2019-04-29 17:58:02"},{"iid":5,"name":"local_test","content":"","total_hosts":3,"use_yn":"Y","create_dt":"2019-03-05 14:48:09","create_id":"admin","update_dt":"2019-04-25 13:59:42"},{"iid":3,"name":"itmsg_test","content":"","total_hosts":1,"use_yn":"Y","create_dt":"2019-02-22 11:11:53","create_id":"admin","update_dt":"2019-09-04 13:57:03"},{"iid":1,"name":"TEST","content":"","total_hosts":971,"use_yn":"N","create_dt":"2019-02-13 14:34:28","create_id":"admin","update_dt":"2019-03-27 17:07:18"}]}
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
        console.log('row', row.ID);
        this.$router.push({ name: 'detailJob', params: {'id': row.ID} })

        // this.$refs.myWindow.setTitle('Host Detail: ' + row.name);
        // this.$refs.myWindow.open();
        // this.$refs.myDataTable.disabled = true;
        // this.$refs.id.value = row.ID;
        // this.$refs.id.disabled = true;
        // this.$refs.name.value = row.name;
        // this.$refs.domain.value = row.domain;
        // this.$refs.ip.value = row.ip;
        // this.$refs.os.value = row.os;
        // this.$refs.create_dt.value = row.create_dt;
        // this.$refs.update_dt.value = row.update_dt;

        // let vuse_yn = row.use_yn;
        // if (vuse_yn === 'Y') {
        //   this.$refs.yChk.check();
        // } else {
        //   this.$refs.nChk.check();
        // }
      },
      cancelBtnOnClick: function () {
        this.$refs.myWindow.close();
      },
      saveBtnOnClick: function () {
        this.$refs.myWindow.close();
        const start = Date.now();
        const curDate = Date(start);
        let vuse_yn = '';
        console.log(this.$refs.yChk.val());
        if (this.$refs.yChk.val()) {
          vuse_yn = 'Y';
        } else {
          vuse_yn = 'N'
        }
        //console.log(vuse_yn);
        let params = '';
        params += '?seq=' + this.$refs.id.value;
        axios.put(vurl + '/host' + params, {
            name: this.$refs.name.value,
            content: this.$refs.content.value,
            use_yn: vuse_yn
          })
          .then(res => {
            // console.log(res);
            const resData = res.data.data;
            if (res.data.code === '200') {
              let editRow = parseInt(this.tempIndexHolder);
              let rowData = {
                ID: this.$refs.id.value,
                name: resData.name,
                content: resData.content,
                use_yn: resData.use_yn,
                total_hosts: this.$refs.total_hosts.value,
                create_dt: this.$refs.create_dt.value,
                update_dt: curDate
              };
              this.$refs.myDataTable.updateRow(editRow, rowData);
            } else if (res.data.code === '820') {
              alert('There is no Host ID');
            } else {
              alert('Random Error Occur!')
            }
          })
          .catch(err => console.log(err))
      },
      myWindowOnClose: function () {
        this.$refs.myDataTable.disabled = false;

      },
      duplBtnOnClick: function () {
        axios.get(vurl + '/chkIvtDupl', {
            params: {
              name: this.$refs.name.value
            }
          })
          .then(res => {
            const target = this.$refs.nameChk;
            if (res.data.code === '602') {
              target.innerHTML = 'This name is available';
              target.style.display = 'block';
              target.style.color = 'blue';
            } else if (res.data.code === '200') {
              target.innerHTML = 'This name is already used.';
              target.style.display = 'block';
              target.style.color = 'red';
            } else if (res.data.code === '820') {
              target.innerHTML = 'Empty Name is applied..';
              target.style.display = 'block';
              target.style.color = 'red';
            }
          })
          .catch(err => console.log(err))
      },
      selectionInfo: function () {
        // gets selected row indexes. The method returns an Array of indexes.
        let selection = this.$refs.myDataTable.getSelection();
        let vselectedRows = '';
        if (selection && selection.length > 0) {
          let rows = this.$refs.myDataTable.getRows();
          for (let i = 0; i < selection.length; i++) {
            let rowData = selection[i];
            vselectedRows += rows[rows.indexOf(rowData)].ID
            if (i < selection.length - 1) {
              vselectedRows += ', ';
            }
          }
        }
        this.selectedRows = vselectedRows
        // console.log('>>>', vselectedRows);
      },
      tableOnRowSelect: function (event) {
        // event arguments
        let args = event.args;
        // row index
        let index = args.index;
        this.tempIndexHolder = index;
        // row data
        let rowData = args.row;
        this.tempSelectedRow = rowData;
        // row key
        let rowKey = args.key;
        this.selectionInfo();
      },
      tableOnRowUnselect: function (event) {
        // event arguments
        let args = event.args;
        // row index
        let index = args.index;
        // console.log(index);
        // row data
        let rowData = args.row;
        // console.log(rowData);
        // row key
        let rowKey = args.key;
        // console.log(rowKey);
        this.selectionInfo();

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