<template>
  <div>
    <div id="btn-group">
      <JqxButton @click="refreshBtnOnClick()" style="margin-left: 5px; float: right" ref="button" :width="120" :height="40" :textPosition="'center'">
      refresh
      </JqxButton>
    </div>
    <div>
      <JqxDataTable ref="myDataTable" @filter="onFilter()" @rowDoubleClick="onRowDoubleClick($event)"
        @rowSelect="tableOnRowSelect($event)" @rowUnselect="tableOnRowUnselect($event)" :width="width"
         :editable="true" :pagerButtonsCount="8" :showToolbar="true" :toolbarHeight="35" :renderToolbar="renderToolbar"
        :source="dataAdapter" :columns="columns" :altRows="true" :pageable="true" :filterable="true" :columnsResize="true"
        :pagerMode="'advanced'">
      </JqxDataTable>
    </div>
    <JqxWindow ref=myWindow @close="myWindowOnClose()" :width="500" :height="400" :resizable="false" :autoOpen="false"
      :position="{ left: 800, top: 250 }">
      <div>Inventory Detail</div>
      <div style="overflow: hidden">
        <table style="table-layout: fixed; border-style: none">
          <tbody>
            <tr>
              <td align='right' :hidden=true>
                ID:
              </td>
              <td align='left'>
                <JqxInput ref="id" :width="150" :height="30" :hidden=true></JqxInput>
              </td>
            </tr>
            <tr>
              <td align='right'>
                Name:
              </td>
              <td align='left'>
                <JqxInput ref="name" :width="150" :height="30"></JqxInput>
                <div ref="nameChk" style="display: none;"></div>
              </td>
              <JqxButton @click="duplBtnOnClick()" style="margin-left: 5px; float: right" :width="100" :height="30">
                Duplicate Check
              </JqxButton>
            </tr>
            <tr>
              <td align='right'>
                Description:
              </td>
              <td align='left'>
                <JqxInput ref="content" :width="150" :height="30"></JqxInput>
              </td>
            </tr>
            <tr>
              <td align='right'>
                Connected Host Number:
              </td>
              <td align='left'>
                <JqxInput ref="total_hosts" :width="50" :height="30" :disabled="true"></JqxInput>
              </td>
              <JqxButton ref="chostBtn" @click="chostBtnOnClick()" style="margin-left: 5px; float: right" :width="100"
                :height="30">
                Connected Host List
              </JqxButton>
            </tr>
            <tr>
              <td align='right'>
                Use:
              </td>
              <td align='left'>
                <JqxRadioButton ref="yChk">
                  <span>Y</span>
                </JqxRadioButton>
              </td>
              <td>
                <JqxRadioButton ref="nChk">
                  <span>N</span>
                </JqxRadioButton>
              </td>
            </tr>
            <tr>
              <td align='right'>
                Created Date:
              </td>
              <td align='left'>
                <JqxDateTimeInput ref="create_dt" :disabled="true" :width="156" :height="30">
                </JqxDateTimeInput>
              </td>
            </tr>
            <tr>
              <td align='right'>
                Updated Date:
              </td>
              <td align='left'>
                <JqxDateTimeInput ref="update_dt" :disabled="true" :width="156" :height="30">
                </JqxDateTimeInput>
              </td>
            </tr>
            <tr>
              <td colSpan='2' align='right'>
                <br />
                <JqxButton @click="cancelBtnOnClick()" style="margin-left: 5px; float: right" :width="80" :height="30">
                  Cancel
                </JqxButton>
                <JqxButton @click="saveBtnOnClick()" style="float: right" :width="80" :height="30">
                  Save
                </JqxButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </JqxWindow>
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
  import vurl from './url.js'

  export default {
    name: "Inventory",
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
    data: function () {
      return {
        // eslint-disable-next-line
        width: 1400,
        //getWidth: getWidth('toolbar'),
        tools: 'button| button | button | button',
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
            width: 200,
            align: 'center'
          },
          {
            text: 'Description',
            datafield: 'content',
            width: 350,
            align: 'center'
          },
          {
            text: 'Connected Hosts',
            cellsAlign: 'center',
            datafield: 'total_hosts',
            width: 150,
            align: 'center'
          },
          {
            text: 'Use_YN',
            cellsAlign: 'center',
            datafield: 'use_yn',
            width: 150,
            align: 'center'
          },
          {
            text: 'Created Time',
            cellsAlign: 'center',
            datafield: 'create_dt',
            width: 275,
            cellsFormat: 'dd-MMM-yyyy hh:mm',
            align: 'center'
          },
          {
            text: 'Update Time',
            cellsAlign: 'center',
            datafield: 'update_dt',
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
            this.myEditButton;
            this.myDeleteButton;
            this.myCancelButton;
            this.myUpdateButton;
      this.source = {
        datatype: "json",
        theme: "fresh",
        checked: true,
        datafields: [{
            name: 'ID',
            map: 'iid'
          },
          {
            name: 'name',
            map: 'name'
          },
          {
            name: 'content',
            map: 'content',
            type: 'string'
          },
          {
            name: 'total_hosts',
            map: 'total_hosts',
            type: 'number'
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
        url: vurl + "/inventory",
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
          const addButtonOptions = { height: 25, width: 25 };
          const otherButtonsOptions = { disabled: true, height: 25, width: 25 };
          // we use TypeScript way of creating widgets here
          this.myAddButton = jqwidgets.createInstance(buttons[0], 'jqxButton', addButtonOptions);
          this.myDeleteButton = jqwidgets.createInstance(buttons[1], 'jqxButton', otherButtonsOptions);
          this.myCancelButton = jqwidgets.createInstance(buttons[2], 'jqxButton', otherButtonsOptions);
          const addTooltipOptions = { position: 'bottom', content: 'Add' };
          const deleteTooltipOptions = { position: 'bottom', content: 'Delete' };
          const cancelTooltipOptions = { position: 'bottom', content: 'Cancel' };
          const myAddToolTip = jqwidgets.createInstance(buttons[0], 'jqxTooltip', addTooltipOptions);
          const myDeleteToolTip = jqwidgets.createInstance(buttons[1], 'jqxTooltip', deleteTooltipOptions);
          const myCancelToolTip = jqwidgets.createInstance(buttons[2], 'jqxTooltip', cancelTooltipOptions);
          
          this.myAddButton.addEventHandler('click', (event) => {
            if (!this.myAddButton.disabled) {
              let args = event.args;
              this.$router.push({name: 'addInventory'})
            }
          });
          
          this.myDeleteButton.addEventHandler('click', (event) => {
              if (!this.myDeleteButton.disabled) {
                  this.$refs.myDataTable.deleteRow(this.rowIndex);
              }
          });
          this.myCancelButton.addEventHandler('click', (event) => {
              if (!this.myCancelButton.disabled) {
                  //cancel changes.
                  this.$refs.myDataTable.endRowEdit(this.rowIndex, true);
              }
          });
      },
      onRowDoubleClick: function (event) {
        //console.log(event);
        let args = event.args;
        let index = args.index;
        let row = args.row;
        this.tempIndexHolder = index;

        this.$refs.myWindow.setTitle('Inventory Detail: ' + row.name);
        this.$refs.myWindow.open();
        this.$refs.myDataTable.disabled = true;
        this.$refs.id.value = row.ID;
        this.$refs.id.disabled = true;
        this.$refs.name.value = row.name;
        this.$refs.content.value = row.content;
        this.$refs.total_hosts.value = row.total_hosts;
        this.$refs.create_dt.value = row.create_dt;
        this.$refs.update_dt.value = row.update_dt;

        let vuse_yn = row.use_yn;
        if (vuse_yn === 'Y') {
          this.$refs.yChk.check();
        } else {
          this.$refs.nChk.check();
        }
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
        axios.put(vurl + '/inventory' + params, {
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
              alert('There is no Inventory ID');
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
      tableOnRowSelect: function (event) {
        // event arguments
        let args = event.args;
        // row index
        let index = args.index;
        // row data
        let rowData = args.row;
        // row key
        let rowKey = args.key;
        // this.selectionInfo();
      },
      tableOnRowUnselect: function (event) {
        // event arguments
        let args = event.args;
        // row index
        let index = args.index;
        console.log(index);
        // row data
        let rowData = args.row;
        console.log(rowData);
        // row key
        let rowKey = args.key;
        console.log(rowKey);
        // this.selectionInfo();
        
      },
      deleteBtnOnClick: function() {
        axios.delete(url+'/inventory')
            .then(res => {
              console.log(2);
              data = res.data.data.list;
              return data
            })
            .catch(err => console.log(err))
      },
      refreshBtnOnClick: function () {
        async function generateData() {
          let data = await new Array
          await axios.get('http://localhost:8080/inventory')
            .then(res => {
              console.log(2);
              data = res.data.data.list;
              return data
            })
            .catch(err => console.log(err))
          await console.log('dd', data)
          return data;
        }
        this.source.localdata = generateData()
      }
    }
  }
</script>
<style>
    .buttonIcon {
        margin: -5px 0 0 -3px;
        width: 16px;
        height: 17px;
    }
    .btn-group {
      margin: 100 100 100 100;
    }
</style>
<style src='../assets/styles/jqwidgets/jqx.fresh.css'></style>
<style src='../assets/styles/jqwidgets/jqx.base.css'></style>