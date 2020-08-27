<template>
  <div>
    <h3>Credential List Page</h3>
    <div>
      <JqxDataTable ref="myDataTable" @filter="onFilter()" @rowDoubleClick="onRowDoubleClick($event)"
        @rowSelect="tableOnRowSelect($event)" @rowUnselect="tableOnRowUnselect($event)" :width="width" :height="550"
        :editable="true" :pagerButtonsCount="8" :showToolbar="true" :toolbarHeight="35" :renderToolbar="renderToolbar"
        :source="dataAdapter" :columns="columns" :altRows="true" :pageable="true" :filterable="true"
        :pageSize=15 :pageSizeOptions=[15,30,45]
        :columnsResize="true" :pagerMode="'advanced'">
      </JqxDataTable>
    </div>
    <JqxWindow ref=myWindow :width="800" :height="700" :showCollapseButton="false" :initContent="init" :maxHeight="700"
      :maxWidth="800" :minHeight="200" :minWidth="200" @close="myWindowOnClose()" :resizable="false" :autoOpen="false">
      <div>Credential Detail</div>
      <div>
        <JqxTabs ref="tab" :autoCreate="false">
          <ul style="margin-left: 30px;">
            <li>Machine</li>
            <li>Virtual Machine</li>
          </ul>
          <div>
            <table style="table-layout: fixed; border-style: none; border-collapse: separate;
                    border-spacing: 0 10px; margin-left: 15px; margin-top: 15px;">
              <tbody>
                <tr>
                  <td align='right'>
                    Name:
                  </td>
                  <td align='left'>
                    <JqxInput ref="mname" :width="150" :height="30"></JqxInput>
                    <div ref="nameChk" style="display: none;"></div>
                    <JqxButton @click="duplBtnOnClick()" style="margin-left: 5px; float: right" :width="100"
                      :height="20">
                      Name Check
                    </JqxButton>
                  </td>
                </tr>
                <tr>
                  <td align='right'>
                    Machine ID:
                  </td>
                  <td align='left'>
                    <JqxInput ref="mmid" :width="150" :height="30"></JqxInput>
                  </td>
                </tr>
                <tr>
                  <td align='right'>
                    Password:
                  </td>
                  <td align='left'>
                    <JqxPasswordInput ref="mpassword" class="password" :width="300" :height="30"></JqxPasswordInput>
                  </td>
                </tr>
                <tr>
                  <td align='right'>
                    Description:
                  </td>
                  <td align='left' colspan="2">
                    <JqxInput ref="mcontent" :width="270" :height="30"></JqxInput>
                  </td>
                </tr>
                <tr>
                  <td align='right'>
                    Created Date:
                  </td>
                  <td align='left'>
                    <JqxDateTimeInput ref="mcreate_dt" :disabled="true" :width="156" :height="30">
                    </JqxDateTimeInput>
                  </td>
                </tr>
                <tr>
                  <td align='right'>
                    Updated Date:
                  </td>
                  <td align='left'>
                    <JqxDateTimeInput ref="mupdate_dt" :disabled="true" :width="156" :height="30">
                    </JqxDateTimeInput>
                  </td>
                </tr>
                <tr>
                  <td colSpan='2' align='right'>
                    <br />
                    <JqxButton @click="cancelBtnOnClick()" style="margin-left: 5px; float: right" :width="80"
                      :height="20">
                      Cancel
                    </JqxButton>
                    <JqxButton @click="saveBtnOnClick()" style="float: right" :width="80" :height="20">
                      Save
                    </JqxButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table style="table-layout: fixed; border-style: none; border-collapse: separate;
                    border-spacing: 0 10px; margin-left: 15px; margin-top: 15px;">
              <tbody>
                <tr>
                  <td align='right'>
                    Name:
                  </td>
                  <td align='left'>
                    <JqxInput ref="vmName" :width="150" :height="30"></JqxInput>
                    <div ref="nameChk" style="display: none;"></div>
                    <JqxButton @click="duplBtnOnClick()" style="margin-left: 5px; float: right" :width="100"
                      :height="20">
                      Name Check
                    </JqxButton>
                  </td>
                </tr>
                <tr>
                  <td align='right'>
                    Machine ID:
                  </td>
                  <td align='left'>
                    <JqxInput ref="vmMid" :width="150" :height="30"></JqxInput>
                  </td>
                </tr>

                <tr>
                  <td align='right'>
                    Password:
                  </td>
                  <td align='left'>
                    <JqxPasswordInput ref="vmPassword" class="password" :width="300" :height="30"></JqxPasswordInput>
                  </td>
                </tr>
                <tr>
                  <td align='right'>
                    Private Key:
                  </td>
                  <td align='left'>
                    <JqxTextArea :width="570" :height="250" :source="generateSource"
                      :placeHolder="'Insert Priavate Key...'" :minLength="1" />
                  </td>
                </tr>
                <tr>
                  <td align='right'>
                    Description:
                  </td>
                  <td align='left'>
                    <JqxInput ref="vmContent" :width="270" :height="30"></JqxInput>
                  </td>
                </tr>
                <tr>
                  <td align='right'>
                    Created Date:
                  </td>
                  <td align='left'>
                    <JqxDateTimeInput ref="vmCreate_dt" :disabled="true" :width="156" :height="30">
                    </JqxDateTimeInput>
                  </td>
                </tr>
                <tr>
                  <td align='right'>
                    Updated Date:
                  </td>
                  <td align='left'>
                    <JqxDateTimeInput ref="vmUpdate_dt" :disabled="true" :width="156" :height="30">
                    </JqxDateTimeInput>
                  </td>
                </tr>
                <tr>
                  <td colSpan='2' align='right'>
                    <br />
                    <JqxButton @click="cancelBtnOnClick()" style="margin-left: 5px; float: right" :width="80"
                      :height="20">
                      Cancel
                    </JqxButton>
                    <JqxButton @click="saveBtnOnClick()" style="float: right" :width="80" :height="20">
                      Save
                    </JqxButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </JqxTabs>
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
  import JqxTabs from 'jqwidgets-scripts/jqwidgets-vue/vue_jqxtabs.vue';
  import JqxTextArea from 'jqwidgets-scripts/jqwidgets-vue/vue_jqxtextarea.vue';
  import JqxPasswordInput from 'jqwidgets-scripts/jqwidgets-vue/vue_jqxpasswordinput.vue';
  import axios from 'axios';
  import vurl from './url.js'

  export default {
    name: "Credential",
    components: {
      JqxDataTable,
      JqxCheckBox,
      JqxRadioButton,
      JqxWindow,
      JqxInput,
      JqxNumberInput,
      JqxDateTimeInput,
      JqxButton,
      JqxTabs,
      JqxTextArea,
      JqxPasswordInput
    },
    model: {
      prop: 'sendData',
      event: 'event-data'
    },
    mounted: function () {
      let jqxWidget = document.getElementById('jqxWidget');
      let offsetLeft = jqxWidget.offsetLeft;
      let offsetTop = jqxWidget.offsetTop;
      this.$refs.myWindow.position = {
        x: offsetLeft + 50,
        y: offsetTop + 50
      };
    },
    data: function () {
      return {
        // eslint-disable-next-line
        selectedRows: '',
        width: 1220,
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
            text: 'Name',
            cellsAlign: 'center',
            datafield: 'name',
            width: 200,
            align: 'center'
          },
          {
            text: 'Description',
            datafield: 'content',
            width: 420,
            align: 'center'
          },
          {
            text: 'Type',
            datafield: 'type',
            cellsAlign: 'center',
            width: 100,
            align: 'center'
          },
          {
            text: 'MID',
            cellsAlign: 'center',
            datafield: 'mid',
            width: 50,
            align: 'center',
            hidden: true
          },
          {
            text: 'vcenter_host',
            cellsAlign: 'center',
            datafield: 'vcenter_host',
            width: 100,
            align: 'center',
            hidden: true
          },
          {
            text: 'Created Time',
            cellsAlign: 'center',
            datafield: 'create_dt',
            width: 250,
            cellsFormat: 'dd-MMM-yyyy hh:mm',
            align: 'center'
          },
          {
            text: 'Update Time',
            cellsAlign: 'center',
            datafield: 'update_dt',
            width: 250,
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
            name: 'mid',
            map: 'mid'
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
            name: 'type',
            map: 'type',
            type: 'string'
          },
          {
            name: 'vcenter_host',
            map: 'vcenter_host',
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
        url: vurl + "/cred",
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
          //   createButtons('refreshButton', toTheme('jqx-icon-refresh'))
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
        //   const refreshButtonOptions = { height: 25, width: 25 };
        //   const otherButtonsOptions = { disabled: true, height: 25, width: 25 };
        // we use TypeScript way of creating widgets here
        this.myAddButton = jqwidgets.createInstance(buttons[0], 'jqxButton', addButtonOptions);
        this.myDeleteButton = jqwidgets.createInstance(buttons[1], 'jqxButton', deleteButtonOptions);
        this.myCancelButton = jqwidgets.createInstance(buttons[2], 'jqxButton', cancelButtonOptions);
        //   this.myRefreshButton = jqwidgets.createInstance(buttons[3], 'jqxButton', refreshButtonOptions);
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
        //   const refreshTooltipOptions = { position: 'bottom', content: 'refresh' };
        const myAddToolTip = jqwidgets.createInstance(buttons[0], 'jqxTooltip', addTooltipOptions);
        const myDeleteToolTip = jqwidgets.createInstance(buttons[1], 'jqxTooltip', deleteTooltipOptions);
        const myCancelToolTip = jqwidgets.createInstance(buttons[2], 'jqxTooltip', cancelTooltipOptions);
        //   const myRefreshToolTip = jqwidgets.createInstance(buttons[3], 'jqxTooltip', refreshTooltipOptions);

        this.myAddButton.addEventHandler('click', (event) => {
          if (!this.myAddButton.disabled) {
            let args = event.args;
            this.$router.push({
              name: 'addCredential'
            })
          }
        });

        this.myDeleteButton.addEventHandler('click', (event) => {
          if (!this.myDeleteButton.disabled) {
            this.$refs.myDataTable.deleteRow(this.tempIndexHolder);
            console.log('>>>' + this.tempIndexHolder);
            console.log('>>>' + this.tempSelectedRow.name);

            let params = '';
            params += '?name=' + this.tempSelectedRow.name;
            axios.delete(vurl + '/cred' + params)
              .then(res => {
                this.$refs.myDataTable.refresh();
              })
              .catch(err => console.log(err))
            this.$refs.myDataTable.clearSelection();
            //this.$refs.myDataTable.selectRow(0);
          }
        });
        this.myCancelButton.addEventHandler('click', (event) => {
          if (!this.myCancelButton.disabled) {
            //cancel changes.
            this.$refs.myDataTable.clearSelection();
          }
        });
        //     this.myRefreshButton.addEventHandler('click', (event) => {
        //       if (!this.myRefreshButton.disabled) {
        //         this.$refs.myDataTable.refresh();
        //       }
        //   });
      },
      init: function () { // Popup Windows Tab
        let options = {
          width: "100%",
          height: "99%"
        };
        this.$refs.tab.createComponent(options);
      },
      generateSource: function () {
        const quotes = [];
        return quotes;
      },
      onRowDoubleClick: function (event) {
        //console.log(event);
        let args = event.args;
        let index = args.index;
        let row = args.row;
        this.tempIndexHolder = index;
        console.log(row);
        this.$router.push({ name: 'editCredential', params: {'id': row.name} })
      },
      cancelBtnOnClick: function () {
        this.$refs.myWindow.close();
        this.$refs.myDataTable.refresh();
      },
      saveBtnOnClick: function () {
        this.$refs.myWindow.close();
        const start = Date.now();
        const curDate = Date(start);
        let params = '';
        params += '?seq=' + this.$refs.id.value;
        axios.put(vurl + '/cred' + params, {
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
        this.$refs.myDataTable.refresh();

      },
      duplBtnOnClick: function () {
        axios.get(vurl + '/chkCredDupl', {
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
            vselectedRows += rows[rows.indexOf(rowData)].name
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
        // row data
        let rowData = args.row;
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
        // row data
        let rowData = args.row;
        // row key
        let rowKey = args.key;
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