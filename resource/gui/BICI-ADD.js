/*
***************************************************
   DEVICE-TURNUP GUI SCRIPT

      > Support: Bhanu Singh
      > Company: Juniper Networks
      > Contact: bhanus@juniper.net
      > Version: 1.0            
      > Revision Date: 2014-11-13
      
      [Copyright 2009-2014 Juniper Networks, Inc.]
      [All rights reserved.]      
      
***************************************************
*/

Ext.ns("Jx.cpp.service");
var scriptObj = {};
var scriptObj = {};
scriptObj.namespace = 'Jx.cpp.service.vpls';
Ext.define('Jx.cpp.service.vpls', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.FieldContainer',
        'Ext.form.FieldSet',
		'Ext.form.Label',
		'Ext.form.field.Base',
        'Ext.form.field.ComboBox',
        'Ext.form.field.TextArea',
		'Ext.form.field.Text',
		'Ext.form.field.Hidden',
        'Ext.form.field.Checkbox',
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.button.Button'
    ],
	autoRender: true,
	resizable: true,
	layout: 'fit',
	id: 'biciCreateWindow',
    height: 730,
	//maxHeight: 1800,
    hidden: false,
    width: 960,
	x: 200,
    y: 20,
	maximizable: true,
	title: 'BI/CI Service',
	FIELDSET_BACKGROUND_COLOR:'background-color:#F8F8F8',
	FIELDSET_WHITE_COLOR:'background-color:#FFFFFF',
	site: '', port: '', encapsulation: '',moid: '',
	CIUName: '',
	firstUnitForVRF: '',
	isInterfaceForCustomerExist: false,
	isPortValid: false,
	////isCCI: false,
	MAX_SUBNET_MASK:32,
	MIN_SUBNET_MASK:24,
	l3vpnendpointDetails:null,
	DEFAULT_SUBNET_MASK:31,
	advancedResult : {},
	STEP:1,	

   initComponent: function() {
         var me = this;
		 l3vpnendpointDetails = new Ext.util.HashMap();
		Ext.applyIf(me, {
            scriptUtils: ui.common.utils.ScriptUtils.prototype
        });
        Ext.applyIf(me, {
		 deviceStore : this.scriptUtils.getDeviceStore(commonData),
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 10,
					autoScroll: true,
					//margin: '30 0 0 0',
					 height: 680,
					 //maxHeight: 1800,
					  //maxHeight: 1000,
                     //width: 960,
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            height: 170,
                            width: 900,
                            fieldLabel: '',
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    height: 170,
									minWidth: 300,
                                    //width: 400,
									//maxWidth: 400,
                                    title: 'Customer Information',
									margin: '0 10 0 0',
									style: this.FIELDSET_BACKGROUND_COLOR,
                                    layout: 'column',
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            flex: 1,
                                            maxWidth: 170,
                                            width: 170,
											maxHeight: 25,
                                            fieldLabel: '<b>ID</b>',
											labelWidth: 60,
											margin: '5 0 0 0',
											name: 'customerId',
											id: 'customerId',
											allowBlank: false,
											hideTrigger: true,
											keyNavEnabled: false,
											mouseWheelEnabled: false,
											listeners: {
											  specialkey: function(f,e){
												if (e.getKey() == e.ENTER) {
													var siteInterfaceGrid =  Ext.getCmp("siteInterfaceGrid").getSelectionModel().getSelection()[0];
													if(siteInterfaceGrid != undefined){
													var selectedPort = siteInterfaceGrid.data.portName;
													
													if(selectedPort != '' && selectedPort != null){
															//me.getInterfaceDescription(selectedPort);
														}
													}
												var cust = Ext.getCmp('customerId').getValue();
													me.searchCustomer(cust);
												}
											  }
											}
                                        },
										{
											xtype: 'button',
											name: 'searchBtn',
											text: 'Fetch Details',
											id: 'searchBtn',
											tooltip: 'Fetch Customer Details',
											//icon: '../serviceuicommon/images/cpp/Settings_16x16.png',
											margin: 3,
											handler: function(button, event) {
												var cust = Ext.getCmp('customerId').getValue();
												//console.log("porttt*  "+this.port);
												var siteInterfaceGrid =  Ext.getCmp("siteInterfaceGrid").getSelectionModel().getSelection()[0];
													if(siteInterfaceGrid != undefined){
													var selectedPort = siteInterfaceGrid.data.portName;
													console.log("porttt*  "+selectedPort);
													if(selectedPort != '' && selectedPort != null){
															//me.getInterfaceDescription(selectedPort);
														}
													}
													
												me.searchCustomer(cust);
											}
										},
										{
                                            xtype: 'textfield',
                                            flex: 1,
                                            //fieldLabel: 'Name',
											maxHeight: 25,
											maxWidth: 255,
											width: 255,
											//style: 'background-color: #ddd;',
											  //readOnly: true,
											fieldLabel: '<font color="#808080">Name</font>',
											fieldStyle: 'color:#808080',

											name: 'customerName',
											id: 'customerName',
											labelWidth: 60,
											readOnly: true,
											//disabled: true,
											allowBlank: false,
											minLength:1,
											margin: '5 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            maxWidth: 255,
											width: 255,
                                            //fieldLabel: 'Email',
											//style: 'background-color: #ddd;color:#ddd; ',
											disabledClass: 'color:#ddd;',
											labelWidth: 60,
											maxHeight: 25,
											name: 'email',
											id: 'email',
											readOnly: true,
											fieldLabel: '<font color="#808080">Email</font>',
											fieldStyle: 'color:#808080',
											//disabled: true,
											margin: '5 0 0 0'
                                        },
                                        {
                                            xtype: 'textareafield',
                                            flex: 1,
                                            height: 55,
											maxWidth: 255,
											width: 255,
                                            //fieldLabel: 'Description',
											name: 'customerDescription',
											id: 'customerDescription',
											//style: 'background-color: #ddd;',
											fieldLabel: '<font color="#808080">Description</font>',
											fieldStyle: 'color:#808080',
											labelWidth: 60,
											readOnly: true,
											//disabled: true,
											margin: '5 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    height: 170,
									minWidth: 590,
									margin: '0 10 0 0',
                                    title: 'Service Details',
									style: this.FIELDSET_BACKGROUND_COLOR,
									layout: 'column',
                                    items: [
									   {
										xtype: 'hiddenfield',
										name: 'seId'
										}, 
										{
										 xtype: 'hiddenfield',
										 name: 'vendorType'
										},
										{
										xtype: 'hiddenfield',
										name: 'multiVRF',
										id: 'multiVRF'
										},
										{
										xtype: 'hiddenfield',
										name: 'firstUnitForVRF',
										id: 'firstUnitForVRF'
										},
										{
										xtype: 'hiddenfield',
										name: 'traficControlProfile',
										id: 'traficControlProfile'
										},
										{
										xtype: 'hiddenfield',
										name: 'schedulerMapForMultiVRF',
										id: 'schedulerMapForMultiVRF'
										},
										{
										xtype: 'hiddenfield',
										vtype:'AlphaUnderscore',
										name:'name',
										listeners:{
											afterrender:function(comp,eOpts){
												 this.up('window').scriptUtils.createDefaultServiceOrderName(comp);
												}
											}
										},
                                        {
                                            xtype: 'numberfield',
                                            flex: 1,
                                            fieldLabel: '<b>CSID</b>',
											name: 'serviceId',
											id: 'serviceId',
											allowBlank: false,
											margin: '0 220 0 0',
											labelWidth: 35,
                                            //maxValue: 3097000,
                                            //minValue: 3086023,
											height: 23,
											hideTrigger: true,
											keyNavEnabled: false,
											mouseWheelEnabled: false,
											listeners: {
											blur : function() {
												var serviceId = Ext.getCmp("serviceId").getValue();
												Ext.getCmp("csId").setValue(serviceId);
												}
												
											}
                                        },
										/*{
											xtype:'label',
											text: "Service ID must be in the range 3086023 to 3097000",
											name: 'lblServiceId',
											labelStyle: 'font-weight:bold;font-color:grey;background-color:#F8F8F8;font-size 6px',
											
											style : {
												//background : 'blue',
												color : 'grey'
												//font-size:13px
												//font: normal 6px
											}
										 },*/
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            fieldLabel: '<b>Full TELUS Service Name</b>',
											//value: 'VPRN',
											labelWidth: 155,
											maxHeight: 23,
											height: 23,
											width: 350,
											allowBlank: false,
											margin: '10 0 0 0',
											name: 'serviceName',
											id: 'serviceName'
                                        },
										{
											xtype: 'combobox',
											flex: 1,
											fieldLabel: 'Operational Mode',
											labelWidth: 100,
											//width: 220,
											name: 'operationalMode',
											id: 'operationalMode',
											value: 'PEN',
											store: this.getOperatioanlMode(),
											margin: '5 0 0 0',
											queryMode: 'local',
											editable: true,
											displayField: 'displayText',
											valueField: 'valueText',
											hidden: true
										},
										{
											xtype: 'checkboxfield',
											fieldLabel: 'Accounting',
											boxLabel: '',
											name: 'accounting',
											margin: '8 300 0 0',
											id: 'accounting',
											labelWidth: 60,
											hidden: true
										}
                                    ]
                                }
							]
                        },
                        {
                            xtype: 'fieldset',
                            height: 270,
                            maxHeight: 300,
                            maxWidth: 900,
                            width: 900,
                            title: '',
							style: this.FIELDSET_BACKGROUND_COLOR,
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    margins: '0 5 0 0',
                                    height: 270,
                                    maxHeight: 300,
                                    maxWidth: 220,
                                    width: 220,
                                    title: 'Select Node',
									style: this.FIELDSET_BACKGROUND_COLOR,
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            height: 45,
											width: 220,
                                            fieldLabel: '',
                                            items: [
                                              
												{
                                                    xtype: 'combobox',
                                                    margin: '5 0 0 0',
                                                    fieldLabel: 'Site',
													emptyText:'Select a site',
													name: 'siteName',
													id: 'siteName',
                                                    labelWidth: 45,
													selectOnFocus: true,
													forceSelection: true,
													typeAhead: true,
													minChars: 1,
													store: this.scriptUtils.getDeviceStore(commonData),
													queryMode: 'remote',
													editable: true,
													displayField: 'name',
													valueField: 'moid',
													listeners: {
														'select':function(list,record) {
															var siteInterfaceGrid = Ext.ComponentQuery.query('gridpanel[name=siteInterfaceGrid]')[0];
															me.getHardwareModel(Ext.getCmp("siteName").getValue());
															me.getSoftwareVersion(Ext.getCmp("siteName").getValue());
															me.loadSiteInterfaceGrid(Ext.getCmp("siteName").getValue());														
														}
													}
													
                                                },{
													xtype: 'textfield',
													flex: 1,
													margin: '5 0 0 0',
													fieldLabel: '<font color="#808080">Software Version</font>',
													fieldStyle: 'color:#808080',
													name: 'softwareVersion',
													id: 'softwareVersion',
													width: 195,
													labelWidth: 100,
													readOnly: true,
													//disabled: true,
													allowBlank: true,
													minLength:1
												},
												{
													xtype: 'textfield',
													flex: 1,
													margin: '5 0 0 0',
													fieldLabel: '<font color="#808080">Node Type</font>',
													fieldStyle: 'color:#808080',
													name: 'nodeType',
													id: 'nodeType',
													width: 195,
													labelWidth: 100,
													readOnly: true,
													//disabled: true,
													allowBlank: true,
													minLength:1
												}
												
                                            ]
									    }
									]
                                },
								{
                                    xtype: 'fieldset',
                                    flex: 1,
                                    margins: '0 5 0 0',
                                    height: 270,
                                    maxHeight: 300,
									maxWidth: 370,
									name: 'siteInterface',
									id: 'siteInterface',
                                    layout: 'fit',
                                    title: 'Select Port/LAG',
									style: this.FIELDSET_BACKGROUND_COLOR,
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            height: 190,
                                            width: 370,
                                            fieldLabel: '',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    height: 170,
													forceFit: true,
                                                    title: '',
                                                    columnLines: true,
													name: 'siteInterfaceGrid',
													id: 'siteInterfaceGrid',
													store: this.siteInterfaceGridStore(),
													plugins:[Ext.create('Ext.ux.grid.JxFilterRow', {
														remoteFilter:false,
														
													})],
                                                    columns: [
                                                         {
                                                            xtype: 'gridcolumn',
                                                            maxWidth: 1,
                                                            width: 1,
                                                            hidden: true,
                                                            dataIndex: 'deviceId',
                                                            text: 'SiteId'
                                                        },
														{
                                                            xtype: 'gridcolumn',
                                                            maxWidth: 80,
                                                            width: 80,
															hidden: true,
                                                            sortable: true,
                                                            dataIndex: 'deviceName',
                                                            text: 'Site'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            maxWidth: 80,
                                                            sortable: true,
                                                            dataIndex: 'portName',
                                                            text: 'Port'
                                                        },
														{	xtype: 'gridcolumn',
															dataIndex:'encapsulation',
															maxWidth: 70,
                                                            sortable: true,
															text:'Encap',
															flex:1															
														},
                                                        {
                                                            xtype: 'gridcolumn',
                                                            maxWidth: 70,
                                                            sortable: true,
                                                            dataIndex: 'status',
                                                            text: 'Op Status'
                                                        }/*,
														{
                                                            xtype: 'gridcolumn',
                                                            maxWidth: 80,
                                                            sortable: true,
                                                            dataIndex: 'mtu',
                                                            text: 'MTU'
                                                        }*/,
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 80,
                                                            sortable: true,
                                                            dataIndex: 'speed',
                                                            text: 'Speed'
                                                        }
                                                    ],
													listeners: {
															itemclick: function(dv, record, item, index, e) {
															console.log("item****************  "+item.cells[0]);
															var customerId = Ext.getCmp("customerId").getValue();
															this.CIUName='';
															if(customerId == '' || customerId == null){
																Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please select the custoemr first");
																return;
															}
															var portCombo = Ext.getCmp("portSpeed");
																	//childCombo.clearValue();
																	portCombo.getStore().removeAll();
																	var portName = record.get('portName');
																	console.log("port name** "+portName);
																	if(portName.indexOf("ge") != -1){
																		portCombo.setValue("1G");
																		portCombo.bindStore(me.getPortSpeed()); //bind the store for up
																		
																	}
																	else if(portName.indexOf("xe") != -1){
																		portCombo.bindStore(me.getPortSpeedForXEPort()); //bind the store for up
																		portCombo.setValue("10G");
																	}else{
																	portCombo.bindStore(['']); //bind the store for up
																		portCombo.setValue("");
																	}
															
																var stagedInterfacesStore = Ext.getCmp("stagedInterfacesGrid").getStore();
																var stagedInterfacesStore_RowCount = stagedInterfacesStore.count();
																//Ext.getCmp("ciuName").setDisabled(false);		
																
																for(var i=0; i < stagedInterfacesStore_RowCount; i++) {
																	var row = stagedInterfacesStore.getAt(i);
																	console.log("interface in the stage: : "+row.data.Interface);
																	if(row.data.Interface == record.get('portName')) {
																		Ext.getCmp("ciuName").setDisabled(true);
																   }
																}
		
															
															    var routingProtocol = Ext.getCmp("routingProtocol").getValue();
																me.getSelectedSite(record);
																console.log("port name: "+record.get('portName'));
																var interfaceDesc = "";
																 //me.getInterfaceDescription(record.get('portName'));
																 me.getInterfaceDescription(record.get('portName'));
																 
																//interfaceDesc = me.getInterfaceDescription(record.get('portName'));
																//console.log("interfaceDesc > "+interfaceDesc);
																/*var customerid = Ext.getCmp('customerId').getValue();
																console.log("interfaceDesc> "+interfaceDesc);
																var interfaceDescription[] = interfaceDesc.split(".");
																if(interfaceDescription.length > 1){
																if(customerid != interfaceDescription[0]){
																	Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "This port is used by another customer. Please use another port");
																	return true;
																}
																}*/
																
																if(routingProtocol != null){
																
																	var endpointPanel = Ext.ComponentQuery.query('#endpointPanel')[0];
																	endpointPanel.show();
																	//Ext.getCmp('optionPanelGrid').getSelectionModel().select(0);
																	//Ext.getCmp('accessOptionGrid').show();
																	
																	//Ext.getCmp('optionPanelGrid').getSelectionModel().select(0);
																	//Ext.getCmp('accessOptionGrid').show();
																}
																
																var stageBtn = Ext.getCmp('stageBtn');
																stageBtn.show();

																}
															
															},
                                                    selModel: Ext.create('Ext.selection.CheckboxModel', {
													mode: 'SINGLE',
													listeners: {
															deselect: function(model, record, index) {
																//id = record.get('id');
																//alert("deselect "+index);
															},
															select: function(model, record, index) {
																//id = record.get('id');
																//alert("select "+index);
															}
														}

                                                    })
                                                },
												{
													xtype:'textareafield',
													fieldLabel: 'Port Description',
													labelWidth: 60,
													height: 70,
													width: 350,
													readOnly: true,
													disabled: true,
													name: 'lblInterfaceDescription',
													id: 'lblInterfaceDescription',
													margin: '0 0 0 0',
													fieldLabel: '<font color="#808080">Name</font>',
													fieldStyle: 'color:#808080',
													fieldStyle: {
													 //'fontFamily'   : 'Garamond',
													 //'fontFamily'   : 'Calibri',
													 //'fontSize'     : '13px'
												   },
													
													style : {
														//background : 'blue',
														color : 'grey'
														//font-size:13px
														//font: normal 6px
													}
												 }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    margins: '0 5 0 0',
                                    height: 270,
                                    maxHeight: 300,
                                    maxWidth: 305,
                                    width: 305,
                                    title: 'Set Access Details',
									style: this.FIELDSET_BACKGROUND_COLOR,
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            height: 45,
                                            fieldLabel: '',
                                            items: [
                                              
												{
													xtype: 'combobox',
													width: 235,
													labelWidth: 105,
													fieldLabel: '<b>Connection Type</b>',
													allowBlank: false,
													name: 'connectionType',
													id: 'connectionType',
													emptyText:'Pick an Option',
													value: 'RE Direct',
													//store: ['RE Direct','RE DUAL'],
													store: this.getConnectionType(),
															queryMode: 'local',
															editable: true,
															displayField: 'displayText',
															valueField: 'valueText',
													listeners: {
																 change: function(field, newValue, oldValue) {
																 console.log("connection type********: "+newValue);
																 
																 var pathPreference = Ext.getCmp("pathPreferences");
																 var endPointServiceType = Ext.getCmp("endPointServiceType").getValue();
																 
																 if(newValue == 'RE Direct'){
																 //console.log("connection type 11********: "+newValue);
																  pathPreference.setValue("Primary");
																	me.setFieldDisabled("pathPreferences",true);	
																 }else{
																	me.setFieldDisabled("pathPreferences",false);	
																 }
																 
																 if(Ext.getCmp("connectionType").getValue() == 'RE Direct' && Ext.getCmp("pathPreferences").getValue() == 'Primary' && endPointServiceType == 'BI'){
																	Ext.getCmp("vlanId").setValue(1500); 
																}else if(Ext.getCmp("connectionType").getValue() == 'RE Direct' && Ext.getCmp("pathPreferences").getValue() == 'Secondary' && endPointServiceType == 'BI'){
																	Ext.getCmp("vlanId").setValue(1501); 
																}else if(Ext.getCmp("connectionType").getValue() == 'RE Dual'){
																	Ext.getCmp("vlanId").setValue(""); 
																	Ext.getCmp("vlanId").setDisabled(false); 
																}else if(Ext.getCmp("connectionType").getValue() == 'RE Direct' && endPointServiceType == 'CI'){
																	Ext.getCmp("vlanId").setDisabled(true); 
																	Ext.getCmp("vlanId").setValue(""); 	
																}else{
																	Ext.getCmp("vlanId").setDisabled(false); 
																}
																
																}
															}
												},
												{
													xtype: 'combobox',
													//margin: '5 10 0 10',
													width: 235,
													labelWidth: 105,
													fieldLabel: '<b>Access Type</b>',
													name: 'accessType',
													id: 'accessType',
													emptyText:'Pick an Option',
													//store: ['HS', 'DSL'] 
													value: 'HS',
													store: ['HS'] 
												},
												{
													xtype: 'combobox',
													width: 235,
													labelWidth: 105,
													fieldLabel: 'Port Speed',
													name: 'portSpeed',
													id: 'portSpeed',
													//value: 'HS',
													//store: this.getPortSpeed(), 
													store: '' ,
													queryMode: 'local',
													editable: true,
													displayField: 'displayText',
													valueField: 'valueText'
												},
												{
													xtype: 'combobox',
													//margin: '10 10 0 0',
													width: 235,
													labelWidth: 105,
													fieldLabel: '<b>Path Preference</b>',
													//labelAlign: 'right',
													name: 'pathPreferences',
													id: 'pathPreferences',
													emptyText:'Pick an Option',
													maxLength:15,
													value: 'Primary',
													//store: ['Primary', 'Secondary'],
													store: ['Primary'],
													listeners: {
																 change: function(field, newValue, oldValue) {
																 console.log("connection type********: "+newValue);
																 
																 var pathPreference = Ext.getCmp("pathPreferences");
																 var endPointServiceType = Ext.getCmp("endPointServiceType").getValue();
																 if(Ext.getCmp("connectionType").getValue() == 'RE Direct'){
																	 if(Ext.getCmp("connectionType").getValue() == 'RE Direct' && newValue == 'Primary' && endPointServiceType == 'BI'){
																		Ext.getCmp("vlanId").setValue(1500); 
																	}else if(Ext.getCmp("connectionType").getValue() == 'RE Direct' && newValue == 'Secondary' && endPointServiceType == 'BI'){
																		Ext.getCmp("vlanId").setValue(1501); 
																	}if(Ext.getCmp("connectionType").getValue() == 'RE Dual'){
																		Ext.getCmp("vlanId").setValue(""); 
																	}else if(Ext.getCmp("connectionType").getValue() == 'RE Direct' && endPointServiceType == 'CI'){
																		Ext.getCmp("vlanId").setDisabled(true); 
																		Ext.getCmp("vlanId").setValue(""); 	
																	}else{
																		Ext.getCmp("vlanId").setDisabled(false); 
																	}
																
																}
																}
															}
												},
												{
													xtype: 'combobox',
													//margin: '5 10 0 0',
													width: 160,
													labelWidth: 105,
													labelAlign: 'left',
													emptyText:'Pick an Option',
													fieldLabel: '<b>Service Type</b>',
													name: 'endPointServiceType',
													id: 'endPointServiceType',
													value: 'BI',
													store: ['BI','CI'],
													listeners: {
																/*render: function (field) {
																console.log("render");
																	Ext.getCmp('endPointServiceType').setValue("BI");
																},*/
																load: function () {
																console.log("load");
																	//this sets the default value to USA after the store loads
																	var combo = Ext.getCmp('endPointServiceType');
																	combo.setValue("BI");
																},
																'change':function(field, newValue, oldValue) {
																
																if(newValue == 'CI' && Ext.getCmp("connectionType").getValue() == 'RE Direct'){
																	Ext.getCmp("vlanId").setDisabled(true);
																}else{
																	Ext.getCmp("vlanId").setDisabled(false);
																}
																if(Ext.getCmp("connectionType").getValue() == 'RE Direct' && Ext.getCmp("pathPreferences").getValue() == 'Primary' && newValue == 'BI'){
																	Ext.getCmp("vlanId").setValue(1500); 
																}else if(Ext.getCmp("connectionType").getValue() == 'RE Direct' && Ext.getCmp("pathPreferences").getValue() == 'Secondary' && newValue == 'BI'){
																	Ext.getCmp("vlanId").setValue(1501); 
																}else if(Ext.getCmp("connectionType").getValue() == 'RE Direct' && newValue == 'CI'){
																	Ext.getCmp("vlanId").setDisabled(true);
																	Ext.getCmp("vlanId").setValue(""); 															
																}else{
																	Ext.getCmp("vlanId").setDisabled(false); 
																}
																
																												
																}
															}
												},
												{
													xtype: 'combobox',
													//margin: '10 0 0 0',
													fieldLabel: '<b>Routing Protocol</b>',
													emptyText: 'Pick an Option',
													
													width: 265,
													maxWidth: 265,
													labelWidth: 105,
													//labelAlign: 'left',
													name: 'routingProtocol',
													id: 'routingProtocol',
													value: 'Static',
													//store: this.getRoutingProtocol(),
													store: [['Static','Static'],['Default','BGP-Default Route'], ['Full','BGP-Full Routes'], ['Default-Full','BGP-Default+Full Routes']],
													listeners: {
													load: function () {
														console.log("load");
															//this sets the default value to USA after the store loads
															//var combo = Ext.getCmp('routingProtocol');
															//combo.setValue("Static");
															//Ext.getCmp("bgpOptionPanel").setDisabled(true);
															//Ext.getCmp("staticOptionPanel").setDisabled(false);
														},
																 change: function(field, newValue, oldValue) {
																 Ext.ComponentQuery.query('#endpointPanel')[0].show();
																 console.log("routing protocol** "+newValue);
																 var bgpOptionGrid = Ext.getCmp("bgpOptionGrid");
																 var bgpOptionPanel = Ext.getCmp("bgpOptionPanel");
																 var staticOptionPanel = Ext.getCmp("staticOptionPanel");
																if(newValue.trim() == 'Static'){
																
																  //bgpOptionGrid.setDisabled(true);	
																    bgpOptionPanel.hide();
																	staticOptionPanel.show();
																	Ext.getCmp("bgpOptionPanel").setDisabled(true);
																	Ext.getCmp("staticOptionPanel").setDisabled(false);
																	Ext.getCmp("prefixListPanel").getStore().removeAll();
																	Ext.getCmp("prefixListTelusSupplierGrid").getStore().removeAll();
																	
																  //Ext.getCmp("optionPanelGrid").reconfigure(me.getStaticRoutingOptions());
																 }else{
																	 bgpOptionPanel.show();
																	 staticOptionPanel.hide();
																	 Ext.getCmp("bgpOptionPanel").setDisabled(false);
																	 Ext.getCmp("staticOptionPanel").setDisabled(true);
																	 Ext.getCmp("staticRoutingOption").getStore().removeAll();
																	 Ext.getCmp("staticTelusSupplierGrid").getStore().removeAll();
																	 
																	 
																 }
																	//Ext.getCmp("accessOptionGrid").show();
																	//Ext.getCmp("optionPanelGrid").getSelectionModel().select(0);
																}
															}
													},
													{
														xtype: 'combobox',
														flex: 1,
														//width: 180,
														emptyText: 'Pick an Option',
														width: 265,
														maxWidth: 265,
														labelWidth: 105,
														hidden: true,
														//labelAlign: 'right',
														fieldLabel: '<b>Prefix Supplier</b>',
														name: 'addressPool',
														id: 'addressPool',
														value: 'Customer (Export)',
														store: ['Customer (Export)', 'TELUS (No Export)']
																
													 }
												
                                            ]
											
                                        },
										{
                                                    xtype: 'combobox',
                                                    fieldLabel: 'Admin State',
                                                    boxLabel: '',
													name: 'adminState',
													id: 'adminState',
													labelAlign: 'right',
													value: 'Down',
													width: 180,
													labelWidth: 100,
													store: [['Up','Up'],['Down','Down']],
                                        },
										{
                                                    xtype: 'checkboxfield',
                                                    fieldLabel: 'Auto Negotiate',
                                                    boxLabel: '',
													name: 'autonegotiate',
													id: 'autonegotiate',
													labelWidth: 100,
                                                }
												
										 
                                    ]
                                }
								
								]
                        },
						{
                            xtype: 'panel',
                            dock: 'top',
                            //height: 510,
							 height:'auto !important',
							width: 900,
							id: 'endpointPanel',
                            animCollapse: false,
                            collapsed: false,
                            collapsible: false,
							preventHeader: true ,
							//hidden: true,
                            title: 'Endpoint Details',
							style: this.FIELDSET_BACKGROUND_COLOR,
							items: [
								{
									xtype: 'container',
									//height: 510,
									 height:'auto !important',
									width: 900,
                                    flex: 1,
                                    items: [
									{
                                    xtype: 'panel',
									animCollapse: false,
									collapsed: false,
									collapsible: false,
									layout: {
										type: 'table',
										columns: 6
									},
                                    height: 100,
                                    title: 'L3 Interface Options',
									id: 'accessOptionGrid',
                                    itemId: 'accessOptionGrid',
									//hidden: true,
									style: this.FIELDSET_BACKGROUND_COLOR,
                                    items: [
										
										{
                                            xtype: 'numberfield',
                                            margin: '5 10 0 10',
                                            width: 100,
											labelWidth: 30,
                                            fieldLabel: '<b>CSID</b>',
											labelAlign: 'left',
											name: 'csId',
											id: 'csId',
											disabled: true,
											maxLength:7,
											minValue: 1,
											allowBlank: false,
                                            enforceMaxLength: true,
											hideTrigger: true,
											keyNavEnabled: false,
											mouseWheelEnabled: false,

											maskRe:/^[0-9]/
                                        },
										{
                                            xtype: 'numberfield',
                                            margin: '5 5 0 0',
                                            width: 105,
											labelWidth: 40,
                                            fieldLabel: '<b>VLAN</b>',
											labelAlign: 'left',
											name: 'vlanId',
											id: 'vlanId',
											value: '1500',
											hideTrigger: true,
											keyNavEnabled: false,
											mouseWheelEnabled: false,
                                            labelAlign: 'right',
											minValue: 1,
											maxValue: 4096,
											listeners: {
											  specialkey: function(f,e){
												if (e.getKey() == e.ENTER) {
													me.validateVLAN();
												}
											  }
											}

                                        },
										{
											xtype: 'button',
											text: 'Validate',
											name: 'validateBtn',
											id: 'validateBtn',
											margin: '5 10 0 0',
											labelAlign: 'left',
											tooltip: 'Validate Vlan',
											handler: function(button, event) {
												var vlanId = Ext.getCmp('vlanId').getValue();
												console.log("vlanId "+vlanId);
												me.validateVLAN(vlanId);
											}
										},
                                        {
                                            xtype: 'textfield',
                                            margin: '5 3 0 0',
                                            width: 240,
											maxWidth: 240,
                                            fieldLabel: '<b>IPv4 Address/Mask</b>',
											labelWidth: 120,
											labelAlign: 'left',
                                            name: 'ipAddress',
											id: 'ipAddress',
											allowBlank: false,
											//vtype:'IPAddress',
											listeners: {
											blur : function() {
											if(Ext.getCmp('routingProtocol') != 'Static'){
												var ipAddress = Ext.getCmp("ipAddress").getValue();
																	
																	if(ipAddress !='' && ipAddress != null && ipAddress.split(".").length == 4 && (parseInt(ipAddress.split(".")[0]) > 0 && parseInt(ipAddress.split(".")[0]) < 256  && !isNaN(ipAddress.split(".")[0]) && parseInt(ipAddress.split(".")[1]) >= 0 && parseInt(ipAddress.split(".")[1]) < 256 && !isNaN(ipAddress.split(".")[1]) && parseInt(ipAddress.split(".")[2]) >= 0 && parseInt(ipAddress.split(".")[2]) < 256 && !isNaN(ipAddress.split(".")[2]) && parseInt(ipAddress.split(".")[3]) >= 0 && parseInt(ipAddress.split(".")[3]) < 256 && !isNaN(ipAddress.split(".")[3]) )){
																		//return  true;
																	} else {
																		 Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Error: valid value is xxx.xxx.xxx.xxx");
																		  Ext.getCmp('ipAddress').focus(true, 200);
																		  return;
																	}
												
												 if(ipAddress.split(".").length == 4){
												 if(me.validateIpAddress()){
														Ext.getCmp("neighbourAddress").setValue("");
													  return;
												   };
													 var subnetMask = Ext.getCmp("subnetMask").getValue();
													 var networkAddress = me.getNetworkAddress(ipAddress, subnetMask);
													 var broadcastAddress = me.getBroadcastAddress(ipAddress, subnetMask);
													 
													 var startRange = networkAddress.split(".")[3];
													 var endRange = broadcastAddress.split(".")[3];
													 var neighbourAddress4 = 0;
													 var neighbourAddress='';
													 /*for(int i = startRange; i < endRange; i++){
														neighbourAddress4 = startRange + 1;
													 }*/
													 
													  if(parseInt(ipAddress.split(".")[3]) + 1  == endRange){
														neighbourAddress4 = parseInt(ipAddress.split(".")[3]) - 1;
													  }else {
													  neighbourAddress4 = parseInt(ipAddress.split(".")[3]) + 1;
													 }
													
													 neighbourAddress = ipAddress.split(".")[0]+"."+ipAddress.split(".")[1]+"."+ipAddress.split(".")[2]+"."+neighbourAddress4;
													 
													 //console.log("neighbourAddress > "+neighbourAddress);
													 Ext.getCmp("neighbourAddress").setValue(neighbourAddress);
													}
												}
											},
											'change':function(list,record) {
												 
												}
												
											}
											
											
                                        },
										{
                                            xtype: 'numberfield',
                                            margin: '5 10 0 0',
                                            width: 40,
											maxWidth: 40,
                                            labelSeparator: ' ',
											fieldLabel: '/',
											labelWidth: 5,
                                            name: 'subnetMask',
											id: 'subnetMask',
											allowBlank: false,
											value: '31',
											allowDecimals: false,
											hideTrigger: true,
											keyNavEnabled: false,
											mouseWheelEnabled: false,
											step:this.STEP,
											minValue:this.MIN_SUBNET_MASK,
											maxValue:this.MAX_SUBNET_MASK,
											value:this.DEFAULT_SUBNET_MASK,
											listeners: {
											'change':function(list,record) {
												 var ipAddress = Ext.getCmp("ipAddress").getValue();
												 if(ipAddress.split(".").length == 4){
												 if(me.validateIpAddress()){
														Ext.getCmp("neighbourAddress").setValue("");
													  return;
												   };
													 var subnetMask = Ext.getCmp("subnetMask").getValue();
													 var networkAddress = me.getNetworkAddress(ipAddress, subnetMask);
													 var broadcastAddress = me.getBroadcastAddress(ipAddress, subnetMask);
													 
													 var startRange = networkAddress.split(".")[3];
													 var endRange = broadcastAddress.split(".")[3];
													 var neighbourAddress4 = 0;
													 var neighbourAddress='';
													 /*for(int i = startRange; i < endRange; i++){
														neighbourAddress4 = startRange + 1;
													 }*/
													 
													  if(parseInt(ipAddress.split(".")[3]) + 1  == endRange){
														neighbourAddress4 = parseInt(ipAddress.split(".")[3]) - 1;
													  }else {
													  neighbourAddress4 = parseInt(ipAddress.split(".")[3]) + 1;
													 }
													
													 neighbourAddress = ipAddress.split(".")[0]+"."+ipAddress.split(".")[1]+"."+ipAddress.split(".")[2]+"."+neighbourAddress4;
													 
													 console.log("neighbourAddress > "+neighbourAddress);
													 Ext.getCmp("neighbourAddress").setValue(neighbourAddress);
													}
												}
												
											}
                                        },
										
										
                                        {
                                            xtype: 'combobox',
                                            margin: '5 0 0 0',
                                            width: 132,
											colspan:1,
											margin: '5 10 0 0',
											labelAlign: 'left',
                                            fieldLabel: 'IP MTU',
											value: '1500',
                                            labelWidth: 53,
											labelAlign: 'right',
											name: 'ipMTU',
											id: 'ipMTU',
											store: ['1500', '3000'] 
                                        },
										 
										{
											xtype: 'checkboxfield',
											fieldLabel: 'IPv6 Peer',
											margin: '10 0 0 10',
											//colspan:1,
											labelWidth: 60,
											width: 90,
											labelAlign: 'left',
											boxLabel: '',
											name: 'IPv6Peer',
											id: 'ipv6Peer',
											disabled: true,
											scope: this,
											
											handler: function (field, value) {
												scope: this,
												this.checkValue = field.getValue();
												console.log(this.checkValue);
												if (this.checkValue == true) {
													Ext.getCmp("ipv6Address").show();
													Ext.getCmp("ipv6PrefixListGrid").show();
													Ext.getCmp("prefixListGrid").hide();
													Ext.getCmp("staticOptionGridForIPv6").show();
													
													
												}
												else if (this.checkValue == false) {
													Ext.getCmp("ipv6Address").hide();
													Ext.getCmp("ipv6PrefixListGrid").hide();
													Ext.getCmp("prefixListGrid").show();
													Ext.getCmp("staticOptionGridForIPv6").hide();
												}
											}
											
                                        },
										{
                                            xtype: 'textfield',
                                            margin: '10 0 0 0',
                                            width: 400,
                                            fieldLabel: 'IPv6 Address',
											labelAlign: 'left',
											labelWidth: 80,
											colspan:4,
											labelAlign: 'left',
											name: 'ipv6Address',
											id: 'ipv6Address',
											//maxLength:15,
                                            enforceMaxLength: true,
											hidden: true
											
                                        },
										{
											xtype: 'hiddenfield',
											name: 'index',
											id: 'index'	,
											colspan:1											
										}
										]
                                },
								
								,
								
								//START
								
								{
									xtype: 'panel',
									animCollapse: true,
									collapsed: false,
									collapsible: true,
									//layout: 'column',
                                    title: 'BGP Options',
									id: 'bgpOptionPanel',
                                    itemId: 'bgpOptionPanel',
									disabled: true,
									hidden: true,
									style: this.FIELDSET_BACKGROUND_COLOR,
                            items: [
								{
                                    xtype: 'fieldset',
									height: 50,
                                    maxHeight: 50,
									width: 900,
                                    layout: 'column',
                                    title: 'BGP Options',
									id: 'bgpOptionGrid',
                                    itemId: 'bgpOptionGrid',
									
									//hidden: true,
									style: this.FIELDSET_BACKGROUND_COLOR,
                                    items: [
										{
                                            xtype: 'numberfield',
                                            margin: '0 10 0 0',
                                            width: 130,
                                            fieldLabel: '<b>Peer AS</b>',
                                            labelAlign: 'left',
                                            labelWidth: 60,
											name: 'peerAS',
											id: 'peerAS',
											allowBlank: false,
											minValue: 0,
											hideTrigger: true,
											keyNavEnabled: false,
											mouseWheelEnabled: false,
											listeners: {
												 }
                                        },
                                        {	
                                            xtype: 'numberfield',
                                            //margin: '10 10 0 5',
											margin: '0 10 0 0',
                                            width: 130,
                                            fieldLabel: '<b>Local Pref</b>',
											allowBlank: false,
                                            labelAlign: 'left',
                                            labelWidth: 65,
											name: 'localPref',
											value: '350',
											id: 'localPref',
											hideTrigger: true,
											keyNavEnabled: false,
											mouseWheelEnabled: false
                                        },
                                        {
                                            xtype: 'numberfield',
                                            //margin: '10 0 0 0',
											margin: '0 10 0 0',
                                            width: 130,
                                            fieldLabel: '<b>MED</b>',
                                            labelAlign: 'left',
                                            labelWidth: 25,
											value: '80',
											name: 'med',
											id: 'med',
											hideTrigger: true,
											keyNavEnabled: false,
											mouseWheelEnabled: false
                                        },
										{
                                            xtype: 'textfield',
                                            margin: '0 0 0 0',
                                            width: 210,
											maxWidth: 210,
                                            fieldLabel: '<b>IPv4 Neighbour</b>',
											labelWidth: 90,
                                            name: 'neighbourAddress',
											id: 'neighbourAddress',
											allowBlank: false,
											vtype:'IPAddress'
                                        }
                                        
                                    ]
                                }
                                ,
                                {
                                    xtype: 'fieldcontainer',
                                    height: 180,
                                    width: 827,
                                    fieldLabel: '',
									layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                    xtype: 'fieldset',
									height: 180,
                                    width: 250,
                                    layout: 'column',
                                    title: 'IPv4 CUSTOMER(EXPORT) Prefixes',
									id: 'prefixListGrid',
                                    itemId: 'prefixListGrid',
									collapsed: true,
									checkboxToggle: true,
									//hidden: true,
									style: this.FIELDSET_BACKGROUND_COLOR,
                                   items: [
                                        {
                                          
                                                    xtype: 'gridpanel',
                                                    height: 170,
													margin: '0 0 0 0',
                                                    id: 'prefixListPanel',
                                                    //layout: 'fit',
													autoScroll: true,
													forceFit: true,
                                                    width: 250,
                                                    title: '',
													columnLines: true,
													hideHeaders: false,
                                                    forceFit: true,
                                                    store: this.getPrefixListStore(),
													style: this.FIELDSET_BACKGROUND_COLOR,
													
													columns: [
														{
															xtype: 'rownumberer',
															width: 25,
															sortable: false,
															locked: true,
															align: 'center'
														},
														{
															xtype: 'gridcolumn',
															width: 225,
															align: 'center',
															sortable: true,
															dataIndex: 'prefixList',
															text: 'Prefixes/Mask',
															editable: true,
															align: 'center',
															//renderTo: Ext.getBody(),
															//align: 'left',

															//hidden: false,
															editor: {
                                                                xtype: 'textfield',
																name:'prefixList',
																id:'prefixList'
														
                                                        }
														}
													],
													dockedItems: [{
															xtype: 'toolbar',
															dock: 'top',
															style: this.FIELDSET_BACKGROUND_COLOR,
															 layout: {
																type: 'hbox',
																align: 'middle',
																pack: 'center'
															},
															items: [{
																xtype: 'button',
																text: 'Add',
																width: 60,
																margin: 5,
																//style: this.FIELDSET_BACKGROUND_COLOR,
																style: 'background-color:#476583',
																handler: function(button, event) {
																	me.handleAddPrefixListBGPRouting();
																}
															},  {
																xtype: 'button',
																text: 'Delete',
																//style: this.FIELDSET_BACKGROUND_COLOR,
																style: 'background-color:#476583',
																width: 60,
																handler: function(button, event) {
																	var records = Ext.getCmp("prefixListPanel").selModel.getSelection();
																	Ext.getCmp("prefixListPanel").getStore().remove(records);
																	Ext.getCmp("prefixListPanel").getView().refresh();
																}
											
															}]
														}],
													
													plugins: [
                                                        Ext.create('Ext.grid.plugin.RowEditing', {
                                                            clicksToEdit: 1,
															 autoCancel: true,
															 //autoCancel: false
															//triggerEvent: 'cellclick',
                                                            listeners: {
                                                                edit: {
                                                                 fn: me.onRowEditingForIPv4Prefix,
																	scope: me
                                                                }
                                                            }
                                                        })
                                                    
                                                
                                            ]
                                }
								 ]
                                },
                                        {
                                    xtype: 'fieldset',
									height: 180,
                                    width: 250,
                                    layout: 'column',
                                    title: 'IPv4 TELUS(NO EXPORT )Prefixes',
									id: 'prefixListTelusSupplierFieldset',
                                    itemId: 'prefixListTelusSupplierFieldset',
									checkboxToggle: true,
									collapsed: true,
									//hidden: true,
									style: this.FIELDSET_BACKGROUND_COLOR,
                                   items: [
                                        {
                                          
                                                    xtype: 'gridpanel',
                                                    height: 170,
													margin: '0 0 0 0',
                                                    id: 'prefixListTelusSupplierGrid',
                                                    //layout: 'fit',
													autoScroll: true,
													forceFit: true,
                                                    width: 250,
                                                    title: '',
													columnLines: true,
													hideHeaders: false,
                                                    forceFit: true,
                                                    store: this.getPrefixListStore(),
													style: this.FIELDSET_BACKGROUND_COLOR,
													
													columns: [
														{
															xtype: 'rownumberer',
															width: 25,
															sortable: false,
															locked: true,
															align: 'center'
														},
														{
															xtype: 'gridcolumn',
															width: 225,
															align: 'center',
															sortable: true,
															dataIndex: 'prefixList',
															text: 'Prefixes/Mask',
															editable: true,
															editor: {
                                                                xtype: 'textfield',
																name:'prefixListTelusSupplier',
																id:'prefixListTelusSupplier'
														
                                                        }
														}
													],
													dockedItems: [{
															xtype: 'toolbar',
															dock: 'top',
															style: this.FIELDSET_BACKGROUND_COLOR,
															 layout: {
																type: 'hbox',
																align: 'middle',
																pack: 'center'
															},
															items: [{
																xtype: 'button',
																text: 'Add',
																width: 60,
																margin: 5,
																//style: this.FIELDSET_BACKGROUND_COLOR,
																style: 'background-color:#476583',
																handler: function(button, event) {
																	me.handleAddPrefixListBGPTelusNoExport();//handleAddPrefixListBGPRouting
																}
															},  {
																xtype: 'button',
																text: 'Delete',
																//style: this.FIELDSET_BACKGROUND_COLOR,
																style: 'background-color:#476583',
																width: 60,
																handler: function(button, event) {
																	var records = Ext.getCmp("prefixListTelusSupplierGrid").selModel.getSelection();
																	Ext.getCmp("prefixListTelusSupplierGrid").getStore().remove(records);
																	Ext.getCmp("prefixListTelusSupplierGrid").getView().refresh();
																}
											
															}]
														}],
													
													plugins: [
                                                        Ext.create('Ext.grid.plugin.RowEditing', {
                                                            clicksToEdit: 1,
															 autoCancel: true,
															 //autoCancel: false
															//triggerEvent: 'cellclick',
                                                            listeners: {
                                                                edit: {
                                                                 fn: me.onRowEditingForIPv4PrefixTelusSupplier,
																	scope: me
                                                                }
                                                            }
                                                        })
                                                    
                                                
                                            ]
                                }
								 ]
                                },
                                       {
                                    xtype: 'fieldset',
									//animCollapse: true,
									//collapsed: false,
									//collapsible: true,
                                    height: 180,
                                    width: 340,
                                    layout: 'column',
                                    title: 'IPv4/IPv6 PrefixList',
									id: 'ipv6PrefixListGrid',
                                    itemId: 'ipv6PrefixListGrid',
									
									hidden: true,
									style: this.FIELDSET_BACKGROUND_COLOR,
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    height: 180,
                                                    id: 'ipv6PrefixListPanel',
                                                    //layout: 'fit',
													autoScroll: true,
													forceFit: true,
                                                    width: 320,
                                                    title: '',
													columnLines: true,
													hideHeaders: false,
                                                    forceFit: true,
                                                    store: this.getIPv6PrefixListStore(),
													style: this.FIELDSET_BACKGROUND_COLOR,
													
													columns: [
														{
															xtype: 'gridcolumn',
															maxWidth: 320,
															align: 'center',
															sortable: true,
															dataIndex: 'prefixList',
															text: 'IPv4',
															editable: true,
															//renderTo: Ext.getBody(),

															//hidden: false,
															editor: {
                                                                xtype: 'textfield',
																name:'prefixList1',
																id:'prefixList1'
																
                                                            }
														},
														{
															xtype: 'gridcolumn',
															maxWidth: 170,
															align: 'center',
															sortable: true,
															dataIndex: 'ipv6PrefixList',
															text: 'IPv6',
															editable: true,
															//renderTo: Ext.getBody(),

															//hidden: false,
															editor: {
                                                                xtype: 'textfield',
																name:'ipv6PrefixList1',
																name:'ipv6PrefixList1'
                                                            }
														}
													],
													dockedItems: [{
															xtype: 'toolbar',
															dock: 'top',
															style: this.FIELDSET_BACKGROUND_COLOR,
															 layout: {
																type: 'hbox',
																align: 'middle',
																pack: 'center'
															},
															items: [{
																xtype: 'button',
																text: 'Add',
																width: 60,
																margin: 5,
																//style: this.FIELDSET_BACKGROUND_COLOR,
																style: 'background-color:#476583',
																handler: function(button, event) {
																	//me.handleAddIPv6PrefixListBGPRouting();
																}
															},  {
																xtype: 'button',
																text: 'Delete',
																//style: this.FIELDSET_BACKGROUND_COLOR,
																style: 'background-color:#476583',
																width: 60,
																handler: function(button, event) {
																	var records = Ext.getCmp("ipv6PrefixListPanel").selModel.getSelection();
																	Ext.getCmp("ipv6PrefixListPanel").getStore().remove(records);
																	Ext.getCmp("ipv6PrefixListPanel").getView().refresh();
																}
											
															}]
														}],
													
													plugins: [
                                                        Ext.create('Ext.grid.plugin.RowEditing', {
                                                            clicksToEdit: 1,
															 autoCancel: true,
															 //autoCancel: false
															//triggerEvent: 'cellclick',
                                                            listeners: {
                                                                /*edit: {
                                                                 fn: me.onRowEditingForIPv6Prefix,
																	scope: me
                                                                }*/
                                                            }
                                                        })
                                                    ]
                                                }
                                           
								]
								}
                                    ]
                                }
                            ]
                        }
								
								//END
								,
								 
								 
								 {
								xtype: 'panel',
								id: 'staticOptionPanel',
								animCollapse: true,
								collapsed: false,
								collapsible: true,
								//hidden: true,
								title: 'Static Options',
								style: this.FIELDSET_BACKGROUND_COLOR,
								items: [
									{
									 
                                    xtype: 'container',
									id: 'staticOptioncontainer',
								   width: 800,
								    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
											{
												xtype: 'fieldset',
												height: 180,
												width: 220,
												layout: 'column',
												title: 'CUSTOMER(EXPORT) prefixes',
												id: 'staticOptionCustSupplier',
												itemId: 'staticOptionCustSupplier',
												collapsed: true,
												checkboxToggle: true,
												//hidden: true,
												style: this.FIELDSET_BACKGROUND_COLOR,
											   
														items: [
															{
																xtype: 'textfield',
																flex: 1,
																maxHeight: 25,
																width: 190,
																name: 'nextHopVal',
																id: 'nextHopVal',
																fieldLabel: 'Next Hop',
																//fieldLabel: '<font color="#808080">Next Hop</font>',
																//fieldStyle: 'color:#808080',
																labelWidth: 55,
																//allowBlank: false,
																minLength:1,
																listeners: {
																blur : function() {
																	var ipAddress = Ext.getCmp("nextHopVal").getValue();
																						
																	if(ipAddress !='' && ipAddress != null && ipAddress.split(".").length == 4 && (parseInt(ipAddress.split(".")[0]) > 0 && parseInt(ipAddress.split(".")[0]) < 256  && !isNaN(ipAddress.split(".")[0]) && parseInt(ipAddress.split(".")[1]) >= 0 && parseInt(ipAddress.split(".")[1]) < 256 && !isNaN(ipAddress.split(".")[1]) && parseInt(ipAddress.split(".")[2]) >= 0 && parseInt(ipAddress.split(".")[2]) < 256 && !isNaN(ipAddress.split(".")[2]) && parseInt(ipAddress.split(".")[3]) >= 0 && parseInt(ipAddress.split(".")[3]) < 256 && !isNaN(ipAddress.split(".")[3]) )){
																		//return  true;
																	} else {
																		 Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Error: valid value is xxx.xxx.xxx.xxx");
																		  Ext.getCmp('ipAddress').focus(true, 200);
																		  return;
																	}
																	
																}
															
															}
																
															},
															{
																xtype: 'gridpanel',
																height: 175,
																id: 'staticRoutingOption',
																//layout: 'fit',
																autoScroll: true,
																forceFit: true,
																width: 200,
																title: '',
																columnLines: true,
																hideHeaders: false,
																forceFit: true,
																store: this.getStaticGridStore(),
																style: this.FIELDSET_BACKGROUND_COLOR,
																columns: [
																	{
																		xtype: 'rownumberer',
																		width: 25,
																		sortable: false,
																		locked: true,
																		align: 'center'
																	},
																	{
																		xtype: 'gridcolumn',
																		width: 200,
																		align: 'center',
																		sortable: true,
																		dataIndex: 'destinationPrefix',
																		text: 'Prefixe/Mask',
																		editable: true,
																		editor: {
																			xtype: 'textfield',
																			name:'destPrefixVal',
																			id:'destPrefixVal',
																			maskRe:/^[0-9 . /]/,
																			listeners: {
																				
																		'change':function(list,record) {
																 
																			}
																		}
																			
																		}
																		
																	}/*,
																	{
																		xtype: 'gridcolumn',
																		sortable: true,
																		width: 155,
																		text: 'Next Hop',
																		align: 'center',
																		editable: true,
																		dataIndex: 'nextHop',
																		//hidden: false,
																		editor: {
																			xtype:'textfield',
																			name:'nextHopVal',
																			id:'nextHopVal',
																			maskRe:/^[0-9 .]/
																			//vtype:'IPAddress'
																			}
																	}*/
																],
																dockedItems: [{
																		xtype: 'toolbar',
																		dock: 'top',
																		style: 'background-color:#476583',//this.FIELDSET_BACKGROUND_COLOR,

																		 layout: {
																			type: 'hbox',
																			align: 'middle',
																			pack: 'center'
																		},
																		items: [{
																			xtype: 'button',
																			text: '<font color="#FFFFFF">Add</font>',
																			//style: this.FIELDSET_BACKGROUND_COLOR,
																			style: 'background-color:#476583',
																			fieldLabel: '<font color="#FFFFFF">Add</font>',
																			width: 70,
																			margin: 5,
																			handler: function(button, event) {
																				me.handleAddStaticRouting();
																			}
																		},  {
																			xtype: 'button',
																			text: '<font color="#FFFFFF">Delete</font>',
																			//style: this.FIELDSET_BACKGROUND_COLOR,
																			style: 'background-color:#476583',
																			width: 70,
																			handler: function(button, event) {
																				var records = Ext.getCmp("staticRoutingOption").selModel.getSelection();
																				Ext.getCmp("staticRoutingOption").getStore().remove(records);
																				Ext.getCmp("staticRoutingOption").getView().refresh();
																			}
														
																		}]
																	}],
																
																plugins: [
																	Ext.create('Ext.grid.plugin.RowEditing', {
																		clicksToEdit: 1,
																		 autoCancel: true,
																		//triggerEvent: 'cellclick',
																		listeners: {
																			edit: {
																			 fn: me.onRowEditingEdit,
																				scope: me
																			}
																		}
																	})
																]
															}
											 ]
											},
											{
                                    xtype: 'fieldset',
                                    height: 180,
                                    width: 220,
                                    layout: 'column',
									checkboxToggle: true,
                                    title: 'TELUS(NO EXPORT) prefixes',
									id: 'staticOptionTelusSupplier',
                                    itemId: 'staticOptionTelusSupplier',
									collapsed: true,
									//hidden: true,
									style: this.FIELDSET_BACKGROUND_COLOR,
                                   
                                            items: [
												{
													xtype: 'textfield',
													flex: 1,
													maxHeight: 25,
													width: 190,
													name: 'nextHopTelusSupplier',
													id: 'nextHopTelusSupplier',
													fieldLabel: 'Next Hop',
													labelWidth: 55,
													//allowBlank: false,
													minLength:1,
													listeners: {
													blur : function() {
														var ipAddress = Ext.getCmp("nextHopTelusSupplier").getValue();
																			
														if(ipAddress !='' && ipAddress != null && ipAddress.split(".").length == 4 && (parseInt(ipAddress.split(".")[0]) > 0 && parseInt(ipAddress.split(".")[0]) < 256  && !isNaN(ipAddress.split(".")[0]) && parseInt(ipAddress.split(".")[1]) >= 0 && parseInt(ipAddress.split(".")[1]) < 256 && !isNaN(ipAddress.split(".")[1]) && parseInt(ipAddress.split(".")[2]) >= 0 && parseInt(ipAddress.split(".")[2]) < 256 && !isNaN(ipAddress.split(".")[2]) && parseInt(ipAddress.split(".")[3]) >= 0 && parseInt(ipAddress.split(".")[3]) < 256 && !isNaN(ipAddress.split(".")[3]) )){
															//return  true;
														} else {
															 Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Error: valid value is xxx.xxx.xxx.xxx");
															  Ext.getCmp('ipAddress').focus(true, 200);
															  return;
														}
														
													}
												
												}
													
												},
                                                {
                                                    xtype: 'gridpanel',
                                                    height: 175,
                                                    id: 'staticTelusSupplierGrid',
                                                    //layout: 'fit',
													autoScroll: true,
													forceFit: true,
                                                    width: 200,
                                                    title: '',
													columnLines: true,
													hideHeaders: false,
                                                    forceFit: true,
                                                    store: this.getStaticTelusSupplierGrid(),
													style: this.FIELDSET_BACKGROUND_COLOR,
													columns: [
														{
															xtype: 'rownumberer',
															width: 25,
															sortable: false,
															locked: true,
															align: 'center'
														},
														{
															xtype: 'gridcolumn',
															width: 175,
															align: 'center',
															sortable: true,
															dataIndex: 'destinationPrefix',
															text: 'Prefixe/Mask',
															editable: true,
															editor: {
                                                                xtype: 'textfield',
																name:'destPrefixTelusSupplier',
																id:'destPrefixTelusSupplier',
																maskRe:/^[0-9 . /]/,
																listeners: {
																	
															'change':function(list,record) {
													 
																}
															}
																
                                                            }
															
														}
													],
													dockedItems: [{
															xtype: 'toolbar',
															dock: 'top',
															style: 'background-color:#476583',//this.FIELDSET_BACKGROUND_COLOR,

															 layout: {
																type: 'hbox',
																align: 'middle',
																pack: 'center'
															},
															items: [{
																xtype: 'button',
																text: '<font color="#FFFFFF">Add</font>',
																//style: this.FIELDSET_BACKGROUND_COLOR,
																style: 'background-color:#476583',
																fieldLabel: '<font color="#FFFFFF">Add</font>',
																width: 70,
																margin: 5,
																handler: function(button, event) {
																	me.handleAddStaticTelusSupplier();
																}
															},  {
																xtype: 'button',
																text: '<font color="#FFFFFF">Delete</font>',
																//style: this.FIELDSET_BACKGROUND_COLOR,
																style: 'background-color:#476583',
																width: 70,
																handler: function(button, event) {
																	var records = Ext.getCmp("staticTelusSupplierGrid").selModel.getSelection();
																	Ext.getCmp("staticTelusSupplierGrid").getStore().remove(records);
																	Ext.getCmp("staticTelusSupplierGrid").getView().refresh();
																}
											
															}]
														}],
													
													plugins: [
                                                        Ext.create('Ext.grid.plugin.RowEditing', {
                                                            clicksToEdit: 1,
															 autoCancel: true,
															//triggerEvent: 'cellclick',
                                                            listeners: {
                                                                edit: {
                                                                 fn: me.onRowEditingEdit,
																	scope: me
                                                                }
                                                            }
                                                        })
                                                    ]
                                                }
								 ]
                                },
								{
                                    xtype: 'fieldset',
                                    height: 180,
                                    width: 400,
                                    layout: 'column',
                                    title: 'IPv6 Routing Options',
									id: 'staticOptionGridForIPv6',
                                    itemId: 'staticOptionGridForIPv6',
									hidden: true,
									style: this.FIELDSET_BACKGROUND_COLOR,
                                           items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    height: 170,
                                                    id: 'staticRoutingOptionForIPv6',
                                                    autoScroll: true,
													forceFit: true,
                                                    width: 380,
                                                    title: '',
													columnLines: true,
													hideHeaders: false,
                                                    forceFit: true,
                                                    store: this.getStaticGridStoreIPv6(),
													style: this.FIELDSET_BACKGROUND_COLOR,
													columns: [
														{
															xtype: 'gridcolumn',
															maxWidth: 300,
															align: 'center',
															sortable: true,
															dataIndex: 'destinationPrefix',
															text: 'Prefixe/Mask',
															editable: true,
															//renderTo: Ext.getBody(),

															//hidden: false,
															/*editor: {
                                                                xtype: 'textfield',
																name:'destPrefixVal',
																vtype:'IPAddress'
                                                            }*/
															
															editor: {
                                                                xtype: 'textfield',
																name:'destPrefixVal1',
																id:'destPrefixVal1'	
                                                            }
															
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: 'Next Hop',
															align: 'center',
															editable: true,
															dataIndex: 'nextHop',
															//hidden: false,
															editor: {
                                                                xtype:'textfield',
																name:'nextHopVal1',
																name:'nextHopVal1',
																//vtype:'IPAddress'
																}
														}
													],
													dockedItems: [{
															xtype: 'toolbar',
															dock: 'top',
															style: this.FIELDSET_BACKGROUND_COLOR,
															 layout: {
																type: 'hbox',
																align: 'middle',
																pack: 'center'
															},
															items: [{
																xtype: 'button',
																text: 'Add',
																width: 100,
																//style: this.FIELDSET_BACKGROUND_COLOR,
																style: 'background-color:#476583',
																margin: 5,
																handler: function(button, event) {
																	//me.handleAddStaticRoutingForIPv6();
																}
															},  {
																xtype: 'button',
																text: 'Delete',
																width: 120,
																//style: this.FIELDSET_BACKGROUND_COLOR,
																style: 'background-color:#476583',
																handler: function(button, event) {
																	var records = Ext.getCmp("staticRoutingOptionForIPv6").selModel.getSelection();
																	Ext.getCmp("staticRoutingOptionForIPv6").getStore().remove(records);
																	Ext.getCmp("staticRoutingOptionForIPv6").getView().refresh();
																}
											
															}]
														}],
													
													plugins: [
                                                        Ext.create('Ext.grid.plugin.RowEditing', {
                                                            clicksToEdit: 1,
															 autoCancel: true,
															//triggerEvent: 'cellclick',
                                                            listeners: {
                                                                /*edit: {
                                                                 fn: me.onRowEditingEdit,
																	scope: me
                                                                }*/
                                                            }
                                                        })
                                                    ]
                                                }
                                            ]
                                }]}]},
								{
                                    xtype: 'panel',
									animCollapse: true,
									collapsed: false,
									collapsible: true,
                                    height: 80,
                                    width: 900,
                                    layout: 'table',
                                    title: 'CIU Options',
									id: 'ciuOptionGrid',
                                    itemId: 'ciuOptionGrid',
									//hidden: true,
									style: this.FIELDSET_BACKGROUND_COLOR,
                                    items: [
										{
                                            xtype: 'textfield',
                                            margin: '10 10 0 10',
                                            width: 300,
											labelWidth: 60,
                                            fieldLabel: '<b>CIU Name</b>',
											name: 'ciuName',
											id: 'ciuName',
											maxLength: 26,
											allowBlank: false,
											enableKeyEvents: true,
											maskRe:/^[A-Za-z0-9-]/,
											listeners: {
											keydown : function(form, e){
											//alert("shiftkey press: "+e.shiftKey );
											//alert("key press: "+e.keyCode);
											console.log("key code: "+e.keyCode);
											
												if (e.keyCode == 33) {
												//alert(e.keyCode);
												return false;	
													//me.validateVLAN();
												}
											  }
										}
                                        },
										{
                                            xtype: 'textfield',
                                            margin: '10 0 0 10',
                                            width: 300,
											labelWidth: 60,
                                            fieldLabel: 'CIU Alias',
											labelAlign: 'right',
											name: 'ciuAlias',
											id: 'ciuAlias',
											maxLength: 26,
											enableKeyEvents: true,
											maskRe:/^[A-Za-z0-9 :_-]/,
											listeners: {
											keydown : function(form, e){
											//alert("shiftkey press: "+e.shiftKey );
											//alert("key press: "+e.keyCode);
											console.log("key code: "+e.keyCode);
											
												if (e.keyCode == 33) {
												//alert(e.keyCode);
												return false;	
													//me.validateVLAN();
												}
											  }
										}
                                        }
										 
                                       
									]
								},
                                {
                                    xtype: 'panel',
									animCollapse: true,
									collapsed: false,
									collapsible: true,
                                    height: 70,
                                    width: 900,
                                    layout: 'column',
                                    title: 'QoS Options',
									id: 'qosOptionGrid',
                                    itemId: 'qosOptionGrid',
									//hidden: true,
									style: this.FIELDSET_BACKGROUND_COLOR,
                                    items: [
											{
												xtype: 'textfield',
												width: 0,
												labelWidth: 0,
												name: 'qosType',
												id: 'qosType',
												hidden: true
											},
											{
												xtype: 'combobox',
												//margin: '0 20 0 0',
												margin: '10 10 0 10',
											   // maxWidth: 160,
												//width: 160,
												fieldLabel: 'Ingress Override Rate (kbps)',
												labelWidth: 170,
												hidden: true,
												store: this.getAccessRate(),
												queryMode: 'local',
												displayField: 'displayText',
												valueField: 'valueText',
												name: 'ingressRate',
												id: 'ingressRate',
												//allowBlank: false,
												listeners: {
														 change: function(field, newValue, oldValue) {
														
												}
											}
                                        },
										{
												xtype: 'combobox',
												//margin: '0 20 0 0',
												margin: '10 10 0 10',
											   // maxWidth: 160,
												//width: 160,
												fieldLabel: '<b>Access Rate</b>',
												labelWidth: 80,
												store: this.getAccessRate(),
												queryMode: 'local',
												displayField: 'displayText',
												valueField: 'valueText',
												name: 'egressRate',
												id: 'egressRate',
												allowBlank: false,
												listeners: {
														 change: function(field, newValue, oldValue) {
														
														}
												}
											}
                                        
											
									]
								}

								
							]
						}
						]
						
						
						}
						,
						{
                            xtype: 'fieldcontainer',
                            height: 40,
                            fieldLabel: '',
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Add To Staged Interfaces',
									name: 'stageBtn',
									id: 'stageBtn',
									 width: 170,
                                     margin: 5,
									handler: function(button, event) {
                                        me.handleAddStagedInterface();
                                    }
                                },
								{
                                    xtype: 'button',
                                    text: 'Update',
									name: 'updateBtn',
									id: 'updateBtn',
									hidden: true,
									width: 100,
                                    margin: 5,
									handler: function(button, event) {
                                        me.handleUpdateStagedInterface();
                                    }
                                },
								{
									xtype: 'button',
									width: 180,
									id: 'clearAddSiteInterfacePanelButton',
									text: 'Clear Field',
									tooltip: 'Clear Panel Entries',
									handler: function(button, event) {
										me.handleClearAddSiteInterfacePanelButton();
									}
								}
                            ]
                        },
                       {
                            xtype: 'fieldset',
                            height: 155,
                            width: 900,
                            title: 'Staged Interface Area',
							style: this.FIELDSET_BACKGROUND_COLOR,
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'center'
                            },
                            items: [
								{
                                    xtype: 'panel',
                                    flex: 1,
                                    //height: 367,
                                    //maxHeight: 125,
                                    headerPosition: 'right',
                                    activeTab: 0,
									style: this.FIELDSET_BACKGROUND_COLOR,
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            title: '',
											layout: 'fit',
											minHeight: 90,
											height: 140,
											tabConfig: {
                                                //xtype: 'tab',
                                                //width: 70
                                            },
											style: this.FIELDSET_BACKGROUND_COLOR,
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    height: 140,
                                                    id: 'stagedInterfacesGrid',
													name: 'stagedInterfacesGrid',
                                                    //maxHeight: 180,
													layout: 'fit',
                                                    maxWidth: 875,
                                                    width: 875,
                                                    title: '',
													columnLines: true,
													hideHeaders: false,
                                                    forceFit: true,
                                                    store: this.getStagedInterfacesStore(),
													style: this.FIELDSET_BACKGROUND_COLOR,
													columns: [
														
														{
															xtype: 'gridcolumn',
															//width: 1,
															hidden: true,
															hideable: false,
															dataIndex: 'pedeviceId'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															align: 'center',
															dataIndex: 'site',
															text: 'Site Name',
															hidden: false,
															hideable:false
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															align: 'center',
															dataIndex: 'Interface',
															//hideable: false,
															maxWidth: 160,
															text: 'Port',
															hidden: false
														},
														{
															xtype: 'gridcolumn',
															//maxWidth: 70,
															align: 'center',
															sortable: true,
															dataIndex: 'endPointServiceType',
															text: 'Service Type'
														},
														{
                                                            xtype: 'gridcolumn',
                                                            text: 'CIU Name',
                                                            align: 'center',
                                                            dataIndex: 'ciuName',
                                                            hidden: true
                                                        },{
                                                            xtype: 'gridcolumn',
                                                            text: 'CIU Alias',
                                                            align: 'center',
                                                            dataIndex: 'ciuAlias',
                                                            hidden: true
                                                        },
														{
                                                            xtype: 'gridcolumn',
                                                            text: 'Access Type',
                                                            align: 'center',
                                                            dataIndex: 'accessType'//,
                                                            //hidden: true
                                                        },
														{
                                                            xtype: 'gridcolumn',
                                                            text: 'Conn. Type',
                                                            align: 'center',
                                                            dataIndex: 'connectionType'//,
                                                            //hidden: true
                                                        },
														{
															xtype: 'gridcolumn',
															editable: true,
															maxWidth: 160,
															//maxValue: 4096,
															//minValue: 1,
															sortable: true,
															editable: true,
															align: 'center',
															dataIndex: 'vlanId',
															//hideable: false,
															text: 'VLAN',
															width: 50
                                                            
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: 'IP Address',
															//align: 'center',
															editable: true,
															dataIndex: 'ipAddress',
															hidden: true
														},
																											
														{
															xtype: 'gridcolumn',
															sortable: true,
															align: 'center',
															text: 'IP MTU',
															dataIndex: 'ipMTU',
															hidden: true,
															width: 50
														},
														
														
														{
                                                            xtype: 'gridcolumn',
                                                            text: 'Record OPT Type',
                                                            align: 'center',
                                                            dataIndex: 'recordOPType',
                                                            hidden: true
                                                        },
														{
															xtype: 'gridcolumn',
															text: 'subnetMask',
															dataIndex: 'subnetMask',
															hidden: true,
															width: 0
														},
														{
															xtype: 'gridcolumn',
															text: 'Neighbour Address',
															dataIndex: 'neighbourAddress',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR
														},
														
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: 'Local Pref',
															//value: '350',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'localPref'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: 'MED',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'med'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: 'Peer AS',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'peerAS'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: 'minRouteAdvertiesment',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'minRouteAdvertiesment'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: 'Ext Communities',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'enforceRoute'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: 'IPv6 Peer',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'ipv6Peer'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: 'IPv6 Address',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'ipv6Address'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: 'MVPN',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'mvpn'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: '',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'csId'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: '',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'pathPreferences'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: 'Routing Protocol',
															dataIndex: 'routingProtocol'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: 'Address Pool',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'addressPool'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'ingressRate'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'egressRate'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'staticRoutes'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'StaticRoutesNoExport'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'nextHopVal'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'nextHopTelusSupplier'
														},
														
														{
															xtype: 'gridcolumn',
															sortable: true,
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'staticRoutesForIPv6'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'prefixList'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'prefixListTelusSupplier'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'ipv6PrefixList'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: '',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'autonegotiate'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: '',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'adminState'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: '',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'multiVRF'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: '',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'firstUnitForVRF'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: '',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'traficControlProfile'
														},
														{
                                                            xtype: 'gridcolumn',
                                                            align: 'center',
                                                            dataIndex: 'portSpeed',
															hidden: true
                                                        },
														{
                                                            xtype: 'gridcolumn',
                                                            align: 'center',
                                                            dataIndex: 'operationalMode',
															hidden: true
                                                        },
														{
                                                            xtype: 'gridcolumn',
                                                            align: 'center',
                                                            dataIndex: 'dataForDisplay',
															hidden: true
                                                        },
														{
                                                            xtype: 'gridcolumn',
                                                            align: 'center',
                                                            dataIndex: 'staticExport',
															hidden: true
                                                        },
														{
                                                            xtype: 'gridcolumn',
                                                            align: 'center',
                                                            dataIndex: 'staticNoExport',
															hidden: true
                                                        },
														{
                                                            xtype: 'gridcolumn',
                                                            align: 'center',
                                                            dataIndex: 'bgpExport',
															hidden: true
                                                        },
														{
                                                            xtype: 'gridcolumn',
                                                            align: 'center',
                                                            dataIndex: 'bgpNoExport',
															hidden: true
                                                        }
														
													],
													listeners: {
															itemdblclick: function(dv, record, item, index, e) {
															var endpointPanel = Ext.ComponentQuery.query('#endpointPanel')[0];
															endpointPanel.show();
															////this.isCCI=true;
															var updateBtn = Ext.getCmp('updateBtn');
															updateBtn.show();
															
															
															var interfacegrid = Ext.ComponentQuery.query('gridpanel[name=siteInterfaceGrid]')[0];
															interfacegrid.setDisabled(true);
															var stageBtn = Ext.getCmp('stageBtn');
															Ext.getCmp("routingProtocol").setDisabled(true);
															
															var portCombo = Ext.getCmp("portSpeed");
															//childCombo.clearValue();
															portCombo.getStore().removeAll();
															var portName = record.get('Interface');
															console.log("port name** "+portName);
															if(portName.indexOf("ge") != -1){
																portCombo.setValue("1g");
																portCombo.bindStore(me.getPortSpeed()); //bind the store for up
																
															}
															else if(portName.indexOf("xe") != -1){
																portCombo.bindStore(me.getPortSpeedForXEPort()); //bind the store for up
																portCombo.setValue("10g");
															}else{
															portCombo.bindStore(['']); //bind the store for up
																portCombo.setValue("");
															}
															Ext.getCmp("portSpeed").setValue(record.get('portSpeed'));
															Ext.getCmp("operationalMode").setValue(record.get('operationalMode'));
															
															var clearInactiveEntriesFromListButton = Ext.getCmp('clearInactiveEntriesFromListButton');
															clearInactiveEntriesFromListButton.hide();
															var endPointServiceType =Ext.getCmp("endPointServiceType").setValue(record.get('endPointServiceType'));
															var autonegotiate =Ext.getCmp("autonegotiate").setValue(record.get('autonegotiate'));	
															var adminState =Ext.getCmp("adminState").setValue(record.get('adminState'));
															var multiVRF =Ext.getCmp("multiVRF").setValue(record.get('multiVRF'));
															var firstUnitForVRF =Ext.getCmp("firstUnitForVRF").setValue(record.get('firstUnitForVRF'));
															Ext.getCmp("traficControlProfile").setValue(record.get('traficControlProfile'));
															
															var ciuName =Ext.getCmp("ciuName").setValue(record.get('ciuName'));
															var ciuAlias =Ext.getCmp("ciuAlias").setValue(record.get('ciuAlias'));
															var accessType =Ext.getCmp("accessType").setValue(record.get('accessType'));
															var connectionType =Ext.getCmp("connectionType").setValue(record.get('connectionType'));
															var csId =Ext.getCmp("csId").setValue(record.get('csId'));
															var pathPreferences =Ext.getCmp("pathPreferences").setValue(record.get('pathPreferences'));
															var vlanId =Ext.getCmp("vlanId").setValue(record.get('vlanId'));
															var ipAddress =Ext.getCmp("ipAddress").setValue(record.get('ipAddress'));
															var subnetMask =Ext.getCmp("subnetMask").setValue(record.get('subnetMask'));
															
															
															var ipMTU =Ext.getCmp("ipMTU").setValue(record.get('ipMTU'));
															
															var ipv6Peer =Ext.getCmp("ipv6Peer").setValue(record.get('ipv6Peer'));
															var ipv6Address =Ext.getCmp("ipv6Address").setValue(record.get('ipv6Address'));
															//var ipv6Adr = record.get('ipv6Address').split(".");
															
															console.log("ipv6Address .  "+ipv6Address);
													
															var neighbourAddress =Ext.getCmp("neighbourAddress").setValue(record.get('neighbourAddress'));
															var localPref =Ext.getCmp("localPref").setValue(record.get('localPref'));
															var med =Ext.getCmp("med").setValue(record.get('med'));
															var peerAS =Ext.getCmp("peerAS").setValue(record.get('peerAS'));
															stageBtn.hide();
															var selectedRowIndex = Ext.getCmp('index');
															selectedRowIndex.setValue(index);
															
															var routingProtocol =Ext.getCmp("routingProtocol").setValue(record.get('routingProtocol'));
															Ext.getCmp("addressPool").setValue(record.get('addressPool'));
															if(record.get('ingressRate') != null){
																Ext.getCmp("ingressRate").setValue(record.get('ingressRate').toUpperCase());
															}
															Ext.getCmp("egressRate").setValue(record.get('egressRate').toUpperCase());
															try{
																Ext.getCmp("staticOptionCustSupplier").collapsed = record.get('staticExport');
																Ext.getCmp("staticOptionTelusSupplier").collapsed = record.get('staticNoExport');
																Ext.getCmp("prefixListTelusSupplierFieldset").collapsed = record.get('bgpExport');
																Ext.getCmp("prefixListGrid").collapsed = record.get('bgpNoExport');
															}catch(e){
																console.log(">> > > "+e);
															}
															if(Ext.getCmp("prefixListPanel").getStore().removeAll() != undefined)
																Ext.getCmp("prefixListPanel").getStore().removeAll();
															if(Ext.getCmp("prefixListTelusSupplierGrid").getStore().removeAll() != undefined)	
																Ext.getCmp("prefixListTelusSupplierGrid").getStore().removeAll();
															if(Ext.getCmp("ipv6PrefixListPanel").getStore().removeAll() != undefined)		
																Ext.getCmp("ipv6PrefixListPanel").getStore().removeAll();
															if(Ext.getCmp("staticRoutingOption").getStore().removeAll() != undefined)		
																Ext.getCmp("staticRoutingOption").getStore().removeAll();
															if(Ext.getCmp("staticTelusSupplierGrid").getStore().removeAll() != undefined)		
																Ext.getCmp("staticTelusSupplierGrid").getStore().removeAll();
															if(Ext.getCmp("staticRoutingOptionForIPv6").getStore().removeAll() != undefined)	
																Ext.getCmp("staticRoutingOptionForIPv6").getStore().removeAll();
															
															
															if(record.get('routingProtocol') != 'Static'){
															console.log("1");
															if(Ext.getCmp("ipv6Peer").getValue() ==false && (record.get('prefixList').length == undefined || record.get('ipv6PrefixList').length == 'undefined')){ //this block will trigger for when pull the failed order for ipv4.
															console.log("2");
															console.log("pref list : "+record.get('prefixList').prefixList);
																Ext.getCmp("prefixListPanel").getStore().add({
																			prefixList: record.get('prefixList').prefixList
																		
																		}); 
																				
															}

															if(Ext.getCmp("ipv6Peer").getValue() ==false ){ 
															console.log(">>>>>>>>>>>>>>>>>>>");
															
															for (var i=0; i< record.get('prefixList').length; i++) {
																	console.log("prefixList "+ record.get('prefixList')[i].prefixList);
																		Ext.getCmp("prefixListPanel").getStore().add({
																			prefixList: record.get('prefixList')[i].prefixList
																		
																		}); 
																	}
																console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>");	
																if(!Ext.isArray(record.get('prefixListTelusSupplier'))){	
																Ext.getCmp("prefixListTelusSupplierGrid").getStore().add({
																			prefixList: record.get('prefixListTelusSupplier').prefixList
																		
																		});
																	}
																if(Ext.isArray(record.get('prefixListTelusSupplier'))){																		
																	for (var i=0; i< record.get('prefixListTelusSupplier').length; i++) {
																	console.log("prefixList "+ record.get('prefixListTelusSupplier')[i].prefixList);
																		Ext.getCmp("prefixListTelusSupplierGrid").getStore().add({
																			prefixList: record.get('prefixListTelusSupplier')[i].prefixList
																		
																		}); 
																	}
																	}
																	
															}
															else if(Ext.getCmp("ipv6Peer").getValue() ==true){ //this block will execute for ipv4 and ipv6
															console.log("4");
																//console.log("prefixList :: >> "+ record.get('prefixList')[0].prefixList);
																/*
																		Ext.getCmp("prefixListPanel").getStore().add({
																		for (var i=0; i< record.get('prefixList').length; i++) {
																			prefixList: record.get('prefixList')[i].prefixList
																			}
																			
																		}); 
																		*/
																	/*Ext.getCmp("prefixListPanel").getStore().removeAll();
																		
																		for (var i=0; i< record.get('prefixList').length; i++) {
																	console.log("prefixList "+ record.get('prefixList')[i].prefixList);
																		Ext.getCmp("prefixListPanel").getStore().add({
																			prefixList: record.get('prefixList')[i].prefixList
																		
																		}); 
																	}bhanu*/
																
																if(record.get('ipv6PrefixList').length == undefined){
																console.log("ipv6PrefixList unde:: >> "+ record.get('ipv6PrefixList').prefixList);
																	Ext.getCmp("ipv6PrefixListPanel").getStore().removeAll();
																		
																		
																	console.log("prefixList "+ record.get('ipv6PrefixList').prefixList);
																		Ext.getCmp("ipv6PrefixListPanel").getStore().add({
																			prefixList: record.get('ipv6PrefixList').prefixList,
																			ipv6PrefixList: record.get('ipv6PrefixList').ipv6PrefixList
																		
																		}); 
																	
																}
																
																if(record.get('ipv6PrefixList').length != undefined){
																console.log("ipv6PrefixList :: >> "+ record.get('ipv6PrefixList')[0].prefixList);
																	Ext.getCmp("ipv6PrefixListPanel").getStore().removeAll();
																		
																		for (var i=0; i< record.get('ipv6PrefixList').length; i++) {
																	console.log("prefixList "+ record.get('ipv6PrefixList')[i].prefixList);
																		Ext.getCmp("ipv6PrefixListPanel").getStore().add({
																			prefixList: record.get('ipv6PrefixList')[i].prefixList,
																			ipv6PrefixList: record.get('ipv6PrefixList')[i].ipv6PrefixList
																		
																		}); 
																	}
																}
																}
																}
																
															Ext.getCmp("prefixListPanel").getView().refresh();	
																	
															if(record.get('routingProtocol') == 'Static'){
															console.log("staticroutes length");
															console.log("staticroutes length: "+record.get('staticRoutes').length);
															if(record.get('staticRoutes').length == undefined ){ //this block will trigger for when pull the failed order for ipv4.
																	console.log("pref list : "+record.get('staticRoutes').prefixList);
																		Ext.getCmp("staticRoutingOption").getStore().add({
																			destinationPrefix: record.get('staticRoutes').destinationPrefix
																				
																				}); 
																	}
																	else if(record.get('staticRoutes').length != undefined){
																	console.log("test>> : "+record.get('staticRoutes'));
																	for (var i=0; i< record.get('staticRoutes').length; i++) {
																			console.log("staticRoutes "+ record.get('staticRoutes')[i].nextHop);
																				Ext.getCmp("staticRoutingOption").getStore().add({
																					destinationPrefix: record.get('staticRoutes')[i].destinationPrefix,
																					nextHop: record.get('staticRoutes')[i].nextHop
																				}); 
																			}
																	}
																	Ext.getCmp("nextHopVal").setValue(record.get('nextHopVal'));
																	Ext.getCmp("nextHopTelusSupplier").setValue(record.get('nextHopTelusSupplier'));
																	
																	//if(record.get('StaticRoutesNoExport').length == undefined ){ 
																	if(!Ext.isArray(record.get('StaticRoutesNoExport'))){
																	console.log("no export : "+record.get('StaticRoutesNoExport').destinationPrefix);
																		Ext.getCmp("staticTelusSupplierGrid").getStore().add({
																			destinationPrefix: record.get('StaticRoutesNoExport').destinationPrefix
																				
																				}); 
																	}
																	if(Ext.isArray(record.get('StaticRoutesNoExport'))){
																	//if(record.get('StaticRoutesNoExport').length > 0){ //this block will trigger for the new end point for ipv4 only
																	console.log("no export>> : "+record.get('StaticRoutesNoExport'));
																	for (var i=0; i< record.get('StaticRoutesNoExport').length; i++) {
																			console.log("StaticRoutesNoExport>>> "+ record.get('StaticRoutesNoExport')[i].destinationPrefix);
																				Ext.getCmp("staticTelusSupplierGrid").getStore().add({
																					destinationPrefix: record.get('StaticRoutesNoExport')[i].destinationPrefix
																				}); 
																			}
																	}
																	
																	
																	if(Ext.getCmp("ipv6Peer").getValue() ==true){
																		if(record.get('staticRoutesForIPv6').length == undefined ){ //this block will trigger for when pull the failed order for ipv4.
																		console.log("pref list : "+record.get('staticRoutesForIPv6').prefixList);
																			Ext.getCmp("staticRoutingOptionForIPv6").getStore().add({
																				destinationPrefix: record.get('staticRoutesForIPv6').destinationPrefix,
																				nextHop: record.get('staticRoutesForIPv6').nextHop
																					
																					}); 
																		}
																	else{
																		console.log("ipv6 >> : "+record.get('staticRoutesForIPv6'));
																		for (var i=0; i< record.get('staticRoutesForIPv6').length; i++) {
																				console.log("staticRoutes "+ record.get('staticRoutesForIPv6')[i].nextHop);
																					Ext.getCmp("staticRoutingOptionForIPv6").getStore().add({
																						destinationPrefix: record.get('staticRoutesForIPv6')[i].destinationPrefix,
																						nextHop: record.get('staticRoutesForIPv6')[i].nextHop
																					}); 
																				}
																			
																			}
																		}
																	
																	Ext.getCmp("staticRoutingOption").getView().refresh();	
																	Ext.getCmp("staticRoutingOptionForIPv6").getView().refresh();
																
																
															}
															me.setFieldDisabled('siteName',true);
															},
															 itemclick: function(dv, record, item, index, e) {
																console.log("selected row11 : "+index);
																var selectedRowIndex = Ext.getCmp('index');
																selectedRowIndex.setValue(index);
														
															}
															}
															
															
													,
													features: [{
                                                        ftype: 'grouping',
                                                        startCollapsed: false,
                                                        groupHeaderTpl: '{columnName}: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'
                                                    }],
													selModel: Ext.create('Ext.selection.CheckboxModel', {
													listeners: {
															deselect: function(model, record, index) {
																//id = record.get('id');
																//alert("deselect "+index);
															},
															select: function(model, record, index) {
																//id = record.get('id');
																//alert("select "+index);
															}
														}

                                                    })
													
                                                }
                                            ]
                                        }
										
                                    ]
                                }
                            ]
                        },
						{
                                            xtype: 'fieldcontainer',
                                            height: 25,
                                            maxHeight: 25,
                                            fieldLabel: '',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle',
                                                pack: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    id: 'clearInactiveEntriesFromListButton',
                                                    text: 'Clear Entries From List',
                                                    handler: function(button, event) {
                                                        me.handleClearInactiveEntriesFromList();
                                                    }
                                                }
                                            ]
                                        }],
                    dockedItems: [
                        {
                            xtype: 'fieldcontainer',
                            dock: 'bottom',
                            height: 45,
                            width: 960,
                            fieldLabel: '',
                            layout: {
                                type: 'hbox',
                                align: 'left',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    //margin: '0 40 0 0',
									margin: '0 40 0 270',
                                    maxHeight: 35,
                                    width: 80,
                                    text: '   Create      ',
									handler: function(button, event) {
										var data = this.getDataJSON();
										this.scriptUtils.saveForm(this,data);
	                                },
									scope: this
                                },
                                {
                                    xtype: 'button',
                                    margin: '0 40 0 0',
                                    maxHeight: 35,
                                    width: 80,
                                    text: 'Clear',
									hidden: true,
									 handler: function(button, event) {
	                                    	var data = this.clearAllFields();
	                                        
	                                 },
	                                    scope: this,
                                },
                                {
                                    xtype: 'button',
                                    maxHeight: 35,
                                    width: 80,
                                    text: 'Cancel',
									margin: '0 200 0 0',
									handler: function(button, event) {
        	                                    me.close();
                                    }
                                },
								{
                                    xtype: 'button',
                                    maxHeight: 35,
                                    width: 80,
                                    text: '   Developer      ',
									handler: function(button, event) {
										var data = this.getDataJSON();
										this.scriptUtils.verifyForm(this,data);
	                                },
									scope: this
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);

		
		
    },
	resizeWindow:function(){ 
	Ext.getCmp("biciCreateWindow").setPosition(200, 20, true);
	}
	,
	getCompByName:function(type, name) {
    	return Ext.ComponentQuery.query(type+'[name=' + name +']')[0];
    },
	handleEndpointType:function(checkbox,checked){  	   		 
	    	this.setFieldVisible('endpointPanel',true);
	    },
		
	setRequired:function(comp,required){
    	Ext.apply(this.scriptUtils.getFieldByName(comp), {allowBlank: !required}, {});
    },
    
    setFieldValue:function(comp,val){
        this.scriptUtils.getFieldByName(comp).setValue(val);
    },
    
    getFieldValue:function(comp){
        return this.scriptUtils.getFieldByName(comp).getValue();
    },
    
    setFieldVisible:function(comp,show){
        this.scriptUtils.getFieldByName(comp).setVisible(show);
    },
    
    setFieldDisabled:function(comp,flag){
        this.scriptUtils.getFieldByName(comp).setDisabled(flag);
    },
    
    setFieldReadOnly:function(comp,flag){
        this.scriptUtils.getFieldByName(comp).setReadOnly(flag);
    },

    // Handler to populate 'stagedInterfacesGrid'.
    getStagedInterfacesStore: function() {
        var stagedInterfacesStore = Ext.create('Ext.data.Store',{
            storeId: 'stagedInterfacesStore',
            fields: [
                {name: 'pedeviceId'},
				{name: 'site'},
                {name: 'Interface'},
                {name: 'endPointServiceType'},
                {name: 'ciuName'},
				{name: 'ciuAlias'},
				{name: 'accessType'},
				{name: 'portSpeed'},
				{name: 'connectionType'},
				{name: 'csId'},
				{name: 'pathPreferences'},
                {name: 'vlanId'},
                {name: 'ipAddress'},
				{name: 'subnetMask'},
				{name: 'ipMTU'},
				{name: 'ipv6Peer'},
				{name: 'ipv6Address'},
				
				//{name: 'rd'},
				{name: 'neighbourAddress'},
				{name: 'localPref'},
				{name: 'med'},
				{name: 'peerAS'},
				{name: 'enforceRoute'},
				{name: 'maxRoute'},
				{name: 'multipath'},
				{name: 'routingProtocol'},
				{name: 'addressPool'},
				{name: 'ingressRate'},
				{name: 'egressRate'},
				{name: 'endPointType'},
				{name: 'staticRoutes'},
				{name: 'nextHopVal'},
				{name: 'StaticRoutesNoExport'},
				{name: 'nextHopTelusSupplier'},
				
				{name: 'staticRoutesForIPv6'},
				{name: 'prefixList'},
				{name: 'prefixListTelusSupplier'},
				{name: 'ipv6PrefixList'},
				{name: 'staticExport'},
				{name: 'staticNoExport'},
				{name: 'bgpExport'},
				{name: 'bgpNoExport'},
				{name: 'autonegotiate'},
				{name: 'adminState'},
				{name: 'operationalMode'},
				{name: 'multiVRF'},
				{name: 'firstUnitForVRF'},
				{name: 'traficControlProfile'},
				{name: 'dataForDisplay'}
				
            ], groupField: 'site', 
            data: [
              		
            ]
        });
    
        return stagedInterfacesStore;
    },
	
	getStaticGridStore: function() {
        var staticGridStore = Ext.create('Ext.data.Store',{
            storeId: 'staticGridStore',
            fields: [
                {name: 'destinationPrefix'}              
            ],
            data: [
              
            ]
        });
        
        return staticGridStore;
    },
	getStaticTelusSupplierGrid: function() {
        var staticGridStore = Ext.create('Ext.data.Store',{
            storeId: 'staticTelusSupplierGrid',
            fields: [
                {name: 'destinationPrefix'}           
            ],
            data: [
              
            ]
        });
        
        return staticGridStore;
    },
	getStaticGridStoreIPv6: function() {
        var staticGridStore = Ext.create('Ext.data.Store',{
            storeId: 'staticGridStoreIPv6',
            fields: [
                {name: 'destinationPrefix'},
                {name: 'nextHop'}               
            ],
            data: [
              
            ]
        });
        
        return staticGridStore;
    },
	getPrefixListStore: function() {
        var staticGridStore = Ext.create('Ext.data.Store',{
            storeId: 'prefixListGridStore',
            fields: [
                {name: 'prefixList'}           
            ],
            data: [
              
            ]
        });
        
        return staticGridStore;
    },
	getIPv6PrefixListStore: function() {
        var staticGridStore = Ext.create('Ext.data.Store',{
            storeId: 'ipv6PrefixListGridStore',
            fields: [
                {name: 'prefixList'} ,
				{name: 'ipv6PrefixList'} 				
            ],
            data: [
              
            ]
        });
        
        return staticGridStore;
    },

	 siteGridStore:function() {
    	var siteGridStore = Ext.create('Ext.data.Store', {
			autoLoad:true,
			fields: [
                {
                    mapping: 'PeDeviceBean.name',
                    name: 'name'
                },
                {
                    mapping: 'PeDeviceBean.deviceId',
                    name: 'moid'
                },
                {
                    mapping: 'PeDeviceBean.type',
                    name: 'vendorType'
                }
            ],
			proxy:{
				url:'/serviceui/resteasy/devices/'+Jx.ProvConstants.JUNIPER,
				type:'ajax',
				reader:{
					type:'json',
					root:'PeDeviceBean',
					totalProperty:'peDeviceBeanListCount'
				}
			},
			pageSize:5
		 });
		 
    	return siteGridStore;    	
    },
		handleSiteSelection:function(grid,record,index,event) {
		
		this.site ='';
		this.port = ''
		this.encapsulation = '';
		this.moid = '';
		this.site = record.get('site1');
		this.port = record.get('port');
		this.encapsulation = record.get('encapsulation');
		
		this.moid = record.get('deviceId');

		var createSiteInterfaceGrid = Ext.getCmp("siteInterfaceGrid").getStore();
		var interfaceGridStore = createSiteInterfaceGrid.getStore();
		console.log("interfaceGridStore': " + interfaceGridStore);
		interfaceGridStore.removeAll();
	    interfaceGridStore.getProxy().url = '../serviceui/resteasy/cpp-devices/1671172/Juniper/interfaces?page=1&start=0&limit=55';
		interfaceGridStore.loadPage(1);		
	},
	getSelectedSite:function(record) {
		this.site ='';
		this.port = ''
		this.encapsulation = '';
		this.moid = '';
		this.site = record.get('deviceName');
		this.port = record.get('portName');
		this.encapsulation = record.get('encapsulation');
		this.moid = record.get('deviceId');
		console.log("deviceId "+record.get('deviceId'));
	},
	loadSiteInterfaceGrid:function(record) {
		console.log("moid*** "+record);
		var interfaceList='';
		Ext.Ajax.request({
			method:'GET',
			url:'../serviceui/resteasy/cpp-devices/'+record+'/Juniper/interfaces?page=1&start=0&limit=100',
			//params:{"vendorType":record.get('vendorType')},
			success:function(r) {				
				var result = Ext.decode(r.responseText);
				if (result.success && result.success == 'false') { //exception at the backend
					 Ext.Msg.alert(result.title,result.message);
				} else {
					var records = [];
					for (var i=0; i<result.peDeviceInterfaceBeanList.length; i++) {
						records.push(result.peDeviceInterfaceBeanList[i]);
					}
					var storeData={'totalCount':records.length,'interfaceList':records};
					var siteInterfaceGrid = Ext.ComponentQuery.query('gridpanel[name=siteInterfaceGrid]')[0];
					var store = siteInterfaceGrid.getStore();
					store.getProxy().data = records;
					
					store.loadData(records);
					store.reload();
					
					interfaceList = records;
					
					return interfaceList;
					
				}
			}
		});
	},
	searchCustomer:function(id) {
		console.log("id&&*** "+id);
		var interfaceList='';
		Ext.Ajax.request({
			method:'GET',
			url:'../serviceui/resteasy/cpp-customer/Alcatel/id/'+id,
			
			//params:{"vendorType":record.get('vendorType')},
			success:function(r) {				
				var result = Ext.decode(r.responseText);
				
				//console.log("result  :"+result["CPPCustomerBean"]["customerId"]);
				
				if(result.CPPCustomerBean != undefined){
					Ext.getCmp("customerName").setValue(result["CPPCustomerBean"]["name"]);
					Ext.getCmp("email").setValue(result["CPPCustomerBean"]["email"]);
					Ext.getCmp("customerDescription").setValue(result["CPPCustomerBean"]["description"]);
					//Ext.getCmp("customerName").setDisabled(true);
					//Ext.getCmp("email").setDisabled(true);
					//Ext.getCmp("customerDescription").setDisabled(true);
					
				}else{
					Ext.getCmp("customerName").setValue('');
					Ext.getCmp("email").setValue('');
					Ext.getCmp("customerDescription").setValue('');
					//Ext.getCmp("customerName").setDisabled(true);
					//Ext.getCmp("email").setDisabled(true);
					//Ext.getCmp("customerDescription").setDisabled(true);
				}
				
			}
		});
	},
	siteInterfaceGridStore:function() {
		//console.log("siteInterfaceGridStore :");
		var siteInterfaceGridStore = Ext.create('Ext.data.Store', {
			fields:[{
				name:'deviceId',
				mapping:'deviceId'
			},{
				name:'deviceName',
				mapping:'deviceName'
			},{
				name:'portName',
				mapping:'portName'			
			},{
				name:'encapsulation',
				mapping:'encapsulation'			
			},{
				name:'speed',
				mapping:'speed'			
			},{
				name:'status',
				mapping:'status'
			},
			{
				name:'mtu',
				mapping:'mtu'
			},{
				name:'vendorType',
				mapping:'vendorType'			
			}],
			/*proxy:{
				url:'../serviceui/resteasy/cpp-devices/1671172/Juniper/interfaces?page=1&start=0&limit=55',
				type:'ajax',
				reader:{
					type:'json',
					root:'peDeviceInterfaceBeanList',
					totalProperty:'peDeviceInterfaceBeanListCount'
				},
				callback : function(options, success, response){ 
					console.log(response.responseText);
					}
					,
				success : function (data)
                {
                    console.log("data: "+data);

                }
			},
		
			pageSize:2*/
			 data: [
               
            ]
		 });
		 
    	return siteInterfaceGridStore;    	
    },
    clearAllFields: function() {
		//Ext.ComponentQuery.query('#endpointPanel')[0].hide();
		
		Ext.getCmp("updateBtn").hide();
		Ext.ComponentQuery.query('gridpanel[name=siteInterfaceGrid]')[0].store.removeAll();
		Ext.getCmp("stagedInterfacesGrid").store.removeAll();
		

        var form = this.getComponent(0);
        form.getForm().reset();
		Ext.getCmp("endpointPanel").hide();
		//this.scriptUtils.getFieldByName("endPointType").setDisabled(true);
    },
	populateData:function(data){
	 this.scriptUtils.setFieldValues(this,this.commonData);
	 var attribs = Ext.JSON.decode(data.attribs);
			  
	 console.log("accounting : "+attribs[0].accounting);
	
 var formObj = {};
   	if(data.attribs != undefined){
		generalAttr = Ext.decode(data.attribs);
		Ext.iterate(generalAttr, function(item,index,arrObj){
			Ext.iterate(item, function(key,val,obj){
			console.log(key);
			if(key == 'serviceOrderId'){
					formObj.serviceId = val;
					Ext.getCmp('serviceId').setDisabled(true);
				}
				if(key == 'serviceName'){
					formObj.serviceName = val;
					Ext.getCmp('serviceName').setDisabled(true);
				}
				
				if(key == 'operationalMode'){
					formObj.operationalMode = val;
					Ext.getCmp('operationalMode').setDisabled(true);
				}
				
				if(key == 'accounting'){
					formObj.accounting = val;
					Ext.getCmp('accounting').setDisabled(true);
				}
				if(key == 'qosType'){
					formObj.qosType = val;
				}
				
				if(key == 'customer'){
				
				    var attribs = Ext.JSON.decode(data.attribs);
				    
					formObj.customerName = attribs[0].customer.e.name;
					formObj.customerId = attribs[0].customer.e.id;
					Ext.getCmp('customerId').setDisabled(true);
					formObj.email = attribs[0].customer.e.email;
					formObj.customerDescription = attribs[0].customer.e.description;
				}
				Ext.getCmp('endPointServiceType').setDisabled(true);
				
			});
		});		
	}
	this.scriptUtils.setFieldValues(this,formObj);

	var storeData = [];
	console.log("unis.seId   "+data.unis.seId);
	
	if(data.unis.length > 0){
	
			for(var i = 0; i < data.unis.length; i++){
				var commonEndPointsData = Ext.decode(data.unis[i].endPointsData);
				commonEndPointsData.seId = data.unis[i].seId;
				storeData.push(commonEndPointsData);
			}			
		}else{
			if(data.unis != undefined){
				var commonEndPointsData = Ext.decode(data.unis.endPointsData);
				commonEndPointsData.seId = data.unis.seId;
				console.log("interface: "+commonEndPointsData.Interface);
				console.log("device id: "+commonEndPointsData.pedeviceId);
				
				try{
				if(commonEndPointsData.staticRoutes.staticRoutes.e != undefined){
					commonEndPointsData.staticRoutes.destinationPrefix=commonEndPointsData.staticRoutes.staticRoutes.e.destinationPrefix;
				}
				if(commonEndPointsData.staticRoutes.staticRoutes.e == undefined){
					commonEndPointsData.staticRoutes=commonEndPointsData.staticRoutes.staticRoutes;
				}
				
				console.log("staticRoutesTelusNoExport > "+commonEndPointsData.StaticRoutesNoExport.staticRoutesTelusNoExport);
				if(commonEndPointsData.StaticRoutesNoExport.staticRoutesTelusNoExport.e != undefined){
					commonEndPointsData.StaticRoutesNoExport=commonEndPointsData.StaticRoutesNoExport.staticRoutesTelusNoExport.e;	
					}
				if(commonEndPointsData.StaticRoutesNoExport.staticRoutesTelusNoExport.e == undefined){
					commonEndPointsData.StaticRoutesNoExport=commonEndPointsData.StaticRoutesNoExport.staticRoutesTelusNoExport;	
					}	
					
					
				if(commonEndPointsData.prefixList.prefixList.e != undefined){
					commonEndPointsData.prefixList.prefixList=commonEndPointsData.prefixList.prefixList.e.prefixList;
				}
				if(commonEndPointsData.prefixList.prefixList.e == undefined){
					commonEndPointsData.prefixList.prefixList=commonEndPointsData.prefixList.prefixList;
				}
				if(commonEndPointsData.prefixListTelusSupplier.prefixListTelusSupplier.e != undefined){
					commonEndPointsData.prefixListTelusSupplier=commonEndPointsData.prefixListTelusSupplier.prefixListTelusSupplier.e;
				}
				if(commonEndPointsData.prefixListTelusSupplier.prefixListTelusSupplier.e == undefined){
					commonEndPointsData.prefixListTelusSupplier=commonEndPointsData.prefixListTelusSupplier.prefixListTelusSupplier;
				}
				
			}catch(e){
					
			console.log("error>>>>>>>>>>>>>>>> : "+e);
			}
				
				storeData.push(commonEndPointsData);
			}
		}
		
		var grid = Ext.ComponentQuery.query('container[name=stagedInterfacesGrid]')[0];
		var gridStore = grid.getStore();
		gridStore.removeAll();
		gridStore.loadData(storeData);		
		
		Ext.getCmp('siteName').setDisabled(false);
   },
	getDataJSON:function(){
	console.log("form getDataJSON data': ");
	   // Get all the user-filled form data values.
        var cdata = this.scriptUtils.getFormValues(this);
		        
        // Perform some sanity validations.
    	if(this.validateForm()){
    		return;
    	};
    	
    	// Add common attributes.
		var common = this.commonData;

		var customerArray = [];
		console.log("cdata.customerName  "+cdata.customerName);
		console.log("cdata.customerId  "+cdata.customerId);
		console.log("cdata.email  "+cdata.email);
		console.log("cdata.customerDescription  "+cdata.customerDescription);
       
		/*customerArray.push({
			 "name": cdata.customerName,
            "id": cdata.customerId,
            "email": cdata.email,
            "description": cdata.customerDescription
		});*/
		
		customerArray.push({
			 "name": Ext.getCmp("customerName").getValue(),
            "id": Ext.getCmp("customerId").getValue(),
            "email": Ext.getCmp("email").getValue(),
            "description": Ext.getCmp("customerDescription").getValue()
		});
		
		console.log("customer service order name: " + cdata.name);
		common.name=Ext.getCmp("serviceId").getValue();//cdata.serviceId;//cdata.name;
		//common.externalId = cdata.serviceId;
		common.externalId = Ext.getCmp("customerId").getValue();
		
		common.serviceTag = "TELUS_BICI";
        
        // Add service common attributes ...
		var commonAttributesArray = [];
		
		var stagedInterfacesStore = Ext.getCmp("stagedInterfacesGrid").getStore();
		var stagedInterfacesStore_RowCount = stagedInterfacesStore.count();
		console.log("stagedInterfacesStore_RowCount : " + stagedInterfacesStore_RowCount);
		if(stagedInterfacesStore_RowCount==0){
			 Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please add at least one interface to the Staged Area");
			 return;
		}
		
	//cdata.serviceOrderName		
		try{
		if(advancedResult == undefined){
		var row = stagedInterfacesStore.getAt(0);
		var port = row.data.Interface;
		var pedeviceId = row.data.pedeviceId;
			console.log("pedeviceId > "+pedeviceId);
			console.log("port > "+port);
			this.getMultiVRFDetails(port,pedeviceId);
			}
		
		commonAttributesArray.push({
			 "serviceOrderId": Ext.getCmp("serviceId").getValue(),
            "serviceName": Ext.getCmp("serviceName").getValue(),
           "operationalMode": Ext.getCmp("operationalMode").getValue(),
			//"serviceType" : Ext.getCmp("serviceType").getValue(),
			"accounting" : Ext.getCmp("accounting").getValue(),
			"architecture" :"JCE",
			"qosType" : Ext.getCmp("qosType").getValue(),
			"schedulerMapForMultiVRF" : Ext.getCmp("schedulerMapForMultiVRF").getValue(),
			"isAF1Selected" : advancedResult["isAF1Selected"],
			"isAF2Selected" : advancedResult["isAF2Selected"],
			"isAF3Selected" : advancedResult["isAF3Selected"],
			"isAllAFSelected" : advancedResult["isAllAFSelected"],
			"af1" : advancedResult["af1"],
			"af2" : advancedResult["af2"],
			"af3" : advancedResult["af3"],
			"customer": customerArray
		});
		}catch(e){
			console.log("error on common attribute* " +e);
		}
		
		common[Jx.ProvConstants.SERVICE_COMMON_ATTRIBUTES] = Ext.encode(commonAttributesArray);

		formDataArray = [];
				
				
	    var siteName = this.scriptUtils.getFieldByName('siteName');
				console.log( "moid "+siteName.getValue());
				console.log( "getRawValue "+siteName.getRawValue());
				 
		
		console.log("Value of 'stagedInterfacesStore_RowCount': " + stagedInterfacesStore_RowCount);
		for(var i=0; i < stagedInterfacesStore_RowCount; i++) {
    		var row = stagedInterfacesStore.getAt(i);
			var deviceName = row.data.site;
		console.log("pedeviceId : " + row.data.pedeviceId);
		//console.log("pedeviceId : " + row.data.site2);
		//var egressRate = row.data.egressRate;
		/*if(egressRate.contains("k") || egressRate.contains("K") || egressRate.contains("m") || egressRate.contains("M")){
			egressRate = row.data.egressRate;
		}else{
			egressRate = egressRate+"k";
		}*/
		
		var portSpeed = row.data.portSpeed;
			if(portSpeed != null){
				portSpeed = portSpeed.toLowerCase();
			}
		var ingressRate = row.data.ingressRate;
			if(ingressRate != null){
				ingressRate = ingressRate.toLowerCase();
			}
		var egressRate = row.data.egressRate;
			if(egressRate != null){
				egressRate = egressRate.toLowerCase();
			}		
			
			row.data.ingressRate
			
		var ip4NetworkAddress = this.getNetworkAddress(row.data.ipAddress, row.data.subnetMask);
		var dataForDisplay = row.data.dataForDisplay+"|"+row.data.csId + "."+row.data.ciuName + "."+ row.data.egressRate;
		
		
		var multiVRF = {
			"ossCustomerId": Ext.getCmp("customerId").getValue(),
			"qosType": Ext.getCmp("qosType").getValue(),
			"egressRate": row.data.egressRate,
			"ciuName": row.data.ciuName,
			"ciuAlias": row.data.ciuAlias,
			"vlanId": row.data.vlanId	
		}
		
		var static_Routes =  {
			"staticRoutes": row.data.staticRoutes
		}
		var static_Routes_no_export =  {
			"staticRoutesTelusNoExport": row.data.StaticRoutesNoExport
		}
		var static_Routes_ipv6 =  {
			"staticRoutesForIPv6": row.data.staticRoutesForIPv6
		}
		
		var prefix_list =  {
			"prefixList": row.data.prefixList
		}
		
		var prefix_list_no_export =  {
			"prefixListTelusSupplier": row.data.prefixListTelusSupplier
		}
		
		var prefix_list_ipv6 =  {
			"ipv6PrefixList": row.data.ipv6PrefixList
		}
		
		var staticCustExport = row.data.staticRoutes.length;
		var staticTelusNoExport = row.data.StaticRoutesNoExport.length;
		var bgpPrefixListCustExport = row.data.prefixList.length;
		var bgpPrefixListTelusNoExport = row.data.prefixListTelusSupplier.length;
			try{
			formDataArray.push({
				"Interface": row.data.Interface,
				"pedeviceId": row.data.pedeviceId,
				"site": row.data.site,
				"deviceName": deviceName,//.split("-")[0]+"-"+deviceName.split("-")[1]+"-"+deviceName.split("-")[2],
				//"ethernateOption": row.data.ethernateOption,
				"vlanId": row.data.vlanId,
				"endPointServiceType": row.data.endPointServiceType,
				"ciuName": row.data.ciuName,
				"ciuAlias": row.data.ciuAlias.trim(),
				"csId": row.data.csId,
				"pathPreferences": row.data.pathPreferences,
				"accessType": row.data.accessType,
				"portSpeed": portSpeed,
				"connectionType": row.data.connectionType,
				"serviceType" : cdata.serviceType,
				"ipAddress": row.data.ipAddress,
				"subnetMask": row.data.subnetMask,
				"ip4NetworkAddress": ip4NetworkAddress,
				"ipMTU": row.data.ipMTU,
				"ipv6Peer": row.data.ipv6Peer,
				"ipv6Address": row.data.ipv6Address,
				//"rd": row.data.rd,
				"neighbourAddress": row.data.neighbourAddress,
				"routingProtocol": row.data.routingProtocol,
				"addressPool": row.data.addressPool,
				"ingressRate": ingressRate,
				"egressRate": egressRate,
				"localPref": row.data.localPref,
				"med": row.data.med,
				"peerAS": row.data.peerAS,
				"seId": 0,
				"outerEncap":row.data.vlanId,
				"innerEncap":1,
				"operation": 'ADD',
				"recordOPType": 'ADD',
				"vendorType": Jx.ProvConstants.JUNIPER,
				"nextHopVal": row.data.nextHopVal,
				"nextHopTelusSupplier": row.data.nextHopTelusSupplier,
				"staticRoutes": static_Routes,
				"StaticRoutesNoExport": static_Routes_no_export,
				"staticRoutesForIPv6": static_Routes_ipv6,
				"prefixList": prefix_list,
				"prefixListTelusSupplier": prefix_list_no_export,
				"staticCustExport": staticCustExport,
				"staticTelusNoExport": staticTelusNoExport,
				"bgpPrefixListCustExport": bgpPrefixListCustExport,
				"bgpPrefixListTelusNoExport": bgpPrefixListTelusNoExport,
				"staticExport": !row.data.staticExport,
				"staticNoExport": !row.data.staticNoExport,
				"bgpExport": !row.data.bgpExport,
				"bgpNoExport": !row.data.bgpNoExport,
				"autonegotiate": row.data.autonegotiate,
				"adminState": row.data.adminState,
				"operationalMode": row.data.operationalMode,
				"multiVRF": row.data.multiVRF,
				"firstUnitForVRF": row.data.firstUnitForVRF,
				"traficControlProfile" : row.data.traficControlProfile,
				"advanced": multiVRF,
				"dataForDisplay" : dataForDisplay
			});
			}catch(e){
			console.log("json data error : "+e);
			}
		}
				
		common[Jx.ProvConstants.SERVICE_ENDPOINT_ATTRIBUTES] = Ext.encode(formDataArray);
		console.log("form data': " + common);
		
		return common;
    },
	validateForm:function() {
	var serviceId = Ext.getCmp("serviceId").getValue();
	var serviceName = Ext.getCmp("serviceName").getValue();
	
	if(serviceId == null || serviceId==''){
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the service ID");
		return true;
	}if(serviceName == null || serviceName==''){
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the service Name");
		return true;
	}
        return false;
    },    

	getOperatioanlMode:function() {
        var operatioanlMode = Ext.create('Ext.data.Store',{
            storeId: 'operatioanlMode',
            fields: [
                {name: 'valueText'},
                {name: 'displayText'}
            ], 
            data: [
                {valueText: '', displayText: 'Select ...'},
                {valueText: 'PEN', displayText: 'Pending'},
                {valueText: 'TST', displayText: 'Test'},
				{valueText: 'OPR', displayText: 'Operational'}
            ]
        });

        return operatioanlMode;
    },
	getPortSpeed:function() {
        var portSpeed = Ext.create('Ext.data.Store',{
            storeId: 'portSpeed',
            fields: [
                {name: 'valueText'},
                {name: 'displayText'}
            ], 
            data: [
                {valueText: '1G', displayText: '1G'},
                {valueText: '100M', displayText: '100M'},
				{valueText: '10M', displayText: '10M'}
            ]
        });

        return portSpeed;
    },
	getPortSpeedForXEPort:function() {
        var portSpeed = Ext.create('Ext.data.Store',{
            storeId: 'portSpeed',
            fields: [
                {name: 'valueText'},
                {name: 'displayText'}
            ], 
            data: [
                
                {valueText: '10G', displayText: '10G'}
            ]
        });

        return portSpeed;
    },
	getEndPointType:function() {
        var endPointTypeStore = Ext.create('Ext.data.Store',{
            storeId: 'endPointTypeStore',
            fields: [
                {name: 'valueText'},
                {name: 'displayText'}
            ], 
            data: [
                {valueText: '', displayText: 'Select ...'},
				{valueText: 'Full Mesh', displayText: 'Full Mesh'},
                {valueText: 'Hub', displayText: 'Hub'},
                {valueText: 'Spoke', displayText: 'Spoke'}
            ]
        });

        return endPointTypeStore;
    },

	getConnectionType:function() {
        var connectionTypeStore = Ext.create('Ext.data.Store',{
            storeId: 'serviceTypeStore',
            fields: [
                {name: 'valueText'},
                {name: 'displayText'}
            ], 
            data: [
                //{valueText: '', displayText: 'Select ...'},
                /*{valueText: 'REDI', displayText: 'RE Direct'},
				 {valueText: 'REDU', displayText: 'RE Dual'}*/
				 {valueText: 'RE Direct', displayText: 'RE Direct'}
				 //{valueText: 'RE Dual', displayText: 'RE Dual'}
            ]
        });

        return connectionTypeStore;
    },

	getRoutingProtocol:function() {
        var routingProtocolStore = Ext.create('Ext.data.Store',{
            storeId: 'routingProtocolStore',
            fields: [
                {name: 'valueText'},
                {name: 'displayText'}
            ], 
            data: [
                {valueText: '', displayText: 'Select ...'},
                {valueText: 'Static', displayText: 'Static'},
				{valueText: 'Default', displayText: 'BGP-Default Route'},
				{valueText: 'Full', displayText: 'BGP-Full Internet'}
            ]
        });
        return routingProtocolStore;
    },

	getAccessRate:function() {
	    var accessRateStore = Ext.create('Ext.data.Store',{
            storeId: 'accessRateStore',
            fields: [
                {name: 'valueText'},
                {name: 'displayText'}
            ], 
            data: [
                {valueText: '', displayText: 'Select ...'},
               
				{valueText: '512K', displayText: '512K'},
				{valueText: '1M', displayText: '1M'},
				{valueText: '1200K', displayText: '1200K'},
				{valueText: '2M', displayText: '2M'},
				{valueText: '3M', displayText: '3M'},
				{valueText: '5M', displayText: '5M'},
				{valueText: '8M', displayText: '8M'},
				{valueText: '9M', displayText: '9M'},
				{valueText: '10M', displayText: '10M'},
				{valueText: '20M', displayText: '20M'},
				{valueText: '30M', displayText: '30M'},
				{valueText: '40M', displayText: '40M'},
				{valueText: '50M', displayText: '50M'},
				{valueText: '60M', displayText: '60M'},
				{valueText: '70M', displayText: '70M'},
				{valueText: '80M', displayText: '80M'},
				{valueText: '90M', displayText: '90M'},
				{valueText: '99M', displayText: '99M'},
				{valueText: '100M', displayText: '100M'},
				{valueText: '200M', displayText: '200M'},
				{valueText: '300M', displayText: '300M'},
				{valueText: '400M', displayText: '400M'},
				{valueText: '500M', displayText: '500M'},
				{valueText: '600M', displayText: '600M'},
				{valueText: '700M', displayText: '700M'},
				{valueText: '800M', displayText: '800M'},
				{valueText: '900M', displayText: '900M'},
				{valueText: '999M', displayText: '999M'},
				{valueText: '1000M', displayText: '1000M'}
			]
        });

        return accessRateStore;
    },
	getEFRate:function() {
        var EFRateStore = Ext.create('Ext.data.Store',{
            storeId: 'EFRateStore',
            fields: [
                {name: 'valueText'},
                {name: 'displayText'}
            ], 
            data: [
                {valueText: '', displayText: 'Select ...'},
               
			   {valueText: '256K', displayText: '256K-Non DSL'},
				{valueText: '384K', displayText: '384K-Non DSL'},
				{valueText: '1M', displayText: '1M-Non DSL'},
				{valueText: '1500K', displayText: '1500K--Non DSL'},
				{valueText: '2M', displayText: '2M-Non DSL'},
				{valueText: '3M', displayText: '3M-Non DSL'},
				{valueText: '4M', displayText: '4M-Non DSL'},
				{valueText: '5M', displayText: '5M-Non DSL'},
				{valueText: '6M', displayText: '6M-Non DSL'},
				{valueText: '7M', displayText: '7M-Non DSL'},
				
				{valueText: '8M', displayText: '8M-Non DSL'},
				{valueText: '9M', displayText: '9M-Non DSL'},
				{valueText: '10M', displayText: '10M-Non DSL'},
				{valueText: '15M', displayText: '15M-Non DSL'},
				{valueText: '20M', displayText: '20M-Non DSL'},
				{valueText: '25M', displayText: '25M-Non DSL'},
				{valueText: '30M', displayText: '30M-Non DSL'},
				{valueText: '40M', displayText: '40M-Non DSL'},
				{valueText: '50M', displayText: '50M-Non DSL'},
				{valueText: '60M', displayText: '60M-Non DSL'},
				{valueText: '70M', displayText: '70M-Non DSL'},
				{valueText: '80M', displayText: '80M-Non DSL'},
				{valueText: '90M', displayText: '90M-Non DSL'},
				{valueText: '100M', displayText: '100M-Non DSL'},
				{valueText: '150M', displayText: '150M-Non DSL'},
				{valueText: '180M', displayText: '180M-Non DSL'},
				{valueText: '200M', displayText: '200M-Non DSL'},
				{valueText: '250M', displayText: '250M-Non DSL'},
				{valueText: '300M', displayText: '300M-Non DSL'}
			]
        });

        return EFRateStore;
    },

	validateEndpointDetails:function() {
	var isValid = false;
	var vlan = Ext.getCmp("vlanId").getValue();
	
	var endPointServiceType = this.scriptUtils.getFieldByName("endPointServiceType").getValue();
	console.log(" endPointServiceType: "+endPointServiceType);
	
	var neighbourAddress = this.scriptUtils.getFieldByName("neighbourAddress").getValue();
	
	var ciuName = this.scriptUtils.getFieldByName("ciuName").getValue();
	console.log("ciuName : "+ciuName);

	var ciuAlias = this.scriptUtils.getFieldByName("ciuAlias").getValue();
	console.log("ciuAlias : "+ciuAlias);

	var accessType = this.scriptUtils.getFieldByName("accessType").getValue();
	console.log("accessType : "+accessType);
	var portSpeed = Ext.getCmp("portSpeed").getValue();
	var connectionType = this.scriptUtils.getFieldByName("connectionType").getValue();
	console.log(" connectionType: "+connectionType);

	var csId = this.scriptUtils.getFieldByName("csId").getValue();
	console.log(" csId: "+csId);

	var pathPreferences = this.scriptUtils.getFieldByName("pathPreferences").getValue();
	console.log(" pathPreferences: "+pathPreferences);


	var vlanId = this.scriptUtils.getFieldByName("vlanId").getValue();
	console.log("vlanId : "+vlanId);
	var ipAddress = this.scriptUtils.getFieldByName("ipAddress").getValue();
	console.log(" ipAddress: "+ipAddress);
	var subnetMask = this.scriptUtils.getFieldByName("subnetMask").getValue();
	console.log("subnetMask : "+subnetMask);

	
	var ipMTU = this.scriptUtils.getFieldByName("ipMTU").getValue();
	console.log(" ipMTU: "+ipMTU);
	var ipv6Peer =  Ext.getCmp('ipv6Peer').getValue();
	console.log("ipv6Peer : "+ipv6Peer);
	var ipv6Address = this.scriptUtils.getFieldByName("ipv6Address").getValue();
	console.log("ipv6Address : "+ipv6Address);
	
	var localPref = this.scriptUtils.getFieldByName("localPref").getValue();
	console.log(" localPref: "+localPref);
	var med = this.scriptUtils.getFieldByName("med").getValue();
	console.log(" med: "+med);
	var peerAS = this.scriptUtils.getFieldByName("peerAS").getValue();
	console.log(" peerAS: "+peerAS);

	var routingProtocol = this.scriptUtils.getFieldByName("routingProtocol").getValue();
	var addressPool = this.scriptUtils.getFieldByName("addressPool").getValue();
	var ingressRate = this.scriptUtils.getFieldByName("ingressRate").getValue();
	var egressRate = this.scriptUtils.getFieldByName("egressRate").getValue();
	console.log(">>*********************************");
	console.log("endPointServiceType: "+endPointServiceType);
		
		if(ipAddress == 0)
			ipAddress = ipAddress +"";
		
		if(neighbourAddress == 0)
			neighbourAddress = neighbourAddress +"";
		
		console.log("222222222222222222222222222");
	 
	 
	 if(routingProtocol == null || routingProtocol == '' ){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please select the Routing Protocol");
		//return;
	}else if(csId == null || csId == '' ){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please enter the valid CSID");
		//return;
	}
	else if(endPointServiceType == null || endPointServiceType == '' ){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please select a valid service Type");
		//return;
	}
	else if(connectionType != null && connectionType == 'RE Dual' && (vlan == null || vlan == "")){
			isValid = true;
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the valid vlan");
			return isValid;
		}
	else if(connectionType == null || connectionType == '' ){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please select a valid connection type");
		//return;
	}
	else if(pathPreferences == null || pathPreferences == '' ){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please select a Path Preference");
		//return;
	}
	else if(ipAddress == null || ipAddress == '' ){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please enter a valid IP Address");
		//return;
	}
	else if(subnetMask == null || subnetMask == '' ){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please enter a valid Subnet Mask");
		//return;
	}
	else if(addressPool == null || addressPool == '' ){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please select the Prefix Supplier");
		//return;
	}
	//else if(connectionType != null && connectionType == 'RE Dual' && (vlan == null || vlan == "")){
	else if(vlan == null || vlan == ""){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the valid vlan");
		//return;
	}
	else if(routingProtocol !='Static' && (peerAS == null || peerAS =="" )){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the PEER AS");
		//return isValid;
	}
	else if(routingProtocol !='Static' && ( neighbourAddress == null || neighbourAddress == "" )){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the Neighbour Address");
		//return isValid;
	}
	else if(routingProtocol !='Static' && ( med == null || med == "" )){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the MED");
		//return isValid;
	}
	else if(routingProtocol !='Static' && (localPref == null || localPref == '')){
			isValid = true;
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the valid Local Pref");
			return isValid;
		}
	else if(ipv6Peer ==false && routingProtocol !='Static' && (Ext.getCmp("prefixListPanel").getStore().count() ==0)){
			isValid = true;
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the prefix list");
			return isValid;
		}
	else if(ipv6Peer ==true && routingProtocol !='Static' && (Ext.getCmp("ipv6PrefixListPanel").getStore().count() ==0)){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the prefix list");
		return isValid;
	}	
	else if(routingProtocol =='Static' && Ext.getCmp("staticRoutingOption").getStore().count() ==0){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the Prefix/hops in order to add to the staging area");
		//return isValid;
	}
	else if(routingProtocol =='Static' && ipv6Peer == true && Ext.getCmp("staticRoutingOptionForIPv6").getStore().count() == 0){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the Prefix/hops ipv6 in order to add to the staging area");
		//return isValid;
	}else if(egressRate == null || egressRate == '' ){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please enter a valid Egress Rate");
		//return;
	}else if(ciuName == null || ciuName == '' ){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please enter a valid CIU Name");
		//return;
	}else if((ciuAlias != null && (ciuAlias.charAt(0) == '-' || ciuAlias.charAt(0) == '_' ))){
			isValid = true;
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the valid CIU Alias");
			return isValid;
		}
	
	return isValid;
	},
handleAddStagedInterface:function() {
var isDataValid = this.validateEndpointDetails();
	console.log("isDataValid > > > > : > "+isDataValid);
	if(isDataValid)
		return;
	
console.log("isDataValid > > > >**** : > "+isDataValid);

var selection = Ext.getCmp("siteInterfaceGrid").getSelectionModel().hasSelection();

if(!selection){
	Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please select one of the site interface in the grid in order process");
	return;

}
console.log("device id: "+this.moid);
	console.log("port id: "+this.port);
	var vlan = Ext.getCmp("vlanId").getValue()
	console.log("vlanId: "+vlan);
	var stagedInterfacesStore = Ext.getCmp("stagedInterfacesGrid").getStore();
	var routingProtocol = Ext.getCmp("routingProtocol").getValue();
	console.log("stages no ** : "+stagedInterfacesStore.count());
	
	var numberOfDuplicateVLAN = 0;
		if(stagedInterfacesStore.count() > 0){
			for(var i=0; i < stagedInterfacesStore.count(); i++) {
				var row = stagedInterfacesStore.getAt(i);
				console.log("moid>>>>>"+ row.data.pedeviceId);
				console.log("port2>>>>>"+ row.data.Interface);
				console.log("vlanId1>>>>>"+ row.data.vlanId);
				
				if((this.moid == row.data.pedeviceId) && (this.port == row.data.Interface) && (vlan == row.data.vlanId) ){
				numberOfDuplicateVLAN++;
				console.log("numberOfDuplicateVLAN>>>>>"+ numberOfDuplicateVLAN);
				if(numberOfDuplicateVLAN > 0 && routingProtocol != 'Static' && connectionType != 'RE Direct'){
					Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "VLAN ID cant be the same for selected Site and Port, Please change the VLAN ID.");
					return;
					}
				}
			}
		}
	var endPointServiceType = this.scriptUtils.getFieldByName("endPointServiceType").getValue();
	console.log(" endPointServiceType: "+endPointServiceType);

	var ciuName = this.scriptUtils.getFieldByName("ciuName").getValue();
	console.log("ciuName : "+ciuName);
	
	//console.log("this.CIUName : "+this.CIUName);
	
	//console.log("CIUName : "+CIUName);
	Ext.getCmp("ciuName").setDisabled(false);
	
	//if(isInterfaceForCustomerExist && ciuName == CIUName){
		//Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "This port is used by another customer. Please use another port");
	//return;
	//}
	
	
	var ciuAlias = this.scriptUtils.getFieldByName("ciuAlias").getValue();
	console.log("ciuAlias : "+ciuAlias);

	var accessType = this.scriptUtils.getFieldByName("accessType").getValue();
	console.log("accessType : "+accessType);
	var portSpeed = this.scriptUtils.getFieldByName("portSpeed").getValue();
	var connectionType = this.scriptUtils.getFieldByName("connectionType").getValue();
	console.log(" connectionType: "+connectionType);

	var csId = this.scriptUtils.getFieldByName("csId").getValue();
	console.log(" csId: "+csId);

	var pathPreferences = this.scriptUtils.getFieldByName("pathPreferences").getValue();
	console.log(" pathPreferences: "+pathPreferences);

	var autonegotiate = this.scriptUtils.getFieldByName("autonegotiate").getValue();
	var adminState = this.scriptUtils.getFieldByName("adminState").getValue();
	var operationalMode = this.scriptUtils.getFieldByName("operationalMode").getValue();
	
	var multiVRF = this.scriptUtils.getFieldByName("multiVRF").getValue();
	
	//bhanu
	
	var stagedInterfacesStore = Ext.getCmp("stagedInterfacesGrid").getStore();
	    var stagedInterfacesStore_RowCount = stagedInterfacesStore.count();
        		
		for(var i=0; i < stagedInterfacesStore_RowCount; i++) {
			var row = stagedInterfacesStore.getAt(i);
			console.log("row.data.Interface> "+row.data.Interface);
			console.log("this.port >> "+this.port);
			
			 if(row.data.Interface != this.port) {
				//Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "You cant select multiple port for the same customer. Please select "+row.data.Interface);
				//return;
		   }
		   
		   if(row.data.Interface == this.port) {
				stagedInterfacesStore.getAt(0).data.multiVRF = true;
				multiVRF = true;
				Ext.getCmp("ciuName").setDisabled(true);
		   }
		}
		console.log("multiVRF > "+multiVRF);
		
	var firstUnitForVRF = this.scriptUtils.getFieldByName("firstUnitForVRF").getValue();
	var traficControlProfile = this.scriptUtils.getFieldByName("traficControlProfile").getValue();
	
	var vlanId = this.scriptUtils.getFieldByName("vlanId").getValue();
	console.log("vlanId : "+vlanId);
	var ipAddress = this.scriptUtils.getFieldByName("ipAddress").getValue();
	console.log(" ipAddress: "+ipAddress);
	var subnetMask = this.scriptUtils.getFieldByName("subnetMask").getValue();
	console.log("subnetMask : "+subnetMask);

	var ipMTU = this.scriptUtils.getFieldByName("ipMTU").getValue();
	console.log(" ipMTU: "+ipMTU);
	var ipv6Peer =  Ext.getCmp('ipv6Peer').getValue();
	console.log("ipv6Peer : "+ipv6Peer);
	var ipv6Address = this.scriptUtils.getFieldByName("ipv6Address").getValue();
	console.log("ipv6Address : "+ipv6Address);
	var neighbourAddress = this.scriptUtils.getFieldByName("neighbourAddress").getValue();
	console.log("rneighbourAddressd : "+neighbourAddress);

	var localPref = this.scriptUtils.getFieldByName("localPref").getValue();
	console.log(" localPref: "+localPref);
	var med = this.scriptUtils.getFieldByName("med").getValue();
	console.log(" med: "+med);
	var peerAS = this.scriptUtils.getFieldByName("peerAS").getValue();
	console.log(" peerAS: "+peerAS);
	var routingProtocol = this.scriptUtils.getFieldByName("routingProtocol").getValue();
	var addressPool = this.scriptUtils.getFieldByName("addressPool").getValue();
	var ingressRate = this.scriptUtils.getFieldByName("ingressRate").getValue();
	var egressRate = this.scriptUtils.getFieldByName("egressRate").getValue();
	
	var interfaceSelected = Ext.getCmp("siteInterfaceGrid").getSelectionModel().getSelection()[0];
	var siteName = Ext.getCmp('siteName').getValue();
	
	var softwareVersion =  Ext.getCmp("softwareVersion").getValue();
	var nodeType = Ext.getCmp("nodeType").getValue();
	var siteName = this.site;
	
	var dataForDisplay = softwareVersion + "|"+ nodeType + "|" + siteName;	
	
	var qosType = Ext.getCmp('siteName').getValue();
	
	console.log("******************");


	console.log("site': " + this.site);
	console.log("port': " + this.port);
	console.log("moid  : " + this.moid);

	if(siteName == null || interfaceSelected == undefined || interfaceSelected == 'undefined') {
            Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please select the Site and Site Interface in order to add to the staging area");
            return true;
        }
		
		
		var doesIpDuplicationExistInStagedInterfacesStore = false;
        var doesPeSubinterfaceExistInStagedInterfacesStore = false;
		var stagedInterfacesStore = Ext.getCmp("stagedInterfacesGrid").getStore();
	    var stagedInterfacesStore_RowCount = stagedInterfacesStore.count();
        		
			for(var i=0; i < stagedInterfacesStore_RowCount; i++) {
				var row = stagedInterfacesStore.getAt(i);
			   if(row.data.site == this.moid) {
					// Check if PE subinterface already exists ...
					//if(row.data.Interface == interface1.getValue() && row.data.outerEncap == outerEncap1.getValue()) {
						//doesPeSubinterfaceExistInStagedInterfacesStore = true;
						// We can break out of the for loop as soon as the flag is set to true.
						//break;
					//}
					
					// Check for IP address duplication ...
					if(this.doesIpDuplicationExist(ipAddress, subnetMask, row.data.ipAddress, row.data.subnetMask)) {
						console.log("Row '" + i + "' has duplicate IP!");
						doesIpDuplicationExistInStagedInterfacesStore = true;
						Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "this IP address is already been used, Please try with another IP!");
						
						break;
					}
				}
			}
				
				
		// Perform a check on the IP address entered. We need to make sure that the IP, in combination with the mask, is valid.
        // ie. we cannot have an IP that is the broadcast or network address of the subnet.
		if(this.validateIpAddress()){
            return;
           	};
	
		
	var endpointPanel = Ext.ComponentQuery.query('#endpointPanel')[0];
	
	
	var staticExport = Ext.getCmp("staticOptionCustSupplier").collapsed;
	var staticNoExport = Ext.getCmp("staticOptionTelusSupplier").collapsed;
	var bgpExport = Ext.getCmp("prefixListTelusSupplierFieldset").collapsed;
	var bgpNoExport = Ext.getCmp("prefixListGrid").collapsed;
	
	var staticRoutesArr = [];
	
	var staticRoutingOption = Ext.getCmp("staticRoutingOption").getStore();
	    var staticRoutingOption_RowCount = staticRoutingOption.count();
        		
			for(var i=0; i < staticRoutingOption_RowCount; i++) {
				if(staticRoutingOption.getAt(i).data.destinationPrefix == '' || staticRoutingOption.getAt(i).data.nextHop == ''){
						Ext.MessageBox.alert('Validation Error','PrefixList/Next Hop can not be empty');
					return;
				}
				Ext.Array.push(staticRoutesArr,staticRoutingOption.getAt(i).data);
			}
			
	var staticRoutesTelusNoExportArr = [];
	var nextHopCustomerSupplier = Ext.getCmp("nextHopVal").getValue();
	var nextHopTelusSupplier = Ext.getCmp("nextHopTelusSupplier").getValue();
	
	var staticTelusSupplierGrid = Ext.getCmp("staticTelusSupplierGrid").getStore();
	    var staticTelusSupplierGrid_RowCount = staticTelusSupplierGrid.count();
        		
			for(var i=0; i < staticTelusSupplierGrid_RowCount; i++) {
				if(staticTelusSupplierGrid.getAt(i).data.destinationPrefix == '' || staticTelusSupplierGrid.getAt(i).data.nextHop == ''){
						Ext.MessageBox.alert('Validation Error','PrefixList/Next Hop can not be empty');
					return;
				}
				Ext.Array.push(staticRoutesTelusNoExportArr,staticTelusSupplierGrid.getAt(i).data);
			}		
			
	var staticRoutesArrForIPv6 = [];
	
	var staticRoutingOptionForIPv6 = Ext.getCmp("staticRoutingOptionForIPv6").getStore();
	    var staticRoutingOptionForIPv6_RowCount = staticRoutingOptionForIPv6.count();
        		
			for(var i=0; i < staticRoutingOptionForIPv6_RowCount; i++) {
				if(staticRoutingOptionForIPv6.getAt(i).data.destinationPrefix == '' || staticRoutingOptionForIPv6.getAt(i).data.nextHop == ''){
						Ext.MessageBox.alert('Validation Error','PrefixList/Next Hop can not be empty');
					return;
				}
				Ext.Array.push(staticRoutesArrForIPv6,staticRoutingOptionForIPv6.getAt(i).data);
			}		
	
	if(routingProtocol == 'Static' && ipv6Peer == true && staticRoutingOptionForIPv6.count() < 1){
		Ext.MessageBox.alert('Validation Error','Please fill IPV6 <b>Prefix/ Next Hop</b> values for the record(s) added to the <b>Static Grid</b>');
					return;
	}
	
	var ipv4PrefixListArr = [];
	var ipv4PrefixListTelusSupplierArr = [];
	var ipv6PrefixListArr = [];
	
	var prefixListPanel = Ext.getCmp("prefixListPanel").getStore();
	    var prefixListPanel_RowCount = prefixListPanel.count();
        		
			for(var i=0; i < prefixListPanel_RowCount; i++) {
				if(prefixListPanel.getAt(i).data.prefixList == ''){
						Ext.MessageBox.alert('Validation Error','PrefixList can not be empty');
					return;
				}
				Ext.Array.push(ipv4PrefixListArr,prefixListPanel.getAt(i).data);
			}
			
	var prefixListTelusSupplierGrid = Ext.getCmp("prefixListTelusSupplierGrid").getStore();
	    var prefixListTelusSupplierGrid_RowCount = prefixListTelusSupplierGrid.count();
        		
			for(var i=0; i < prefixListTelusSupplierGrid_RowCount; i++) {
				if(prefixListTelusSupplierGrid.getAt(i).data.prefixListTelusSupplier == ''){
						Ext.MessageBox.alert('Validation Error','PrefixList can not be empty');
					return;
				}
				Ext.Array.push(ipv4PrefixListTelusSupplierArr,prefixListTelusSupplierGrid.getAt(i).data);
			}
					
	
	var ipv6PrefixListPanel = Ext.getCmp("ipv6PrefixListPanel").getStore();
	    var ipv6PrefixListPanel_RowCount = ipv6PrefixListPanel.count();
        		
			for(var i=0; i < ipv6PrefixListPanel_RowCount; i++) {
				if(ipv6PrefixListPanel.getAt(i).data.prefixList == '' || ipv6PrefixListPanel.getAt(i).data.ipv6PrefixList == ''){
						Ext.MessageBox.alert('Validation Error','PrefixList can not be empty');
					return;
				}
				Ext.Array.push(ipv6PrefixListArr,ipv6PrefixListPanel.getAt(i).data);
			}
			
			

	
	stagedInterfacesStore.add({
		pedeviceId: this.moid,
		site: this.site,
		Interface: this.port,
		endPointServiceType: endPointServiceType,   
		ciuName: ciuName,
		ciuAlias: ciuAlias,
		accessType: accessType,
		portSpeed: portSpeed,
		connectionType: connectionType,
		csId: csId,
		pathPreferences: pathPreferences,
		vlanId: vlanId,
		ipAddress: ipAddress,
		subnetMask: subnetMask,
		ipMTU: ipMTU,
		ipv6Peer: ipv6Peer,
		ipv6Address: ipv6Address,//+"."+ipv6Address1+"."+ipv6Address2+"."+ipv6Address3,
		//rd: rd,
		neighbourAddress: neighbourAddress,
		routingProtocol: routingProtocol,
		autonegotiate: autonegotiate,
		adminState: adminState,
		operationalMode : operationalMode,
		multiVRF: multiVRF,
		firstUnitForVRF: firstUnitForVRF,
		traficControlProfile: traficControlProfile,
		addressPool: addressPool,
		ingressRate: ingressRate,
		egressRate: egressRate,
		localPref: localPref,
		med: med,
		peerAS: peerAS,
		recordOPType: 'ADD',
		staticRoutes: staticRoutesArr,
		StaticRoutesNoExport: staticRoutesTelusNoExportArr,
		//staticRoutes: staticRoutesArr,
		nextHopVal: nextHopCustomerSupplier,
		nextHopTelusSupplier: nextHopTelusSupplier,
		prefixList: ipv4PrefixListArr,
		prefixListTelusSupplier: ipv4PrefixListTelusSupplierArr,
		ipv6PrefixList: ipv6PrefixListArr,
		staticExport: staticExport,
		staticNoExport: staticNoExport,
		bgpExport: bgpExport,
		bgpNoExport: bgpNoExport,
		dataForDisplay: dataForDisplay
	});
//endpointPanel.hide(); 
Ext.getCmp('staticRoutingOption').show();
	Ext.getCmp('endpointPanel').hide();
Ext.getCmp('staticRoutingOption').show();	
	Ext.getCmp("staticRoutingOption").getStore().removeAll();
	Ext.getCmp("staticRoutingOptionForIPv6").getStore().removeAll();
},
handleUpdateStagedInterface:function() {
var isDataValid = this.validateEndpointDetails();
	console.log("isDataValid > > > > : > "+isDataValid);
	if(isDataValid)
		return;
console.log("handleUpdateStagedInterface");
	if(this.validateIpAddress()){
		return;
		};
			
	var endPointServiceType = Ext.getCmp("endPointServiceType").getValue();
	
	var ciuName = Ext.getCmp("ciuName").getValue();
	var ciuAlias = Ext.getCmp("ciuAlias").getValue();
	var accessType = Ext.getCmp("accessType").getValue();
	var connectionType = Ext.getCmp("connectionType").getValue();
	var portSpeed = Ext.getCmp("portSpeed").getValue();

	var csId = this.scriptUtils.getFieldByName("csId").getValue();
	console.log(" csId: "+csId);

	var pathPreferences = this.scriptUtils.getFieldByName("pathPreferences").getValue();
	console.log(" pathPreferences: "+pathPreferences);

	var vlanId = Ext.getCmp("vlanId").getValue();
	var ipAddress = Ext.getCmp("ipAddress").getValue();
	var subnetMask = Ext.getCmp("subnetMask").getValue();
	var ipMTU = Ext.getCmp("ipMTU").getValue();
	
	console.log("ipMTU': " +ipMTU);
	
	var ipv6Peer =Ext.getCmp("ipv6Peer").getValue();
	var ipv6Address =Ext.getCmp("ipv6Address").getValue();
	var neighbourAddress = Ext.getCmp("neighbourAddress").getValue();
	var localPref = Ext.getCmp("localPref").getValue();
	var med = Ext.getCmp("med").getValue();
	var peerAS = Ext.getCmp("peerAS").getValue();
	var routingProtocol =Ext.getCmp("routingProtocol").getValue();
	
	var addressPool =Ext.getCmp("addressPool").getValue();
	var ingressRate =Ext.getCmp("ingressRate").getValue();
	var egressRate =Ext.getCmp("egressRate").getValue();
	var index = Ext.getCmp("index").getValue();
	console.log('index to update: '+index);
	var autonegotiate = Ext.getCmp("autonegotiate").getValue();
	var adminState = Ext.getCmp("adminState").getValue();
	var operationalMode = Ext.getCmp("operationalMode").getValue();
	
	var multiVRF = Ext.getCmp("multiVRF").getValue();
	var firstUnitForVRF = Ext.getCmp("firstUnitForVRF").getValue();
	var traficControlProfile = Ext.getCmp("traficControlProfile").getValue();

	console.log("******************");
	console.log("ipAddress': " + ipAddress);
	console.log("******************");
	
	var staticExport = Ext.getCmp("staticOptionCustSupplier").collapsed;
	var staticNoExport = Ext.getCmp("staticOptionTelusSupplier").collapsed;
	var bgpExport = Ext.getCmp("prefixListTelusSupplierFieldset").collapsed;
	var bgpNoExport = Ext.getCmp("prefixListGrid").collapsed;
	
	var staticRoutesArr = [];
	
	var staticRoutingOption = Ext.getCmp("staticRoutingOption").getStore();
	    var staticRoutingOption_RowCount = staticRoutingOption.count();
        		
			for(var i=0; i < staticRoutingOption_RowCount; i++) {
				if(staticRoutingOption.getAt(i).data.destinationPrefix == '' || staticRoutingOption.getAt(i).data.nextHop == ''){
						Ext.MessageBox.alert('Validation Error','PrefixList/Next Hop can not be empty');
					return;
				}
				Ext.Array.push(staticRoutesArr,staticRoutingOption.getAt(i).data);
			}
			
	var staticRoutesTelusNoExportArr = [];
	var nextHopCustomerSupplier = Ext.getCmp("nextHopVal").getValue();
	var nextHopTelusSupplier = Ext.getCmp("nextHopTelusSupplier").getValue();
	
	var staticTelusSupplierGrid = Ext.getCmp("staticTelusSupplierGrid").getStore();
	    var staticTelusSupplierGrid_RowCount = staticTelusSupplierGrid.count();
        		
			for(var i=0; i < staticTelusSupplierGrid_RowCount; i++) {
				if(staticTelusSupplierGrid.getAt(i).data.destinationPrefix == '' || staticTelusSupplierGrid.getAt(i).data.nextHop == ''){
						Ext.MessageBox.alert('Validation Error','PrefixList/Next Hop can not be empty');
					return;
				}
				Ext.Array.push(staticRoutesTelusNoExportArr,staticTelusSupplierGrid.getAt(i).data);
			}		
			
	var staticRoutesArrForIPv6 = [];
	
	var staticRoutingOptionForIPv6 = Ext.getCmp("staticRoutingOptionForIPv6").getStore();
	    var staticRoutingOptionForIPv6_RowCount = staticRoutingOptionForIPv6.count();
        		
			for(var i=0; i < staticRoutingOptionForIPv6_RowCount; i++) {
				if(staticRoutingOptionForIPv6.getAt(i).data.destinationPrefix == '' || staticRoutingOptionForIPv6.getAt(i).data.nextHop == ''){
						Ext.MessageBox.alert('Validation Error','PrefixList/Next Hop can not be empty');
					return;
				}
				Ext.Array.push(staticRoutesArrForIPv6,staticRoutingOptionForIPv6.getAt(i).data);
			}		
	
	if(routingProtocol == 'Static' && ipv6Peer == true && staticRoutingOptionForIPv6.count() < 1){
		Ext.MessageBox.alert('Validation Error','Please fill IPV6 <b>Prefix/ Next Hop</b> values for the record(s) added to the <b>Static Grid</b>');
					return;
	}
	
	var ipv4PrefixListArr = [];
	var ipv6PrefixListArr = [];
	
	var prefixListPanel = Ext.getCmp("prefixListPanel").getStore();
	    var prefixListPanel_RowCount = prefixListPanel.count();
        		
			for(var i=0; i < prefixListPanel_RowCount; i++) {
				if(prefixListPanel.getAt(i).data.prefixList == ''){
						Ext.MessageBox.alert('Validation Error','PrefixList can not be empty');
					return;
				}
				Ext.Array.push(ipv4PrefixListArr,prefixListPanel.getAt(i).data);
			}
			
	var ipv4PrefixListTelusSupplierArr = [];		
	var prefixListTelusSupplierGrid = Ext.getCmp("prefixListTelusSupplierGrid").getStore();
	    var prefixListTelusSupplierGrid_RowCount = prefixListTelusSupplierGrid.count();
        		
			for(var i=0; i < prefixListTelusSupplierGrid_RowCount; i++) {
				if(prefixListTelusSupplierGrid.getAt(i).data.prefixListTelusSupplier == ''){
						Ext.MessageBox.alert('Validation Error','PrefixList can not be empty');
					return;
				}
				Ext.Array.push(ipv4PrefixListTelusSupplierArr,prefixListTelusSupplierGrid.getAt(i).data);
			}		
	
	var ipv6PrefixListPanel = Ext.getCmp("ipv6PrefixListPanel").getStore();
	    var ipv6PrefixListPanel_RowCount = ipv6PrefixListPanel.count();
        		
			for(var i=0; i < ipv6PrefixListPanel_RowCount; i++) {
				if(ipv6PrefixListPanel.getAt(i).data.prefixList == '' || ipv6PrefixListPanel.getAt(i).data.ipv6PrefixList == ''){
						Ext.MessageBox.alert('Validation Error','PrefixList can not be empty');
					return;
				}
				Ext.Array.push(ipv6PrefixListArr,ipv6PrefixListPanel.getAt(i).data);
			}
	var stagedInterfacesStore = Ext.getCmp("stagedInterfacesGrid").getStore();
	var row = stagedInterfacesStore.getAt(index);
		row.data.endPointServiceType= endPointServiceType;   
		row.data.ciuName= ciuName;
		row.data.ciuAlias= ciuAlias;
		row.data.accessType= accessType;
		row.data.connectionType= connectionType;
		row.data.portSpeed= portSpeed;
		row.data.csId= csId,
		row.data.pathPreferences= pathPreferences,
		row.data.vlanId= vlanId;
		row.data.ipAddress= ipAddress;
		row.data.subnetMask= subnetMask;
		row.data.ipMTU= ipMTU;
		row.data.ipv6Peer= ipv6Peer;
		row.data.ipv6Address= ipv6Address;//+"."+ipv6Address1+"."+ipv6Address2+"."+ipv6Address3;
		//row.data.rd= rd;
		row.data.neighbourAddress= neighbourAddress;
		row.data.localPref= localPref;
		row.data.med= med;
		row.data.peerAS= peerAS;
		row.data.routingProtocol = routingProtocol;
		row.data.autonegotiate = autonegotiate;
		row.data.adminState = adminState;
		row.data.operationalMode = operationalMode;
		row.data.multiVRF = multiVRF;
		row.data.firstUnitForVRF = firstUnitForVRF;
		row.data.traficControlProfile = traficControlProfile;
		row.data.addressPool = addressPool;
		row.data.ingressRate = ingressRate;
		row.data.egressRate = egressRate;
		row.data.staticRoutes = staticRoutesArr;
		
		row.data.StaticRoutesNoExport = staticRoutesTelusNoExportArr;
		row.data.nextHopVal = nextHopCustomerSupplier;
		row.data.nextHopTelusSupplier = nextHopTelusSupplier;
		
		row.data.staticRoutesForIPv6 = staticRoutesArrForIPv6;
		row.data.prefixList = ipv4PrefixListArr;
		row.data.prefixListTelusSupplier = ipv4PrefixListTelusSupplierArr;
		row.data.ipv6PrefixList = ipv6PrefixListArr;
		row.data.staticExport = staticExport;
		row.data.staticNoExport = staticNoExport;
		row.data.bgpExport = bgpExport;
		row.data.bgpNoExport = bgpNoExport;
	
	//var endpointPanel = Ext.ComponentQuery.query('#endpointPanel')[0];
	//endpointPanel.hide();
	Ext.getCmp('staticRoutingOption').show()
	Ext.getCmp('endpointPanel').hide();
	Ext.getCmp('staticRoutingOption').show()
	var clearInactiveEntriesFromListButton = Ext.getCmp('clearInactiveEntriesFromListButton');
	clearInactiveEntriesFromListButton.show();
	
	////this.isCCI=false;
															
															
	var updateBtn = Ext.getCmp('updateBtn');
	updateBtn.hide();
	var stageBtn = Ext.getCmp('stageBtn');
	stageBtn.show();
	
	var interfacegrid = Ext.ComponentQuery.query('gridpanel[name=siteInterfaceGrid]')[0];
	interfacegrid.setDisabled(false);
	Ext.getCmp("routingProtocol").setDisabled(false);
	Ext.getCmp("staticRoutingOption").getStore().removeAll();
	Ext.getCmp("staticRoutingOptionForIPv6").getStore().removeAll();
	
	Ext.getCmp('siteName').setDisabled(false);
	Ext.getCmp("stagedInterfacesGrid").getView().refresh();	
},
handleClearAddSiteInterfacePanelButton:function() {
        var endPointServiceType = Ext.getCmp("endPointServiceType").reset();
		var ciuLoopback =Ext.getCmp("ciuName").reset();
		var ciuLoopback =Ext.getCmp("ciuAlias").reset();
		var csId =Ext.getCmp("csId").reset();
		var accessType =Ext.getCmp("accessType").reset();
		var connectionType =Ext.getCmp("connectionType").reset();
		var vlanId =Ext.getCmp("vlanId").reset();
		var ipAddress =Ext.getCmp("ipAddress").reset();
		var subnetMask =Ext.getCmp("subnetMask").reset();
		var ipMTU =Ext.getCmp("ipMTU").reset();

		//var rd =Ext.getCmp("rd").reset();
		var neighbourAddress =Ext.getCmp("neighbourAddress").reset();
		var localPref =Ext.getCmp("localPref").reset();
		var med =Ext.getCmp("med").reset();
		var peerAS =Ext.getCmp("peerAS").reset();
		var enforceRoute =Ext.getCmp("enforceRoute").reset();
		var enforceRoute =Ext.getCmp("enforceRoute").reset();

    },
   handleClearInactiveEntriesFromList:function() {
		var records = Ext.getCmp("stagedInterfacesGrid").selModel.getSelection();
		Ext.getCmp("stagedInterfacesGrid").getStore().remove(records);
	    Ext.getCmp("stagedInterfacesGrid").getView().refresh();
    },
	validateVLAN:function() {
	//deviceId,port,vlan
	console.log("device id: "+this.moid);
	console.log("port id: "+this.port);
	var vlan = Ext.getCmp("vlanId").getValue()
	console.log("vlanId: "+vlan);
	var stagedInterfacesStore = Ext.getCmp("stagedInterfacesGrid").getStore();
	var routingProtocol = Ext.getCmp("routingProtocol").getValue();
	console.log("stages no : "+stagedInterfacesStore.count());
	var msg = '';
	var numberOfDuplicateVLAN = 0;
		if(stagedInterfacesStore.count() > 0){
			for(var i=0; i < stagedInterfacesStore.count(); i++) {
				var row = stagedInterfacesStore.getAt(i);
				console.log("moid>>>>>"+ row.data.pedeviceId);
				console.log("port2>>>>>"+ row.data.Interface);
				console.log("vlanId1>>>>>"+ row.data.vlanId);
				
				if((this.moid == row.data.pedeviceId) && (this.port == row.data.port) && (vlan == row.data.vlanId) ){
				numberOfDuplicateVLAN++;
				console.log("numberOfDuplicateVLAN>>>>>"+ numberOfDuplicateVLAN);
				if(numberOfDuplicateVLAN > 0 && routingProtocol != 'Static'){
					Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "VLAN ID cant be the same for selected Site and Port, Please change the VLAN ID.");
					return;
					}
				}
			}
		}
		
		Ext.Ajax.request({
			method:'GET',
			url:'/serviceui/resteasy/cpp-service-order/validate',
			waitMsg:'Loading',
			scope:this,	
			params:{"deviceId":this.moid,"port":this.port,"vlan":vlan},
			success:function(r){
				var result = Ext.decode(r.responseText);
				console.log("result: "+result.success);
				if(result.success == 'true'){
					msg='VLAN is available';
				}
				else if(result.success == 'false'){
					msg='VLAN is in Use. Please use another one';
				}
				Ext.Msg.show({
					title:result.title,
					msg:msg,
					icon:Ext.MessageBox.INFO,
					buttons:Ext.Msg.OK
				});
			}
		});
		return true;			   
	},
	 validateIpAddress: function() {
		// Return reference to 'ipAddress3' and 'subnetMask' components.
		var ipAddress = this.scriptUtils.getFieldByName('ipAddress').getValue();
		var ipAddress3 = ipAddress.split(".")[3];
		console.log("ipAddress3 > "+ipAddress3);
		var subnetMask = this.scriptUtils.getFieldByName('subnetMask').getValue();
		var fourthOctet = parseInt(ipAddress3);
		var subnetSize;
		if(subnetMask == "32") {
			subnetSize = 1;
		}
		if(subnetMask == "31") {
			subnetSize = 2;
		}
		if(subnetMask == "30") {
			subnetSize = 4;
		}
		else if(subnetMask == "29") {
			subnetSize = 8;
		}
		else if(subnetMask == "28") {
			subnetSize = 16;
		}
		else if(subnetMask == "27") {
			subnetSize = 32;
		}
		else if(subnetMask == "26") {
			subnetSize = 64;
		}
		else if(subnetMask == "25") {
			subnetSize = 128;
		}
		else if(subnetMask == "24") {
			subnetSize = 256;
		}
		else {
			subnetSize = 0;
		}
		
		
		// Check if the IP address in question is the network address of the subnet.
		if(fourthOctet % subnetSize == 0) {
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "ERROR: Cannot Use Network Address of Subnet");
			return true;
		}
		// Check if the IP address in question is the broadcast address of the subnet.
		else if((fourthOctet + 1) % subnetSize == 0) {
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "ERROR: Cannot Use Broadcast Address of Subnet");
			return true;
		}
		else {
			// Do Nothing
		}
	},
	getNetworkAddress: function(ipAddress, subnetMask_DecimalNotation) {
        
		var subnetMask_DottedDecimalNotation='';
        
		if(subnetMask_DecimalNotation == "31") {
            subnetMask_DottedDecimalNotation = "255.255.255.254";
        }
		
        if(subnetMask_DecimalNotation == "30") {
            subnetMask_DottedDecimalNotation = "255.255.255.252";
        }
        else if(subnetMask_DecimalNotation == "29") {
            subnetMask_DottedDecimalNotation = "255.255.255.248";
        }
        else if(subnetMask_DecimalNotation == "28") {
            subnetMask_DottedDecimalNotation = "255.255.255.240";
        }
        else if(subnetMask_DecimalNotation == "27") {
            subnetMask_DottedDecimalNotation = "255.255.255.224";
        }
        else if(subnetMask_DecimalNotation == "26") {
            subnetMask_DottedDecimalNotation = "255.255.255.192";
        }
        else if(subnetMask_DecimalNotation == "25") {
            subnetMask_DottedDecimalNotation = "255.255.255.128";
        }
        else if(subnetMask_DecimalNotation == "24") {
            subnetMask_DottedDecimalNotation = "255.255.255.0";
        }
        
        //console.log("Value of 'subnetMask_DecimalNotation': " + subnetMask_DecimalNotation);
        //console.log("Value of 'subnetMask_DottedDecimalNotation': " + subnetMask_DottedDecimalNotation);
        
        // IP = "A.B.C.D"
    	// tempArray[0] = A
    	// tempArray[1] = B
    	// tempArray[2] = C
    	// tempArray[3] = D
    	var tempArray1 = ipAddress.split(".");
        var ipAddress_FirstOctet = parseInt(tempArray1[0]);
        var ipAddress_SecondOctet = parseInt(tempArray1[1]);
        var ipAddress_ThirdOctet = parseInt(tempArray1[2]);
        var ipAddress_FouthOctet = parseInt(tempArray1[3]);
        
        var tempArray2 = subnetMask_DottedDecimalNotation.split(".");
        var subnetMask_FirstOctet = parseInt(tempArray2[0]);
        var subnetMask_SecondOctet = parseInt(tempArray2[1]);
        var subnetMask_ThirdOctet = parseInt(tempArray2[2]);
        var subnetMask_FouthOctet = parseInt(tempArray2[3]);
        
        // Perform bitwise AND operation on associated octets
		var networkOctet1 = parseInt(ipAddress_FirstOctet) & parseInt(subnetMask_FirstOctet);
		var networkOctet2 = parseInt(ipAddress_SecondOctet) & parseInt(subnetMask_SecondOctet);
		var networkOctet3 = parseInt(ipAddress_ThirdOctet) & parseInt(subnetMask_ThirdOctet);
		var networkOctet4 = parseInt(ipAddress_FouthOctet) & parseInt(subnetMask_FouthOctet);
		
		//console.log("Value of 'networkOctet1': " + networkOctet1);
		//console.log("Value of 'networkOctet2': " + networkOctet2);
		//console.log("Value of 'networkOctet3': " + networkOctet3);
		//console.log("Value of 'networkOctet4': " + networkOctet4);
		
		var networkAddress = networkOctet1 + "." + networkOctet2 + "." + networkOctet3 + "." + networkOctet4;
		//console.log("Value of 'networkAddress': " + networkAddress);
		
		return networkAddress;
    },
	getBroadcastAddress: function(ipAddress, subnetMask_DecimalNotation) {
        //console.log("In 'getBroadcastAddress()' ...");
        //console.log("Value of 'ipAddress': " + ipAddress);
        //console.log("Value of 'subnetMask_DecimalNotation': " + subnetMask_DecimalNotation);
        
        // First we need to get the network address ...
        var networkAddress = this.getNetworkAddress(ipAddress, subnetMask_DecimalNotation);
        //console.log("Value of 'networkAddress': " + networkAddress);
        
        var broadcastAddress;
        var broadcastAddress_FourthOctet;
        
        // IP = "A.B.C.D"
    	// tempArray[0] = A
    	// tempArray[1] = B
    	// tempArray[2] = C
    	// tempArray[3] = D
    	var tempArray = networkAddress.split(".");
        var networkAddress_FirstOctet = parseInt(tempArray[0]);
        var networkAddress_SecondOctet = parseInt(tempArray[1]);
        var networkAddress_ThirdOctet = parseInt(tempArray[2]);
        var networkAddress_FouthOctet = parseInt(tempArray[3]);
        
        //console.log("Value of 'networkAddress_FirstOctet': " + networkAddress_FirstOctet);
		//console.log("Value of 'networkAddress_SecondOctet': " + networkAddress_SecondOctet);
		//console.log("Value of 'networkAddress_ThirdOctet': " + networkAddress_ThirdOctet);
		//console.log("Value of 'networkAddress_FouthOctet': " + networkAddress_FouthOctet);
        
		if(subnetMask_DecimalNotation == "31") {
           broadcastAddress_FourthOctet = networkAddress_FouthOctet + 2;
        }
        if(subnetMask_DecimalNotation == "30") {
            broadcastAddress_FourthOctet = networkAddress_FouthOctet + 3;
        }
        else if(subnetMask_DecimalNotation == "29") {
            broadcastAddress_FourthOctet = networkAddress_FouthOctet + 7;
        }
        else if(subnetMask_DecimalNotation == "28") {
            broadcastAddress_FourthOctet = networkAddress_FouthOctet + 15;
        }
        else if(subnetMask_DecimalNotation == "27") {
            broadcastAddress_FourthOctet = networkAddress_FouthOctet + 31;
        }
        else if(subnetMask_DecimalNotation == "26") {
            broadcastAddress_FourthOctet = networkAddress_FouthOctet + 63;
        }
        else if(subnetMask_DecimalNotation == "25") {
            broadcastAddress_FourthOctet = networkAddress_FouthOctet + 127;
        }
        else if(subnetMask_DecimalNotation == "24") {
            broadcastAddress_FourthOctet = networkAddress_FouthOctet + 255;
        }
        
        //console.log("Value of 'broadcastAddress_FourthOctet': " + broadcastAddress_FourthOctet);
		
        broadcastAddress = networkAddress_FirstOctet + "." + networkAddress_SecondOctet + "." + networkAddress_ThirdOctet + "." + broadcastAddress_FourthOctet;
		//console.log("Value of 'broadcastAddress': " + broadcastAddress);
		
		return broadcastAddress;
    },
	doesIpDuplicationExist: function(ipAddress1, subnetMask1, ipAddress2, subnetMask2) {
        // Using the IP address and Mask, get the first and last IPs in the range (ie. network and broadcast addreses).
        var ipAddress1_First = this.getNetworkAddress(ipAddress1, subnetMask1);
        var ipAddress1_Last = this.getBroadcastAddress(ipAddress1, subnetMask1);
        var ipAddress2_First = this.getNetworkAddress(ipAddress2, subnetMask2);
        var ipAddress2_Last = this.getBroadcastAddress(ipAddress2, subnetMask2);
        //console.log("Value of 'ipAddress1_First': " + ipAddress1_First);
        //console.log("Value of 'ipAddress1_Last': " + ipAddress1_Last);
        //console.log("Value of 'ipAddress2_First': " + ipAddress2_First);
        //console.log("Value of 'ipAddress2_Last': " + ipAddress2_Last);
        
        // Convert these first and last IP addresses into Integer-IPs for comparison purposes.
        var integerIp1_First = this.convertIpAddressToIntegerIpNotation(ipAddress1_First);
        var integerIp1_Last = this.convertIpAddressToIntegerIpNotation(ipAddress1_Last);
        var integerIp2_First = this.convertIpAddressToIntegerIpNotation(ipAddress2_First);
        var integerIp2_Last = this.convertIpAddressToIntegerIpNotation(ipAddress2_Last);
        //console.log("Value of 'integerIp1_First': " + integerIp1_First);
        //console.log("Value of 'integerIp1_Last': " + integerIp1_Last);
        //console.log("Value of 'integerIp2_First': " + integerIp2_First);
        //console.log("Value of 'integerIp2_Last': " + integerIp2_Last);
        
        var doesDuplicationExist = false;
        // Check if duplication exists ...
        // CASE 1: If block 1 is a superset of block 2.
        if((integerIp1_First < integerIp2_First) && (integerIp1_Last > integerIp2_Last)) {
            //console.log("In Case 1!");
            doesDuplicationExist = true;
        }
        
        // CASE 2: If the first IP from block 1 resides within the range of block 2.
        if((integerIp1_First >= integerIp2_First) && (integerIp1_First <= integerIp2_Last)) {
            //console.log("In Case 2!");
            doesDuplicationExist = true;
        }
        
        // Case 3: If the last IP from block 1 resides within the range of block 2.
        if((integerIp1_Last >= integerIp2_First) && (integerIp1_Last <= integerIp2_Last)) {
            //console.log("In Case 3!");
            doesDuplicationExist = true;
        }
        
        //console.log("Value of 'doesDuplicationExist': " + doesDuplicationExist);
        return doesDuplicationExist;
    },
	getRoutingOptions: function() {
        var optionStore = Ext.create('Ext.data.Store',{
            storeId: 'optionStore',
            fields: [
                {name: 'option'}            
            ], 
            data: [
             
                
                {
                    option: 'Access Options'
                },
                {
                  option: 'BGP Options'
                },
                {
                   option: 'QoS Options'
                },
				{
                   option: 'CIU Options'
                }
                
                
            ]
        });
        
        return optionStore;    
    },
	getStaticRoutingOptions: function() {
        var optionStore = Ext.create('Ext.data.Store',{
            storeId: 'optionStore',
            fields: [
                {name: 'option'}            
            ], 
            data: [
             
                
                {
                    option: 'Access Options'
                },
				 {
                    option: 'Static Options'
                },
                {
                   option: 'QoS Options'
                },
				{
                   option: 'CIU Options'
                }
                
                
            ]
        });
        
        return optionStore;    
    },

	handleAddPrefixListBGPRouting:function() {
	var prefixListPanelStore = Ext.getCmp("prefixListPanel").getStore();
	var staticRoutingOptionStore_RowCount = prefixListPanelStore.count();


	prefixListPanelStore.add({
		prefixList: ""
		
	}); 	
	},
	handleAddPrefixListBGPTelusNoExport:function() {
	var prefixListTelusSupplierGrid = Ext.getCmp("prefixListTelusSupplierGrid").getStore();
	var prefixListTelusSupplierGrid_RowCount = prefixListTelusSupplierGrid.count();


	prefixListTelusSupplierGrid.add({
		prefixListTelusSupplier: ""
		
	}); 	
	},
	
	handleAddIPv6PrefixListBGPRouting:function() {
	var prefixListPanelStore = Ext.getCmp("ipv6PrefixListPanel").getStore();
	var staticRoutingOptionStore_RowCount = prefixListPanelStore.count();


	prefixListPanelStore.add({
		ipv6PrefixList: ""
		
	}); 	
	},
	handleAddStaticRouting:function() {
	var staticRoutingOptionStore = Ext.getCmp("staticRoutingOption").getStore();
	var staticRoutingOptionStore_RowCount = staticRoutingOptionStore.count();


	staticRoutingOptionStore.add({
		destinationPrefix: ""
		
	}); 	
	},
	handleAddStaticTelusSupplier:function() {
	var staticRoutingOptionStore = Ext.getCmp("staticTelusSupplierGrid").getStore();
	var staticRoutingOptionStore_RowCount = staticRoutingOptionStore.count();


	staticRoutingOptionStore.add({
		destinationPrefix: ""
		
	}); 	
	},
	handleAddStaticRoutingForIPv6:function() {
	var staticRoutingOptionForIPv6 = Ext.getCmp("staticRoutingOptionForIPv6").getStore();
	var staticRoutingOptionStore_RowCount = staticRoutingOptionForIPv6.count();


	staticRoutingOptionForIPv6.add({
		destinationPrefix: "",
		nextHop: ""
		
	}); 	
	},
	getHardwareModel: function(deviceId) {
	//deviceId = 11337875;
    var vendor = 'Juniper';
    var inventoryType = 'system-information';
    //var inventoryType = 'device';
    var systemInfo_HardwareModel_XPath = "/system-information/hardware-model";
    //var systemInfo_HardwareModel_XPath = "/device/configuration/system/apply-macro[name='role']/data/name";
    var hardwareModel = "";

    this.getNodeList(deviceId, vendor, inventoryType, systemInfo_HardwareModel_XPath, function(results){            
        hardwareModel = results["hardware-model"];
		Ext.getCmp("nodeType").setValue(hardwareModel);
        console.log("Value of 'hardwareModel': " + hardwareModel);
    });    
},


getSoftwareVersion: function(deviceId) {
//deviceId = 11337875;
    var vendor = 'Juniper';
    var inventoryType = 'system-information';
    var systemInfo_OsVersion_XPath = "/system-information/os-version";
    var osVersion = "";

    this.getNodeList(deviceId, vendor, inventoryType, systemInfo_OsVersion_XPath, function(results){     
	
        osVersion = results["os-version"];
		Ext.getCmp("softwareVersion").setValue(osVersion);
        console.log("Value of 'osVersion': " + osVersion);
    });
},

getInterfaceDescription: function(interfaceName) {
	console.log("getting interface description***************** "+interfaceName);
	this.getMultiVRFDetails(interfaceName,null);
	var vendor = 'Juniper';
    var inventoryType = 'device';
	var device_IntferfaceDesc_XPath = "/device/configuration/interfaces/interface[name='" + interfaceName + "']";
	var formData = this.scriptUtils.getFormValues(this);
	var siteName = Ext.getCmp('siteName').getValue();
	this.getNodeList(siteName, vendor, inventoryType, device_IntferfaceDesc_XPath, function(results){ 
		
		
		try{
			var interfaceDescription = results["interface"].description;
			console.log("interfaceDescription: "+interfaceDescription);
			var hierarchicalScheduler = results["interface"]["hierarchical-scheduler"];
			var flexibleVlanTagging = results["interface"]["flexible-vlan-tagging"];
			var encapsulation = results["interface"].encapsulation;
			if(hierarchicalScheduler != undefined && flexibleVlanTagging!= undefined && encapsulation != undefined){
				console.log("valid");
				this.isPortValid = true;
			}else{
				console.log("invalid");
				this.isPortValid = false;
			}
			console.log("is port valid: : "+ this.isPortValid);
			
			Ext.getCmp("lblInterfaceDescription").setValue(interfaceDescription);
			
			
			//Ext.getCmp("multiVRF").setValue(interfaceDescription.split('.').length > 2);
			
			var ciuName = Ext.getCmp("ciuName").getValue();
			//var qosType = Ext.getCmp("qosType").getValue();
			console.log("CIUName set on ADVANCED API CALL : "+ciuName);
			
			if(results["interface"]["description"]["#text"] != undefined){
			var intfDesc = results["interface"]["description"]["#text"];
				Ext.getCmp("lblInterfaceDescription").setValue(results["interface"]["description"]["#text"])
				Ext.getCmp("multiVRF").setValue(intfDesc.split('.').length > 1);
				if((intfDesc.split('.').length   >  1) && (ciuName == null || ciuName =='')){
					Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "This port is used by another customer. Please use another port");
					return;
				}
			}
			
			else if(results["interface"]["description"]["#text"] == undefined && (interfaceDescription.split('.').length > 1) && (ciuName == null || ciuName =='')){
				Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "This port is used by another customer. Please use another port");
				return;
			}
		}
		catch(e){
			Ext.getCmp("multiVRF").setValue(false);
			console.log("error:   "+e);
			if(results["interface"] == undefined){
				this.isPortValid = false;
				Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "This interface is not ready for use");
				return;
			}
			Ext.getCmp("lblInterfaceDescription").setValue("");
		}
	}
	);
},
getMultiVRFDetails:function(id, deviceId) {
		var interfaceList='';
		//serviceui/resteasy/cpp-service/advance-details/7634997?portName=ge-0/2/3&customerName=customer1
		var selectedPort=  Ext.getCmp("siteInterfaceGrid").getSelectionModel().getSelection()[0].data.portName;
		if(deviceId == null || deviceId ==''){
			deviceId = Ext.getCmp("siteName").getValue();
		}
		var ossCustomerId = Ext.getCmp("customerId").getValue();
		console.log("selectedPort: "+selectedPort);
		console.log("deviceId: "+deviceId);
		console.log("ossCustomerId: "+ossCustomerId);
		Ext.Ajax.request({
			method:'GET',
			url:'../serviceui/resteasy/cpp-service/advance-details/'+deviceId+'?Interface='+selectedPort+'&ossCustomerId='+ossCustomerId,
			success:function(r) {				
				var result = Ext.decode(r.responseText);
				console.log("result: "+result);
				console.log("result advanced: "+result.advanced);
				advancedResult = {};
				try{
				//Ext.getCmp("ciuName").setValue("");
				if(result.advanced[0] != undefined || result.advanced[0] != ''){
					//console.log("ad >> ..   :"+result.advanced);
				    //console.log("adv >> ..   :"+result.advanced[0]);
				    console.log("ciu name >> ..   :"+result.advanced[0].ciuName);
					//var qosType = result.advanced[0].qosType;
					//console.log("qosType >:> "+result.advanced[0].qosType == 'QoS Per Access');
					console.log("is qos per access?  >:> "+result.advanced[0].qosType.trim() == "QoS per Access");
					console.log("qosType >:> "+result.advanced[0].qosType);
					var traficControlProfile = '';
					var schedulerMapForMultiVRF = '';
					advancedResult = {};
					if(result.advanced[0].qosType.trim() == "QoS per Access"){
						//var af1 = result.advanced[0].af1;
						//var af2 = result.advanced[0].af2;
						//var af3 = result.advanced[0].af3;
						var ciuName = result.advanced[0].ciuName;
						console.log("ciuName<< "+ciuName);
						var ciuAlias = result.advanced[0].ciuAlias;
						//var ciuLoopback = result.advanced[0].ciuLoopback;
						
						var customerId = result.advanced[0].ossCustomerId;
						var accessRate = result.advanced[0].accessRate;
						var qosType = result.advanced[0].qosType;
						var unit = result.advanced[0].vlanId;
						
						var accessRate = result.advanced[0].accessRate;
						var efService = result.advanced[0].efService;
						var af1 = result.advanced[0].af1;
						var af2 = result.advanced[0].af2;
						var af3 = result.advanced[0].af3;
						
						var isAF1Selected = result.advanced[0].isAF1Selected;
						var isAF2Selected = result.advanced[0].isAF2Selected;
						var isAF3Selected = result.advanced[0].isAF3Selected;
						var isAllAFSelected = result.advanced[0].isAllAFSelected;
						
						advancedResult['af1'] = af1;
						advancedResult['af2'] = af2;
						advancedResult['af3'] = af3;
						advancedResult['isAF1Selected'] = isAF1Selected;
						advancedResult['isAF2Selected'] = isAF2Selected;
						advancedResult['isAF3Selected'] = isAF3Selected;
						advancedResult['isAllAFSelected'] = isAllAFSelected;
									
						
						
						//console.log("efService > "+efService);
						
						//if(efService == 'true')
						 traficControlProfile = 'IP_NTWKSv2_'+accessRate.toUpperCase()+"_EF_"+af3 + "_"+ af2 + "_"+af1;
						//if(efService == 'false')
						 //traficControlProfile = 'IP_NTWKSv2_'+accessRate.toUpperCase()+"_NOEF_"+af3 + "_"+ af2 + "_"+af1;
						
						//if(efService == 'true')
						 schedulerMapForMultiVRF = 'SM'+"_EF_"+af3 + "_"+ af2 + "_"+af1;
						//if(efService == 'false')
						 //schedulerMapForMultiVRF = 'SM'+"_NOEF_"+af3 + "_"+ af2 + "_"+af1;
						
						console.log("traficControlProfile > "+traficControlProfile);
						
						Ext.getCmp("schedulerMapForMultiVRF").setValue(schedulerMapForMultiVRF);
						
						Ext.getCmp("traficControlProfile").setValue(traficControlProfile);
						Ext.getCmp("qosType").setValue(qosType);
						Ext.getCmp("egressRate").setValue(accessRate);
						Ext.getCmp('egressRate').setDisabled(true);
						Ext.getCmp("ciuName").setValue(ciuName);
						Ext.getCmp('ciuName').setDisabled(true);
						Ext.getCmp("ciuAlias").setValue(ciuAlias);
						Ext.getCmp('ciuAlias').setDisabled(true);
					}
          	}else{
					Ext.getCmp("traficControlProfile").setValue("");
					Ext.getCmp("schedulerMapForMultiVRF").setValue("");
					//Ext.getCmp("endPointServiceType").setValue("TML3");
					//Ext.getCmp('endPointServiceType').setDisabled(false);
					Ext.getCmp("ciuName").setValue("");
					Ext.getCmp('ciuName').setDisabled(false);
					Ext.getCmp("ciuAlias").setValue("");
					Ext.getCmp('ciuAlias').setDisabled(false);
					Ext.getCmp("egressRate").setValue("");
					Ext.getCmp('egressRate').setDisabled(false);
				}
				}catch(e){
					console.log("error<<<<<<<<<<<<<<<<<< >>>>>> "+e);
					Ext.getCmp("traficControlProfile").setValue("");
					Ext.getCmp("schedulerMapForMultiVRF").setValue("");
					//Ext.getCmp("endPointServiceType").setValue("TML3");
					//Ext.getCmp('endPointServiceType').setDisabled(false);
					Ext.getCmp("ciuName").setValue("");
					Ext.getCmp('ciuName').setDisabled(false);
					Ext.getCmp("ciuAlias").setValue("");
					Ext.getCmp('ciuAlias').setDisabled(false);
					Ext.getCmp("egressRate").setValue("");
					Ext.getCmp('egressRate').setDisabled(false);
					}
				
			}
		});
	},
getSoftwareVersion: function(deviceId) {
//deviceId = 11337875;
    var vendor = 'Juniper';
    var inventoryType = 'system-information';
    var systemInfo_OsVersion_XPath = "/system-information/os-version";
    var osVersion = "";

    this.getNodeList(deviceId, vendor, inventoryType, systemInfo_OsVersion_XPath, function(results){            
        osVersion = results["os-version"];
		Ext.getCmp("softwareVersion").setValue(osVersion);
        console.log("Value of 'osVersion': " + osVersion);
    });
},

/**
 * This function used to return the inventory in Stringified JSON format Based on device ID,
 * vendor type, inventory Type, XPath
 * param deviceid - Id of the device
 * param vendor - Default to Juniper
 * param inventoryType -the inventorytype  is the string value from the following DeviceInventoryXMLType enum.
 * INTERFACES("interface-information"),
 * CONFIGURATION ("configuration"),
 * SOFTWARE_INVENTORY("software-inventory"),
 * HARDWARE_INVENTORY ("chassis-inventory"),
 * SYSTEM_INVENTORY ("system-information"),
 * LICENSE_INVENTORY ("license-inventory"),
 * DEVICE ("device") 
 * param xpath - the xpath to apply
 * For configuration, use Xpath starting with "/device/configuration"
 * For hardware inventory, use Xpath starting with "/device/chassis-inventory"
 * For system inventory, use Xpath starting with "/system-information"
 */
getNodeList: function(deviceId, vendor, inventoryType, xpath, callbackFunction) {
    
    var result = null;
    
    Ext.Ajax.request({
    	method:'GET',
    	url:'/serviceui/resteasy/cpp-utilities/activator/nodeList',
    	waitMsg:'Loading',
    	scope:this,			
    	params: {"deviceId": deviceId, "vendor": vendor, "inventoryType":inventoryType, "xpath":xpath},
    	callback: function(options, success, response) {
    	
    	  result = Ext.decode(response.responseText);
    	   
    	   if(success == true) {
        		// IMPORTANT NOTE: The AJAX call is asynchronous, so the code execution proceeds back to the caller before this AJAX request completes.
        		// Any attempts to return the result of the call in a synchronous fashion results in the returned value being "Undefined".
        		// To get around this, we need to use a callback function, and embed any downstream business logic that uses the 'result' of the AJAX call
        		// within that callback function.
    			callbackFunction(result);
    	   }
    	   else {
        	   //console.log("TEST1");
                Ext.Msg.alert("Action Failure","No data from server : "+ result.msg);
    	   }
    	}
    });
    
    //return result;
},
onRowEditingForIPv4Prefix: function(editor, e, eOpts) {
	var ip = Ext.getCmp("prefixList").getValue();
  this.validateIPAddressAndMask(ip);
},
onRowEditingForIPv4PrefixTelusSupplier: function(editor, e, eOpts) {
	var ip = Ext.getCmp("prefixListTelusSupplier").getValue();
  this.validateIPAddressAndMask(ip);
},
onRowEditingForIPv6Prefix: function(editor, e, eOpts) {
	var ip = Ext.getCmp("prefixList").getValue();
  this.validateIPAddressAndMask(ip);
},
onRowEditingEdit: function(editor, e, eOpts) {
	console.log(">>>>>>>>>>>>>>>>>>>>>>>>");
		var ip = Ext.getCmp("destPrefixVal").getValue();
		var nextHop = Ext.getCmp("nextHopVal").getValue();
		this.validateIPAddressAndMask(ip);
		this.validateIP(nextHop);
},
	validateIPAddressAndMask: function(ip) {
	
	try{
	
	var subnetMask = ip.substring(ip.lastIndexOf('/')+1,ip.length);
	var ip1 = ip.split(".")[0];
	var ip2 = ip.split(".")[1];
	var ip3 = ip.split(".")[2];
	var ip4 = ip.split(".")[3];
	var ip4Address = ip4.split("/")[0];
	var Mask = ip4.split("/")[1];
	
	console.log("ip1 : "+ip1);
	console.log("ip2 : "+ip2);
	console.log("ip3 : "+ip3);
	console.log("ip4Address : "+ip4Address);
	console.log("Mask : "+Mask);
	console.log("subnetMask > "+subnetMask);
	
	if(ip !='' && ip != null && ip.split(".").length == 4 && (parseInt(ip1) > 0 && parseInt(ip1) < 256 && !isNaN(ip1) && parseInt(ip2) >= 0 && parseInt(ip2) < 256 && !isNaN(ip2) && parseInt(ip3) >= 0 && parseInt(ip3) < 256 && !isNaN(ip3) &&  ip4.contains("/") && parseInt(ip4Address) >= 0 && parseInt(ip4Address) < 256 && !isNaN(ip4Address) && !isNaN(subnetMask) && parseInt(subnetMask) > 0 && parseInt(subnetMask) < 33 )  ){

		//return  true;
	} else {
		//Ext.getCmp('destPrefixVal').focus(true,10);
		 Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Error: valid value is xxx.xxx.xxx.xxx/xx");
		//Ext.getCmp('destPrefixVal').focus(true, 200);
		//return;
	}
	}catch(e){
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Error: valid value is xxx.xxx.xxx.xxx/xx");
	}
	},
	validateIP: function(ip) {
	
	try{
	//var ip = Ext.getCmp("nextHopVal").getValue();
	var subnetMask = ip.substring(ip.lastIndexOf('/')+1,ip.length);
	var ip1 = ip.split(".")[0];
	var ip2 = ip.split(".")[1];
	var ip3 = ip.split(".")[2];
	var ip4 = ip.split(".")[3];
	
	console.log("ip1> : "+ip1);
	console.log("ip2> : "+ip2);
	console.log("ip3> : "+ip3);
	console.log("ip4Address> : "+ip4);
	
	if(ip !='' && ip != null && ip.split(".").length == 4 && (parseInt(ip1) > 0 && parseInt(ip1) < 256 && !isNaN(ip1) && parseInt(ip2) >= 0 && parseInt(ip2) < 256 && !isNaN(ip2) && parseInt(ip3) >= 0 && parseInt(ip3) < 256 && !isNaN(ip3) && parseInt(ip4) >= 0 && parseInt(ip4) < 256 && !isNaN(ip4))  ){

		//return  true;
	} else {
		//Ext.getCmp('destPrefixVal').focus(true,10);
		 Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Error: valid value is xxx.xxx.xxx.xxx/xx");
		//Ext.getCmp('destPrefixVal').focus(true, 200);
		//return;
	}
	}catch(e){
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Error: valid value is xxx.xxx.xxx.xxx/xx");
	}
	}
});