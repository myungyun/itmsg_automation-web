<template>
  <div>
    <h3>Host List Page</h3>
    <div>
      <JqxDataTable ref="myDataTable" @filter="onFilter()" @rowDoubleClick="onRowDoubleClick($event)"
        @rowSelect="tableOnRowSelect($event)" @rowUnselect="tableOnRowUnselect($event)" :width="width" :height="550"
        :pagerButtonsCount="8" :showToolbar="true" :toolbarHeight="35" :renderToolbar="renderToolbar"
        :source="dataAdapter" :columns="columns" :altRows="true" :pageable="true" :filterable="true"
        :columnsResize="true" :pagerMode="'advanced'" :pageSize=15 :pageSizeOptions=[15,30,45]>
      </JqxDataTable>
    </div>
  </div>
</template>

<script>
  import JqxGrid from "jqwidgets-scripts/jqwidgets-vue/vue_jqxgrid.vue";
  import JqxDataTable from "jqwidgets-scripts/jqwidgets-vue/vue_jqxdatatable.vue";
  import JqxCheckBox from "jqwidgets-scripts/jqwidgets-vue/vue_jqxcheckbox.vue";
  import JqxRadioButton from 'jqwidgets-scripts/jqwidgets-vue/vue_jqxradiobutton.vue';
  import JqxWindow from "jqwidgets-scripts/jqwidgets-vue/vue_jqxwindow.vue";
  import JqxInput from "jqwidgets-scripts/jqwidgets-vue/vue_jqxinput.vue";
  import JqxNumberInput from "jqwidgets-scripts/jqwidgets-vue/vue_jqxnumberinput.vue";
  import JqxDateTimeInput from "jqwidgets-scripts/jqwidgets-vue/vue_jqxdatetimeinput.vue";
  import JqxButton from "jqwidgets-scripts/jqwidgets-vue/vue_jqxbuttons.vue";
  import JqxToolTip from "jqwidgets-scripts/jqwidgets-vue/vue_jqxtooltip.vue";
  import axios from 'axios';
  const vurl = process.env.VUE_APP_BACKEND_URL

  export default {
    name: "Host",
    components: {
      JqxDataTable,
      JqxCheckBox,
      JqxRadioButton,
      JqxWindow,
      JqxInput,
      JqxNumberInput,
      JqxDateTimeInput,
      JqxButton
    },
    model: {
      prop: 'sendData',
      event: 'event-data'
    },
    // props: ['sendData'],
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
            text: 'ID',
            cellsAlign: 'center',
            datafield: 'ID',
            width: 50,
            align: 'center',
            hidden: true
          }, {
            text: 'Name',
            cellsAlign: 'center',
            datafield: 'name',
            width: 150,
            align: 'center'
          },
          {
            text: 'Domain',
            datafield: 'domain',
            width: 140,
            align: 'center'
          },
          {
            text: 'IP',
            cellsAlign: 'center',
            datafield: 'ip',
            width: 150,
            align: 'center'
          },
          {
            text: 'OS',
            cellsAlign: 'center',
            datafield: 'os',
            width: 330,
            align: 'center'
          },
          {
            text: 'Use',
            cellsAlign: 'center',
            datafield: 'use_yn',
            width: 50,
            align: 'center'
          },
          {
            text: 'Created Time',
            cellsAlign: 'center',
            datafield: 'create_dt',
            width: 190,
            cellsFormat: 'dd-MMM-yyyy hh:mm',
            align: 'center'
          },
          {
            text: 'Update Time',
            cellsAlign: 'center',
            datafield: 'update_dt',
            width: 190,
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
            map: 'hid'
          },
          {
            name: 'name',
            map: 'name'
          },
          {
            name: 'domain',
            map: 'domain',
            type: 'string'
          },
          {
            name: 'ip',
            map: 'ip',
            type: 'string'
          },
          {
            name: 'os',
            map: 'os',
            type: 'string'
          },
          {
            name: 'use_yn',
            map: 'use_yn',
            type: 'string'
          },
          {
            name: 'create_dt',
            map: 'create_dt',
            type: 'date'
          },
          {
            name: 'update_dt',
            map: 'update_dt',
            type: 'date'
          },
        ],
        id: 'iid',
        //localdata: data
        url: vurl + "/host",
        recordids: 'data',
        records: 'data',
        root: 'data>list',
      }
    },
    methods: {
      renderToolbar: function (toolBar) {
        const theme = jqx.theme;
        const toTheme = (className) => {
          if (theme == '') {
            return className;
          }
          return className + ' ' + className + '-' + theme;
        }
        // appends buttons to the status bar.
        let container = document.createElement('div');
        let fragment = document.createDocumentFragment();
        container.style.cssText = 'overflow: hidden; position: hidden; height: "100%"; width: "100%"';
        const createButtons = (name, cssClass) => {
          const button = document.createElement('div');
          button.style.cssText = 'padding: 3px; margin: 2px; float: left; border: none';
          const iconDiv = document.createElement('div');
          iconDiv.style.cssText = 'margin: 4px; width: 16px; height: 16px;';
          iconDiv.className = cssClass;
          button.appendChild(iconDiv);
          return button;
        }
        let buttons = [
          createButtons('addButton', toTheme('jqx-icon-plus')),
          createButtons('deleteButton', toTheme('jqx-icon-delete')),
          createButtons('cancelButton', toTheme('jqx-icon-cancel')),
        ];
        for (let i = 0; i < buttons.length; i++) {
          fragment.appendChild(buttons[i]);
        }
        container.appendChild(fragment);
        toolBar[0].appendChild(container);
        const addButtonOptions = {
          height: 25,
          width: 25
        };
        const deleteButtonOptions = {
          height: 25,
          width: 25
        };
        const cancelButtonOptions = {
          height: 25,
          width: 25
        };
        // we use TypeScript way of creating widgets here
        this.myAddButton = jqwidgets.createInstance(buttons[0], 'jqxButton', addButtonOptions);
        this.myDeleteButton = jqwidgets.createInstance(buttons[1], 'jqxButton', deleteButtonOptions);
        this.myCancelButton = jqwidgets.createInstance(buttons[2], 'jqxButton', cancelButtonOptions);
        const addTooltipOptions = {
          position: 'bottom',
          content: 'Add'
        };
        const deleteTooltipOptions = {
          position: 'bottom',
          content: 'Delete'
        };
        const cancelTooltipOptions = {
          position: 'bottom',
          content: 'Cancel'
        };
        const myAddToolTip = jqwidgets.createInstance(buttons[0], 'jqxTooltip', addTooltipOptions);
        const myDeleteToolTip = jqwidgets.createInstance(buttons[1], 'jqxTooltip', deleteTooltipOptions);
        const myCancelToolTip = jqwidgets.createInstance(buttons[2], 'jqxTooltip', cancelTooltipOptions);

        this.myAddButton.addEventHandler('click', (event) => {
          if (!this.myAddButton.disabled) {
            let args = event.args;
            this.$router.push({
              name: 'addHost'
            })
          }
        });

        this.myDeleteButton.addEventHandler('click', (event) => {
          if (!this.myDeleteButton.disabled) {
            let params = '';
            params += '?seq=' + this.selectedRows;
            axios.delete(vurl + '/host' + params)
              .then(res => {
              this.$refs.myDataTable.updateBoundData()
              })
              .catch(err => console.log(err))
            this.$refs.myDataTable.clearSelection();

            this.selectedRows = ''
          }
        });
        this.myCancelButton.addEventHandler('click', (event) => {
          if (!this.myCancelButton.disabled) {
            //cancel changes.
            this.$refs.myDataTable.clearSelection();
            this.selectedRows = ''
          }
        });
      },
      onRowDoubleClick: function (event) {
        let args = event.args;
        let index = args.index;
        let row = args.row;
        this.tempIndexHolder = index;
        this.$router.push({ name: 'editHost', params: {'id': row.ID} })
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
        let params = '';
        params += '?seq=' + this.$refs.id.value;
        axios.put(vurl + '/host' + params, {
            name: this.$refs.name.value,
            content: this.$refs.content.value,
            use_yn: vuse_yn
          })
          .then(res => {
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
        this.sendData = this.selectedRows
        this.$emit('event-data', this.sendData)
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