/*
***************************************************
   DEVICE-TURNUP GUI SCRIPT

      > Support: Bhanu Singh
      > Company: Juniper Networks
      > Contact: bhanus@juniper.net
      > Version: 1.0            
      > Revision Date: 2014-08-25
      
      [Copyright 2009-2014 Juniper Networks, Inc.]
      [All rights reserved.]      
      
***************************************************
*/

Ext.ns("Jx.cpp.service");
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

    height: 730,
	maxHeight: 1800,
    hidden: false,
    width: 960,
    autoScroll: true,
	
	
	manageHeight: true,
	//overflowX: 'auto',
	//overflowY: 'auto',
	//bodyStyle: 'fontFamily:Calibri;fontSize:25px;background:#FF0000;',
	
    title: 'L3VPN Service',
	FIELDSET_BACKGROUND_COLOR:'background-color:#F8F8F8',
	FIELDSET_WHITE_COLOR:'background-color:#FFFFFF',
	site: '', port: '', encapsulation: '',moid: '',
	CIUName: '',
	firstUnitForVRF: '',
	isPortValid: false,
	TRAFIC_CONTROL_PROFILE: '',
	isCCI: false,
	MAX_SUBNET_MASK:32,
	MIN_SUBNET_MASK:24,
	DEFAULT_SUBNET_MASK:30,
	STEP:1,	

   initComponent: function() {
         var me = this;
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
					//bodyStyle: 'fontFamily:Calibri,fontSize:11px',
					//bodyStyle: 'fontFamily:Calibri;fontSize:25px;background:#FF0000;',
					 height: 680,
					  //maxHeight: 1000,
                          //width: 960,
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            height: 201,
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
                                    height: 200,
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
											margin: '0 0 0 0',
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
															me.getInterfaceDescription(selectedPort);
															Ext.ComponentQuery.query('#endpointPanel')[0].show();
														}
													}
													var cust = Ext.getCmp('customerId').getValue();
													console.log("cust*  "+cust);
													me.searchCustomer(cust);
													
	
												}
											  }
											}
                                        },
										{
											xtype: 'button',
											text: 'Fetch Details',
											name: 'searchBtn',
											
											id: 'searchBtn',
											tooltip: 'Fetch Customer Details',
											//icon: '../serviceuicommon/images/cpp/Settings_16x16.png',
											//width: 20,
											//margin: '0 0 0 0',
											margin: -2,
											
											handler: function(button, event) {
												var cust = Ext.getCmp('customerId').getValue();
												console.log("cust888 "+cust);
												var siteInterfaceGrid =  Ext.getCmp("siteInterfaceGrid").getSelectionModel().getSelection()[0];
													if(siteInterfaceGrid != undefined){
													var selectedPort = siteInterfaceGrid.data.portName;
													
													if(selectedPort != '' && selectedPort != null){
															me.getInterfaceDescription(selectedPort);
															Ext.ComponentQuery.query('#endpointPanel')[0].show();
														}
													}
												me.searchCustomer(cust);
											}
										},
										{
                                            xtype: 'textfield',
                                            flex: 1,
                                            maxHeight: 25,
											maxWidth: 255,
											width: 255,
											name: 'customerName',
											id: 'customerName',
											fieldLabel: '<font color="#808080">Name</font>',
											fieldStyle: 'color:#808080',
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
                                            fieldLabel: '<font color="#808080">Email</font>',
											fieldStyle: 'color:#808080',
											labelWidth: 60,
											maxHeight: 25,
											name: 'email',
											id: 'email',
											readOnly: true,
											//disabled: true,
											margin: '5 0 0 0',
											hidden: true
                                        },
                                        {
                                            xtype: 'textareafield',
                                            flex: 1,
                                            height: 65,
											maxWidth: 255,
											width: 255,
                                            fieldLabel: '<font color="#808080">Description</font>',
											fieldStyle: 'color:#808080',
											name: 'customerDescription',
											id: 'customerDescription',
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
                                    height: 200,
									minWidth: 300,
                                    margin: '0 10 0 0',
                                    title: 'Service Details',
									style: this.FIELDSET_BACKGROUND_COLOR,
									layout: 'column',
									/*layout: {
										type: 'table',
										columns: 2
									},
                                    /*layout: {
                                        type: 'vbox',
                                        align: 'stretch',
                                        pack: 'center'
                                    },*/
                                    items: [
									   {
										xtype: 'hiddenfield',
										name: 'seId',
										//colspan:1
										}, 
										{
										 xtype: 'hiddenfield',
										 name: 'vendorType',
										 //colspan:1
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
										vtype:'AlphaUnderscore',
										name:'name',
										//colspan:1,
										listeners:{
											afterrender:function(comp,eOpts){
												 this.up('window').scriptUtils.createDefaultServiceOrderName(comp);
												}
											}
										},
										{
                                            xtype: 'numberfield',
                                            flex: 1,
                                            fieldLabel: '<b>Service ID</b>',
											name: 'serviceId',
											id: 'serviceId',
											margin: '0 100 0 0',
											//colspan:1,
											allowBlank: false,
											width: 220,
											labelWidth: 95,
                                            maxValue: 389999,
                                            minValue: 380000,
											hideTrigger: true,
											keyNavEnabled: false,
											mouseWheelEnabled: false
                                        },
										{
											xtype:'label',
											text: "Service ID must be in the range 380000 to 389999",
											name: 'lblServiceId',
											id: 'lblServiceId',
											margin: '3 0 0 0',
											//colspan:2,
											labelStyle: 'font-weight:bold;font-color:grey;background-color:#F8F8F8;font-size 6px',
											style : {
												//background : 'blue',
												color : 'grey'
												//font-size:13px
												//font: normal 6px
											}
										 },
										{
                                            xtype: 'combobox',
                                            flex: 1,
                                            fieldLabel: 'Policy Group',
											name: 'policyGroup',
											margin: '3 0 0 0',
											id: 'policyGroup',
											labelAlign: 'left',
											width: 220,
											labelWidth: 95,
											value: 'Standard',
											store: ['Standard','TQ Standard','BVoIP','CNS3']
                                        },
										{
											xtype: 'combobox',
											margin: '3 0 0 0',
											width: 220,
											labelWidth: 95,
											//labelAlign: 'right',
											emptyText:'Pick an Option',
											fieldLabel: '<b>Service Type</b>',
											name: 'endPointServiceType',
											id: 'endPointServiceType',
											//store: ['TML3', 'CML3'],
											store: ['TML3'],
											listeners: {
														render: function (field) {
														console.log("render");
															Ext.getCmp('endPointServiceType').setValue("TML3");
														},
														load: function () {
														console.log("load");
															//this sets the default value to USA after the store loads
															var combo = Ext.getCmp('endPointServiceType');
															combo.setValue("TML3");
														},
														'change':function(list,record) {
															var serviceType = Ext.getCmp('endPointServiceType').getValue();
															var ciuLoopback = Ext.getCmp('ciuLoopback');
															var loopbackSubnetMask = Ext.getCmp('loopbackSubnetMask');
															if(serviceType =='CML3'){
																me.setFieldDisabled("ciuName",true);	
																me.setFieldDisabled("ciuAlias",true);	
																me.setFieldDisabled("management",false);
																ciuLoopback.reset();															
															}else{
																
																me.setFieldDisabled("ciuLoopback",false);
																me.setFieldDisabled("loopbackSubnetMask",false);	
																me.setFieldDisabled("ciuName",false);	
																me.setFieldDisabled("ciuAlias",false);
																me.setFieldDisabled("management",true);																
															}													
														}
													}
										},
										{
                                            xtype: 'textfield',
                                            flex: 1,
                                            fieldLabel: '<b>VPN Alias</b>',
											margin: '7 90 0 0',
											width: 270,
											labelWidth: 95,
											maxHeight: 23,
											height: 23,
											allowBlank: false,
											name: 'vpnAlias',
											maxLength:20,											
											id: 'vpnAlias',
											maskRe:/^[A-Za-z0-9 _-]/
                                        },
										/*{
                                            xtype: 'combobox',
                                            flex: 1,
                                            fieldLabel: '<b>Topology</b>',
											labelWidth: 95,
											margin: '2 100 0 0',
											labelAlign: 'left',
											value: 'Full Mesh',
											//colspan:1,
											name: 'topology',
											id: 'topology',
											store: ['Full Mesh', 'Hub & Spoke'],
											listeners: {
														'change':function(list,record) {
														
														var topology = Ext.getCmp('topology').getValue();
														var endPointType = Ext.getCmp('endPointType');
														var values = [];
														var siteInterfaceCount = Ext.ComponentQuery.query('gridpanel[name=siteInterfaceGrid]')[0].getStore().count();
														if(topology == 'Full Mesh'){
															me.setFieldDisabled('rt',false);
															me.setFieldDisabled('rtHub',true);
														    me.setFieldDisabled('rtSpoke',true);
															Ext.getCmp('endPointType').store.removeAll();
															var records = [];
															records.push({"displayText":"Full Mesh", "valueText":"Full Mesh"});
															Ext.getCmp('endPointType').store.getProxy().data=records;
															Ext.getCmp('endPointType').store.loadData=records;
															Ext.getCmp('endPointType').store.reload();
															
															me.setFieldDisabled('endPointType',true);
															endPointType.emptyText = 'Select..';
															endPointType.applyEmptyText();
														    values.push(' ');
															values.push('Full Mesh');
															values.push('Select..');
															endPointType.setValue(values);
															if(siteInterfaceCount > 0){
																Ext.ComponentQuery.query('#endpointPanel')[0].show();
															
																	//Ext.getCmp('optionPanelGrid').getSelectionModel().select(0);
																	Ext.getCmp('accessOptionGrid').show();
																
															}else{
																Ext.ComponentQuery.query('#endpointPanel')[0].hide();
															}
														}else if(topology.indexOf('Hub') !=-1){ //Hub & spoke
														    me.setFieldDisabled('rtHub',false);
														    me.setFieldDisabled('rtSpoke',false);
															me.setFieldDisabled('rt',true);
															Ext.getCmp('endPointType').store.removeAll();
															var records = [];
															records.push({"displayText":"Hub", "valueText":"Hub"});
															records.push({"displayText":"Spoke", "valueText":"Spoke"});
															Ext.getCmp('endPointType').store.getProxy().data=records;
															Ext.getCmp('endPointType').store.loadData=records;
															Ext.getCmp('endPointType').store.reload();
														me.setFieldDisabled('endPointType',false);
														
														
														//endPointType.reset();
														Ext.ComponentQuery.query('#endpointPanel')[0].hide();
															
															//Ext.getCmp('siteInterfaceGrid').reset();
															//Ext.getCmp("siteInterfaceGrid").getSelectionModel().clearSelections();
														}
														
														
													
														}
													}
                                        },*/
										
										/*{
                                            xtype: 'textfield',
                                            flex: 1,
                                            fieldLabel: '<b>VRF Name</b>',
											margin: '7 100 0 0',
											labelWidth: 95,
											maxHeight: 23,
											height: 23,
											allowBlank: false,
											name: 'vpnName',
											maxLength:20,											
											id: 'vpnName',
											maskRe:/^[A-Za-z0-9 _-]/
                                        },*/
										{
                                            xtype: 'checkboxfield',
                                            id: 'enforceRoute',
											name: 'enforceRoute',
											margin: '7 10 0 0',
											labelAlign: 'left',
											//colspan:1,
                                            //margin: '10 0 0 0',
											//width: 130,
											//maxWidth: 130,
											labelWidth: 120,
											
                                            fieldLabel: 'Enforce Max  Routes',
                                            boxLabel: '',
											handler: function (field, value) {
												scope: this,
												this.checkValue = field.getValue();
												console.log(this.checkValue);
												if (this.checkValue == true) {
													Ext.getCmp("maxRoute").show();
													me.setFieldDisabled("maxRoute",false);
													Ext.getCmp("maxRoute").setValue("1000");											
												}
												else if (this.checkValue == false) {
													me.setFieldDisabled("maxRoute",true);
													Ext.getCmp("maxRoute").setValue("");													
												}
											}
                                        },
										{
                                            xtype: 'numberfield',
                                            margin: '7 0 0 0',
                                            maxWidth: 60,
                                            width: 60,
											//colspan:1,
											name: 'maxRoute',
											id: 'maxRoute',
											disabled: true,
											align: 'left',
											minValue: 1,
											maxValue: 1000
									    },
                                        
										
										/*{
                                            xtype: 'textfield',
                                            width: 85,
                                            fieldLabel: 'RD',
											labelAlign: 'left',
											margin: '7 0 0 0',
											value: '852:',
											readOnly: true,
											labelAlign: 'right',
											fieldStyle: 'text-align:right',
                                            labelWidth: 30,
											name: 'peerAsRd',
											id: 'peerAsRd'
											
                                        },
                                        {
                                            xtype: 'numberfield',
                                            margin: '7 0 0 0',
                                            width: 70,
											labelWidth: 0,
                                            fieldLabel: '',
                                            labelAlign: 'right',
											name: 'rd',
											id: 'rd',
											minValue: 0,
											hideTrigger: true,
											keyNavEnabled: false,
											mouseWheelEnabled: false
                                        },*/
										{
                                            xtype: 'combobox',
                                            flex: 1,
                                            fieldLabel: 'Application Type',
											name: 'application',
											margin: '7 90 0 0',
											value: 'GEN',
											id: 'application',
											width: 220,
											labelWidth: 95,
											//colspan:1,
											store: ['GEN']
											//store: ['GEN','UniCaaS']
                                        }
										,
										{
											xtype: 'checkboxfield',
											fieldLabel: 'Flow Sampling',
											boxLabel: '',
											name: 'flowSampling',
											id: 'flowSampling',
											labelWidth: 100,
											hidden: true
										},
                                        {
                                            xtype: 'checkboxfield',
                                            fieldLabel: 'Redistribute Connected Routes',
											//colspan:2,
											boxLabel: '',
											labelWidth: 120,
											labelAlign: 'left',
											hidden: true,
											name: 'redistConnRoutes',
											id: 'redistConnRoutes'
                                        }
                                    ]
                                },
								{
                                    xtype: 'fieldset',
                                    flex: 1,
                                    height: 200,
                                     //width: 300,
									//maxWidth: 300,
									//minWidth: 250,
                                    title: 'Topology',
									style: this.FIELDSET_BACKGROUND_COLOR,
                                    layout: 'column',
                                    items: [
										{
											xtype: 'combobox',
											flex: 1,
											fieldLabel: '',
											labelSeparator: ' ',
											width: 115,
											margin: '2 100 0 0',
											labelAlign: 'left',
											value: 'Mesh',
											//colspan:1,
											name: 'topology',
											id: 'topology',
											store: ['Mesh', 'Hub' , 'Spoke'],
											listeners: {
												'change':function(list,record) {
												
													var topology = Ext.getCmp('topology').getValue();
													var endPointType = Ext.getCmp('endPointType');
													var values = [];
													var siteInterfaceCount = Ext.ComponentQuery.query('gridpanel[name=siteInterfaceGrid]')[0].getStore().count();
													if(topology == 'Mesh'){
														Ext.getCmp("vpnName").setFieldLabel("VRF Name");
														Ext.getCmp("AsRd").setFieldLabel("RD/RT");
														Ext.getCmp("spkVrfName").hide();
														Ext.getCmp("AsRdSpk").hide();
														Ext.getCmp("spkRd").hide();
														Ext.getCmp("spkVrfId").hide();
														Ext.getCmp("spkVrfName").setDisabled(true);
														Ext.getCmp("AsRdSpk").setDisabled(true);
														Ext.getCmp("spkRd").setDisabled(true);
														Ext.getCmp("spkVrfId").setDisabled(true);
													}if(topology == 'Hub'){
														Ext.getCmp("vpnName").setFieldLabel("Hub VRF Name");
														Ext.getCmp("AsRd").setFieldLabel("Hub RD/RT");
														Ext.getCmp("spkVrfName").show();
														Ext.getCmp("AsRdSpk").show();
														Ext.getCmp("spkRd").show();
														Ext.getCmp("spkVrfId").show();
														Ext.getCmp("spkVrfName").setDisabled(false);
														Ext.getCmp("AsRdSpk").setDisabled(false);
														Ext.getCmp("spkRd").setDisabled(false);
														Ext.getCmp("spkVrfId").setDisabled(false);
													}if(topology == 'Spoke'){
														Ext.getCmp("vpnName").setFieldLabel("Hub VRF Name/ID");
														Ext.getCmp("AsRd").setFieldLabel("Hub RD/RT");
														Ext.getCmp("spkVrfName").show();
														Ext.getCmp("AsRdSpk").show();
														Ext.getCmp("spkRd").show();
														Ext.getCmp("spkVrfId").hide();
														Ext.getCmp("spkVrfName").setDisabled(false);
														Ext.getCmp("AsRdSpk").setDisabled(false);
														Ext.getCmp("spkRd").setDisabled(false);
														Ext.getCmp("spkVrfId").setDisabled(true);
														
													}
												
												
											
												}
											}
										},
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: '<b>VRF Name</b>',
											margin: '5 100 0 0',
											width: 258,
											labelWidth: 105,
											maxHeight: 23,
											height: 23,
											allowBlank: false,
											labelAlign: 'left',
											name: 'vpnName',
											maxLength:20,											
											id: 'vpnName',
											maskRe:/^[A-Za-z0-9 _-]/
										},
										{
											xtype: 'textfield',
											width: 150,
											fieldLabel: 'RD/RT',
											labelAlign: 'left',
											margin: '7 0 0 0',
											value: '',
											//readOnly: true,
											fieldStyle: 'text-align:right',
											labelWidth: 105,
											name: 'AsRd',
											id: 'AsRd'
											
										},
										{
											xtype: 'numberfield',
											margin: '7 0 0 0',
											width: 70,
											labelWidth: 0,
											fieldLabel: '',
											labelAlign: 'right',
											name: 'rd',
											id: 'rd',
											minValue: 0,
											hideTrigger: true,
											keyNavEnabled: false,
											mouseWheelEnabled: false
										},
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: 'Spoke VRF Name',
											margin: '9 100 0 0',
											width: 220,
											labelWidth: 105,
											maxHeight: 23,
											height: 23,
											allowBlank: false,
											labelAlign: 'left',
											name: 'spkVrfName',
											id: 'spkVrfName',
											disabled: true,
											maxLength:20,
											maskRe:/^[A-Za-z0-9 _-]/,
											hidden: true
										},
										{
											xtype: 'textfield',
											width: 150,
											fieldLabel: 'Spoke RD/RT',
											labelAlign: 'left',
											margin: '7 0 0 0',
											value: '',
											//readOnly: true,
											fieldStyle: 'text-align:right',
											labelWidth: 105,
											name: 'AsRdSpk',
											id: 'AsRdSpk',
											hidden: true
											
										},
										{
											xtype: 'numberfield',
											margin: '7 0 0 0',
											width: 70,
											labelWidth: 0,
											fieldLabel: '',
											labelAlign: 'right',
											name: 'spkRd',
											id: 'spkRd',
											minValue: 0,
											hideTrigger: true,
											keyNavEnabled: false,
											mouseWheelEnabled: false,
											hidden: true
										},
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: 'Spoke Service ID',
											margin: '9 100 0 0',
											width: 220,
											labelWidth: 105,
											maxHeight: 23,
											height: 23,
											allowBlank: false,
											labelAlign: 'left',
											name: 'spkVrfId',
											id: 'spkVrfId',
											disabled: true,
											maxLength:20,
											maskRe:/^[A-Za-z0-9 _-]/,
											hidden: true
										}
									]
                                      
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            height: 220,
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
                                    height: 220,
                                    maxHeight: 300,
                                    maxWidth: 240,
                                    width: 240,
                                    title: 'Select Node',
									style: this.FIELDSET_BACKGROUND_COLOR,
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            height: 45,
                                            fieldLabel: '',
                                            items: [
                                              
												{
                                                    xtype: 'combobox',
                                                    margin: '5 0 0 0',
                                                    fieldLabel: 'Site',
													emptyText:'Select a site',
													name: 'siteName',
													id: 'siteName',
                                                    labelWidth: 65,
													selectOnFocus: true,
													forceSelection: true,
													//allowBlank: false,
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
													
                                                },
												{
													xtype: 'textfield',
													flex: 1,
													fieldLabel: '<font color="#808080">Software Version</font>',
													fieldStyle: 'color:#808080',
													margin: '5 0 0 0',
													name: 'softwareVersion',
													id: 'softwareVersion',
													labelWidth: 100,
													readOnly: true,
													//disabled: true,
													allowBlank: true,
													minLength:1
												},
												{
													xtype: 'textfield',
													flex: 1,
													fieldLabel: '<font color="#808080">Node Type</font>',
													fieldStyle: 'color:#808080',
													margin: '5 0 0 0',
													name: 'nodeType',
													id: 'nodeType',
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
                                    height: 220,
                                    maxHeight: 300,
                                    maxWidth: 240,
                                    width: 240,
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
												    width: 220,
													labelWidth: 100,
													fieldLabel: '<b>Connection Type</b>',
													allowBlank: false,
													name: 'connectionType',
													id: 'connectionType',
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
																 
																 if(newValue == 'RE Direct'){
																	pathPreference.setValue("Primary");
																	me.setFieldDisabled("pathPreferences",true);	
																 }else{
																	me.setFieldDisabled("pathPreferences",false);	
																 }
																}
															}
												},
												{
													xtype: 'combobox',
													width: 220,
													labelWidth: 100,
													fieldLabel: 'Access Type',
													name: 'accessType',
													id: 'accessType',
													value: 'HS',
													//store: ['HS', 'DSL'] 
													store: ['HS'] 
												},
												{
													xtype: 'combobox',
													width: 220,
													labelWidth: 100,
													fieldLabel: '<b>Path Preference</b>',
													name: 'pathPreferences',
													id: 'pathPreferences',
													value: 'Primary',
													maxLength:15,
													store: ['Primary', 'Secondary'] 
												},
												/*{
													xtype: 'combobox',
													flex: 1,
													width: 220,
													fieldLabel: '<b>QoS Type</b>',
													labelWidth: 100,
													labelAlign: 'left',
													name: 'qosType',
													id: 'qosType',
													value: 'QoS per Access',
													store: ['QoS per Access', 'QoS per VPN'],
													listeners: {
																 change: function(field, newValue, oldValue) {
																 console.log("connection type********: "+newValue);
																 
																 var pathPreference = Ext.getCmp("pathPreferences");
																 
																 if(newValue == 'QoS per VPN'){
																	Ext.getCmp("vpnSpeed").setDisabled(false);
																 }else{
																	Ext.getCmp("vpnSpeed").setDisabled(true);
																 }
																}
															}
												},
												{
                                                    xtype: 'combobox',
                                                    fieldLabel: '<b>Endpoint Type</b>',
													emptyText:'Select..',
													name: 'endPointType',
													id: 'endPointType',
													width: 220,
													maxWidth: 220,
                                                    labelWidth: 100,
													selectOnFocus: true,
													forceSelection: true,
													allowBlank: false,
													typeAhead: true,
													disabled: true,
													minChars: 1,
													value: 'Full Mesh',
													store: this.getEndPointType(),
													queryMode: 'local',
													editable: true,
													displayField: 'displayText',
													valueField: 'valueText',
													listeners: {
														 change:   function(field, newValue, oldValue) {
														 var endpointPanel = Ext.ComponentQuery.query('#endpointPanel')[0];
														 var siteInterfaceCount = Ext.ComponentQuery.query('gridpanel[name=siteInterfaceGrid]')[0].getStore().count();
														console.log('endPointType .... '+newValue);
														if(newValue == 'Full Mesh'){
															Ext.getCmp('rt').show();
															Ext.getCmp('rtHub').hide();
															Ext.getCmp('rtSpoke').hide();
														}else{
															Ext.getCmp('rt').hide();
															Ext.getCmp('rtHub').show();
															Ext.getCmp('rtSpoke').show();
														}
														if(newValue ==''){
															endpointPanel.hide();
														}
														else{
															 this.isCCI=true;
															 var siteInterfaceGrid =  Ext.getCmp("siteInterfaceGrid").getSelectionModel().getSelection()[0];
															if(siteInterfaceGrid != undefined){
																Ext.ComponentQuery.query('#endpointPanel')[0].show();
																	endpointPanel.show();
																	}else{
																		endpointPanel.hide();
																}
															Ext.getCmp('accessOptionGrid').show();
															  
															  var stageBtn = Ext.getCmp('stageBtn');
															  stageBtn.show();
														  }
														}
													}
													
                                                },*/
												{
													xtype: 'combobox',
													flex: 1,
													width: 220,
													maxWidth: 220,
													fieldLabel: 'Operational Mode',
													labelSeparator: ' ',
													labelWidth: 100,
													labelAlign: 'left',
													name: 'operationalMode',
													id: 'operationalMode',
													store: this.getOperatioanlMode(),
													queryMode: 'local',
													editable: true,
													displayField: 'displayText',
													valueField: 'valueText',
													listeners: {
														render: function (field) {
														console.log("render");
															Ext.getCmp('operationalMode').setValue("Pending");
														},
														load: function () {
														console.log("load");
															var combo = Ext.getCmp('operationalMode');
															combo.setValue("Pending");
														}
													}
													
												},
												{
                                                    xtype: 'combobox',
                                                    fieldLabel: 'Admin State',
													margin: '10 0 0 0',
                                                    boxLabel: '',
													name: 'adminState',
													id: 'adminState',
													value: 'Down',
													width: 180,
													labelWidth: 100,
													store: [['Up','Up'],['Down','Down']],
												},
												{
													xtype: 'checkboxfield',
													fieldLabel: 'Accounting',
												    boxLabel: '',
													width: 90,
													labelAlign: 'left',
													name: 'accounting',
													id: 'accounting',
													labelWidth: 100,
												},
												{
                                                    xtype: 'checkboxfield',
                                                    fieldLabel: 'Auto Negotiate',
													margin: '10 0 0 0',
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
                                    xtype: 'fieldset',
                                    flex: 1,
                                    margins: '0 5 0 0',
                                    height: 220,
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
                                            height: 220,
                                            width: 370,
                                            fieldLabel: '',
                                            items: [
                                               
												{
                                                    xtype: 'gridpanel',
                                                    height: 150,
													width: 350,
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
                                                            text: 'SiteId',
															flex:1	
                                                        },
														{
                                                            xtype: 'gridcolumn',
                                                            maxWidth: 80,
                                                            width: 80,
															hidden: true,
                                                            sortable: true,
                                                            dataIndex: 'deviceName',
                                                            text: 'Site',
															flex:1	
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            maxWidth: 80,
                                                            sortable: true,
                                                            dataIndex: 'portName',
                                                            text: 'Port',
															flex:1	
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
                                                            text: 'Op Status',
															flex:1	
                                                        },
														{
                                                            xtype: 'gridcolumn',
                                                            width: 40,
                                                            sortable: true,
                                                            dataIndex: 'speed',
                                                            text: 'Speed',
															flex:1	
                                                        }
                                                    ],
													listeners: {
															/*itemclick: function(dv, record, item, index, e) {
															 var selectedRec = dv.getSelectionModel().getSelected();          
															 console.log(selectedRec.get('deviceName')); //Will display text of name column of selected record
															},*/
																itemclick: function(dv, record, item, index, e) {
																	console.log("item****************  "+item.cells[0]);
																	//this.isPortValid = false;
																	var customerId = Ext.getCmp("customerId").getValue();
																	this.CIUName='';
																	if(customerId == '' || customerId == null){
																		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please select the custoemr first");
																		return;
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
																
																	me.getSelectedSite(record);
																	//me.setFieldDisabled('endPointType',false);
																	me.getInterfaceDescription(record.get('portName'));
																	
																	var topology = Ext.getCmp('topology').getValue();
																		//alert("topology> "+topology);
																	//var endPointType = Ext.getCmp('endPointType');
																
																
																	/*
																	if(topology == 'Full Mesh' && endPointType.getValue() =='Full Mesh') {
																        me.setFieldDisabled('endPointType',true);
																		endPointType.emptyText = 'Select..';
																		endPointType.applyEmptyText();
																		var endpointPanel = Ext.ComponentQuery.query('#endpointPanel')[0];
																		endpointPanel.show();
																		
																		
																		//Ext.getCmp('optionPanelGrid').getSelectionModel().select(0);
																		Ext.getCmp('accessOptionGrid').show();
																	}
																	else if(topology == 'Hub & Spoke'  && endPointType.getValue() != null) {
																		me.setFieldDisabled('endPointType',false);
																		endPointType.emptyText = 'Select..';
																		endPointType.applyEmptyText();
																		var endpointPanel = Ext.ComponentQuery.query('#endpointPanel')[0];
																		endpointPanel.show();
																		
																		
																		//Ext.getCmp('optionPanelGrid').getSelectionModel().select(0);
																		Ext.getCmp('accessOptionGrid').show();
																		
																	}else if(topology == null) {
																		me.setFieldDisabled('endPointType',true);
																	}
																	else{
																		me.setFieldDisabled('endPointType',false);
																	}*/														
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
													fieldLabel: 'Description',
													labelWidth: 60,
													height: 70,
													width: 350,
													readOnly: true,
													name: 'lblInterfaceDescription',
													id: 'lblInterfaceDescription',
													margin: '0 0 0 0',
													fieldStyle: {
													 //'fontFamily'   : 'Garamond',
													 'fontFamily'   : 'Calibri',
													 'fontSize'     : '11px'
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
                                }
							]
                        },
						{
                            xtype: 'panel',
                            dock: 'top',
                            height: 590,
							width: 900,
							id: 'endpointPanel',
                            animCollapse: true,
                            collapsed: false,
                            collapsible: true,
							//hidden: true,
                            title: 'Endpoint Details',
							style: this.FIELDSET_BACKGROUND_COLOR,
                            items: [
									{
									xtype: 'container',
                                    flex: 1,
									height: 640,
									width: 900,
									style: this.FIELDSET_BACKGROUND_COLOR,
                                    items: [
									{
                                    xtype: 'panel',
									animCollapse: true,
									collapsed: false,
									collapsible: true,
                                    height: 100,
                                    width: 900,
									layout: 'column',
                                    
                                    title: 'Access Options',
									id: 'accessOptionGrid',
                                    itemId: 'accessOptionGrid',
									//hidden: true,
									style: this.FIELDSET_BACKGROUND_COLOR,
                                    items: [
										
										{
                                            xtype: 'numberfield',
                                            margin: '5 10 0 10',
                                            width: 140,
											labelWidth: 40,
                                            fieldLabel: '<b>CSID</b>',
											labelAlign: 'left',
											name: 'csId',
											id: 'csId',
											maxLength:7,
											minValue: 1,
											allowBlank: false,
                                            enforceMaxLength: true,
											hideTrigger: true,
											keyNavEnabled: false,
											mouseWheelEnabled: false,

											maskRe:/^[0-9]///,
											//colspan:1
                                        },
										{
                                            xtype: 'numberfield',
                                            margin: '5 2 0 0',
                                            width: 110,
											labelWidth: 40,
                                            fieldLabel: '<b>VLAN</b>',
											name: 'vlanId',
											id: 'vlanId',
                                            labelAlign: 'left',
											minValue: 1,
											maxValue: 4096,
											//colspan:1,
											hideTrigger: true,
											keyNavEnabled: false,
											mouseWheelEnabled: false,
                                           allowBlank: false,
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
											tooltip: 'Validate Vlan',
											//colspan:1,
											handler: function(button, event) {
												var vlanId = Ext.getCmp('vlanId').getValue();
												console.log("vlanId "+vlanId);
												me.validateVLAN(vlanId);
											}
										},
                                        {
                                            xtype: 'textfield',
                                            margin: '5 10 0 0',
                                            width: 230,
											maxWidth: 230,
                                            fieldLabel: '<b>IPv4 Address/Mask</b>',
											labelWidth: 115,
											//colspan:1,
                                            name: 'ipAddress',
											id: 'ipAddress',
											allowBlank: false,
											vtype:'IPAddress',
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
                                            xtype: 'label',
                                            margin: '6 4 0 0',
											width: 3,
											maxWidth: 3,
                                            text: '/'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            margin: '5 10 0 0',
                                            width: 30,
											maxWidth: 30,
                                            labelSeparator: ' ',
                                            name: 'subnetMask',
											id: 'subnetMask',
											allowBlank: false,
											value: '30',
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
                                            margin: '5 50 10 0',
                                            width: 142,
											fieldLabel: 'IP MTU',
                                            labelWidth: 43,
											labelAlign: 'right',
											name: 'ipMTU',
											id: 'ipMTU',
											store: ['1500', '3000'] 
                                        },
										{
											xtype: 'checkboxfield',
											fieldLabel: 'IPv6 Peer',
											margin: '5 10 0 10',
											labelWidth: 60,
											labelAlign: 'left',
											boxLabel: '',
											name: 'IPv6Peer',
											id: 'ipv6Peer',
											scope: this,
											disabled: true,
											
											handler: function (field, value) {
												scope: this,
												this.checkValue = field.getValue();
												console.log(this.checkValue);
												if (this.checkValue == true) {
													//Ext.getCmp("ipv6NeighAddress").show();
													Ext.getCmp("ipv6Address").show();
													Ext.getCmp("nextHOP").show();
												}
												else if (this.checkValue == false) {
													//Ext.getCmp("ipv6NeighAddress").hide();
													Ext.getCmp("ipv6Address").hide();
													Ext.getCmp("nextHOP").hide();
												}
											}
											
                                        },
										{
                                            xtype: 'textfield',
                                            margin: '5 0 0 0',
											//colspan:3,
                                            width: 430,
											maxWidth: 430,
											labelWidth: 150,
                                            fieldLabel: 'RE IPv6 Address/Mask',
											labelAlign: 'right',
											name: 'ipv6Address',
											id: 'ipv6Address',
											 enforceMaxLength: true,
											hidden: true
											
                                        },
										
										{
											xtype: 'hiddenfield',
											name: 'index',
											id: 'index'				
										}
										
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    height: 100,
                                    width: 900,
									layout: 'column',
                                     /*layout: {
										type: 'table',
										columns: 5
									},*/
                                    title: 'BGP Options',
									id: 'bgpOptionGrid',
                                    itemId: 'bgpOptionGrid',
									 animCollapse: true,
									collapsed: false,
									collapsible: true,
									//hidden: true,
									style: this.FIELDSET_BACKGROUND_COLOR,
                                    items: [
										{
                                            xtype: 'numberfield',
                                            margin: '5 10 0 10',
                                            width: 120,
                                            fieldLabel: '<b>Peer AS</b>',
											labelAlign: 'left',
                                            labelWidth: 55,
											name: 'peerAS',
											id: 'peerAS',
											allowBlank: false,
											//value: '65001',
											minValue: 64512,
											maxValue: 65534,
											hideTrigger: true,
											keyNavEnabled: false,
											mouseWheelEnabled: false,
											
											listeners: {
											
												
											}
                                        },
                                        /*{
                                            xtype: 'textfield',
                                            margin: '5 10 0 0',
                                            maxWidth: 130,
                                            width: 130,
											labelWidth: 70,
											//colspan:2,
											labelAlign: 'right',
											allowBlank: false,
											name: 'rt',
											id: 'rt',
                                            fieldLabel: '<b>RT(Mesh)</b>'
											//hidden: true,
											//disabled:true
                                        },
										{
                                            xtype: 'textfield',
                                            margin: '5 10 0 0',
                                            maxWidth: 130,
                                            width: 130,
											labelWidth: 70,
											//colspan:2,
											labelAlign: 'right',
											allowBlank: false,
											name: 'rtHub',
											id: 'rtHub',
                                            fieldLabel: '<b>RT(Hub)</b>',
											hidden: true,
											disabled:true
                                        },
										{
                                            xtype: 'textfield',
                                            margin: '5 0 0 0',
                                            maxWidth: 130,
                                            width: 130,
											labelWidth: 70,
											labelAlign: 'right',
											allowBlank: false,
											name: 'rtSpoke',
											id: 'rtSpoke',
                                            fieldLabel: '<b>RT(Spoke)</b>',
											hidden: true,
											disabled:true
                                        },*/
                                        {	
                                            xtype: 'numberfield',
                                            margin: '5 10 0 0',
                                            width: 150,
                                            fieldLabel: '<b>Local Pref</b>',
											allowBlank: false,
                                            labelAlign: 'right',
                                            labelWidth: 80,
											name: 'localPref',
											value: '120',
											id: 'localPref',
											hideTrigger: true,
											keyNavEnabled: false,
											mouseWheelEnabled: false
                                        },
                                        {
                                            xtype: 'numberfield',
                                            margin: '5 10 0 10',
                                            width: 95,
                                            fieldLabel: '<b>MED</b>',
                                            labelAlign: 'left',
                                            labelWidth: 30,
											value: '80',
											name: 'med',
											id: 'med',
											hideTrigger: true,
											keyNavEnabled: false,
											mouseWheelEnabled: false
                                        },
										{
                                            xtype: 'textfield',
                                            margin: '5 10 0 10',
                                            width: 215,
											maxWidth: 215,
                                            fieldLabel: '<b>IPv4 Neighbour</b>',
											labelWidth: 90,
                                            name: 'neighbourAddress',
											id: 'neighbourAddress',
											allowBlank: false,
											vtype:'IPAddress'
                                        },
										{
                                            xtype: 'textfield',
                                            margin: '5 0 0 0',
                                            width: 310,
											maxWidth: 310,
                                            fieldLabel: '<b>CIU IPv6 Address</b>',
											labelWidth: 100,
                                            name: 'nextHOP', 
											id: 'nextHOP',
											hidden: true											
										}
                                        
                                    ]
                                },
								{      xtype: 'panel',
										layout: 'column',
										id: 'mvpnOptionGrid',
                                        itemId: 'mvpnOptionGrid',
										title: 'Multicast Options',
										animCollapse: true,
										collapsed: true,
										collapsible: true,
										height: 150,
										width: 900,
										//disabled: true,
										//hidden: true,
										items: [
											{
												xtype: 'fieldset',
												width: 900,
												height: 180,
												maxHeight: 180,
												checkboxToggle: true,
												collapsible: true,
												collapsed: true,
												name: 'mvpn',
												id: 'mvpn',
												layout: 'column',
												disabled: true,
												//hidden: true,
												title: 'Multicast Option',
												items: [
													{
														xtype: 'combobox',
														anchor: '100%',
														margin: '5 10 0 0',
														maxWidth: 210,
														width: 200,
														labelWidth: 115,
														fieldLabel: 'Sender Site Allowed',
														labelAlign: 'right',
														name: 'senderSite',
														id: 'senderSite',
														store: ['Yes', 'No'] 
													},
													{
														xtype: 'textfield',
														//anchor: '100%',
														margin: '5 10 0 0',
														maxWidth: 330,
														width: 330,
														labelWidth: 200,
														fieldLabel: 'SSM Group Range IP Address/Mask',
														labelAlign: 'right',
														name: 'ssmIP',
														id: 'ssmIP',
														style: 'font-size 8px'
													},
													{
														 xtype: 'numberfield',
														//anchor: '100%',
														margin: '5 0 0 0',
														maxWidth: 60,
														width: 60,
														fieldLabel: '/',
														name: 'ssmIpMask',
														id: 'ssmIpMask',
														labelSeparator: ' ',
														labelWidth: 2
													},
													{
														xtype: 'combobox',
														anchor: '100%',
														margin: '10 10 0 0',
														fieldLabel: 'Rendezvous Point(RP) Type',
														maxWidth: 260,
														width: 260,
														labelWidth: 155,
														labelAlign: 'right',
														name: 'rpType',
														id: 'rpType',
														style: 'font-size 8px',
														store: ['Static', 'Local'] 
													},
													{
														xtype: 'textfield',
														//anchor: '100%',
														fieldLabel: 'RP Address',
														labelAlign: 'left',
														margin: '10 10 0 0',
														maxWidth: 180,
														width: 180,
														labelWidth: 75,
														name: 'rpAddress',
														id: 'rpAddress'
													},
													{
														xtype: 'textfield',
														//anchor: '100%',
														fieldLabel: 'RP Group Range',
														margin: '10 0 0 0',
														maxWidth: 200,
														width: 200,
														labelWidth: 105,
														labelAlign: 'left',
														name: 'rpGprRange',
														id: 'rpGprRange'
													}
												]
											}
											
										]
								},
								{
                                    xtype: 'panel',
                                    layout: 'table',
                                    //title: 'CIU Options',
									title: 'CIU Management',
									id: 'ciuOptionGrid',
                                    itemId: 'ciuOptionGrid',
									//hidden: true,
									animCollapse: true,
									collapsed: false,
									collapsible: true,
									layout: 'column',
                                    height: 100,
                                    width: 900,
									style: this.FIELDSET_BACKGROUND_COLOR,
                                    items: [
										{
                                            xtype: 'textfield',
                                            margin: '5 10 0 10',
                                            width: 210,
											//maxWidth: 130,
                                            fieldLabel: '<b>CIU Loopback</b>',
											labelWidth: 85,
                                            name: 'ciuLoopback',
											id: 'ciuLoopback',
											allowBlank: false,
											vtype: 'IPAddress'
									   },
										{
                                            xtype: 'label',
                                            margin: '5 4 0 0',
											width: 2,
											maxWidth: 4,
                                            text: '/',
											hidden: true
                                        },
										{
                                            xtype: 'numberfield',
                                            margin: '5 10 0 0',
                                            width: 30,
											maxWidth: 30,
                                            labelSeparator: ' ',
											//fieldLabel: '/',
                                            name: 'loopbackSubnetMask',
											id: 'loopbackSubnetMask',
											allowBlank: false,
											allowDecimals: false,
											hideTrigger: true,
											keyNavEnabled: false,
											mouseWheelEnabled: false,
											step:this.STEP,
											minValue:this.MIN_SUBNET_MASK,
											maxValue:32,
											value:32,
											hidden: true
                                        },
										{
                                            xtype: 'textfield',
                                            xtype: 'textfield',
                                            margin: '5 10 0 0',
                                            width: 250,
											labelWidth: 65,
                                            fieldLabel: '<b>CIU Name</b>',
											labelAlign: 'right',
											name: 'ciuName',
											id: 'ciuName',
											maxLength: 26,
											allowBlank: false,
											enableKeyEvents: true,
											//maskRe:/^[a-zA-Z0-9!@#\$%\^\*+=._-]/,
											maskRe:/^[A-Za-z0-9-]/,
											//vtype: 'AlphaUnderscore',
											listeners: {
											keydown : function(form, e){
											console.log("key code: "+e.keyCode);
											
												if (e.keyCode == 33) {
												return false;	
													//me.validateVLAN();
												}
											  }
										}
                                        },
										{
                                            xtype: 'textfield',
                                            margin: '5 50 0 0',
                                            width: 250,
											labelWidth: 65,
											maxLength: 26,
                                            fieldLabel: 'CIU Alias',
											labelAlign: 'right',
											name: 'ciuAlias',
											id: 'ciuAlias',
											maskRe:/^[A-Za-z0-9 :_-]/
                                        },
										
										{
                                            xtype: 'checkboxfield',
                                            id: 'management',
											name: 'management',
                                            margin: '10 10 0 10',
											width: 110,
											maxWidth: 110,
											labelWidth: 80,
											disabled: true,
                                            fieldLabel: 'Management',
                                            boxLabel: '',
											handler: function (field, value) {
												scope: this,
												this.checkValue = field.getValue();
												console.log(this.checkValue);
												if (this.checkValue == true) {
													Ext.getCmp("managementVPLS").show();
													Ext.getCmp("managementVLAN").show();
												}
												else if (this.checkValue == false) {
													Ext.getCmp("managementVPLS").hide();
													Ext.getCmp("managementVLAN").hide();													
												}
											}
                                        },
										{
                                            xtype: 'textfield',
                                            margin: '10 10 0 0',
                                            width: 230,
											labelWidth: 125,
                                            fieldLabel: 'Management VPLS',
											labelAlign: 'right',
											name: 'managementVPLS',
											id: 'managementVPLS',
											hidden:true
                                        },
										{
                                            xtype: 'numberfield',
                                            margin: '10 0 0 0',
                                            width: 200,
											labelWidth: 125,
                                            fieldLabel: 'Management VLAN',
											name: 'managementVLAN',
											id: 'managementVLAN',
											labelAlign: 'right',
											hideTrigger: true,
											keyNavEnabled: false,
											mouseWheelEnabled: false,
											hidden:true
                                        }
										 
                                       
									]
								},
                                {
                                    xtype: 'panel',
                                   animCollapse: true,
									collapsed: false,
									collapsible: true,
                                    height: 110,
                                    width: 900,
									animCollapse: true,
									collapsed: false,
									collapsible: true,
                                    layout: 'column',
									/*layout: {
										type: 'table',
										columns: 7
									},*/
                                    title: 'QoS Options',
									id: 'qosOptionGrid',
                                    itemId: 'qosOptionGrid',
									//hidden: true,
									style: this.FIELDSET_BACKGROUND_COLOR,
                                    items: [
                                        {
											xtype: 'combobox',
											flex: 1,
											width: 190,
											fieldLabel: '<b>QoS Type</b>',
											labelWidth: 60,
											margin: '5 10 0 10',
											labelAlign: 'left',
											name: 'qosType',
											id: 'qosType',
											value: 'QoS per Access',
											store: ['QoS per Access', 'QoS per VPN'],
											listeners: {
														 change: function(field, newValue, oldValue) {
														 console.log("connection type********: "+newValue);
														 
														 var pathPreference = Ext.getCmp("pathPreferences");
														 
														 if(newValue == 'QoS per VPN'){
															Ext.getCmp("vpnSpeed").setDisabled(false);
														 }else{
															Ext.getCmp("vpnSpeed").setDisabled(true);
														 }
													}
												}
										},
										{
                                            xtype: 'combobox',
                                            //margin: '0 20 0 0',
											margin: '5 10 0 10',
                                            maxWidth: 160,
                                            width: 160,
                                            fieldLabel: '<b>Access Rate</b>',
                                            labelWidth: 80,
											store: this.getAccessRate(),
											queryMode: 'local',
											displayField: 'displayText',
											valueField: 'valueText',
											name: 'accessRate',
											id: 'accessRate',
											allowBlank: false,
											listeners: {
														 change: function(field, newValue, oldValue) {
														
														    var accessRate = Ext.getCmp('accessRate').getValue();
															var efRate = Ext.getCmp('efRate').getValue();
															 if(efRate != null){
															var efRateK = efRate.split("|")[0].split("K")[0];
															var accessRateK = accessRate.split("K")[0];
															var efRateM = efRate.split("|")[0].split("M")[0];
															var accessRateM = accessRate.split("M")[0];
															
															//alert(efRate.split("|")[0].split("K")[0] > accessRate.split("K")[0]);
															if((accessRate != null && accessRate.indexOf("K") != -1 && efRate.indexOf("K")!= -1 && (parseInt(efRateK) > parseInt(accessRateK)))  || (accessRate != null && accessRate.indexOf("M")!= -1 && efRate.indexOf("M")!= -1 && (parseInt(efRateM) > parseInt(accessRateM))) || (accessRate != null && accessRate.indexOf("K")!= -1 && efRate.indexOf("M")!= -1)){
																 Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, " Please enter a valid EF Rate!");
																return;
															}
														}
														}
													}
                                        },
										{
                                            xtype: 'combobox',
                                            margin: '5 10 0 0',
                                            width: 145,
											labelWidth: 70,
                                            fieldLabel: 'VPN Speed',
											name: 'vpnSpeed',
											id: 'vpnSpeed',
											disabled:true,
											store: this.getAccessRate(),
											queryMode: 'local',
											displayField: 'displayText',
											valueField: 'valueText'
                                        },
										 {
                                            xtype: 'checkboxfield',
                                            id: 'efService',
											name: 'efService',
                                            margin: '5 10 0 0',
											width: 80,
											maxWidth: 80,
											labelWidth: 65,
                                            fieldLabel: 'EF Service',
                                            boxLabel: '',
											handler: function (field, value) {
												scope: this,
												this.checkValue = field.getValue();
												console.log(this.checkValue);
												if (this.checkValue == true) {
													
													me.setFieldDisabled("efRate",false);	
												}
												else if (this.checkValue == false) {
													me.setFieldDisabled("efRate",true);	
												}
											}
                                        },
										{
													xtype: 'combobox',
													//margin: '0 160 0 0',
													margin: '5 50 0 0',
													maxWidth: 170,
													width: 170,
													fieldLabel: 'EF Rate',
													labelWidth: 50,
													store: this.getEFRate(),
													disabled: true,
													queryMode: 'local',
													displayField: 'displayText',
													valueField: 'valueText',
													name: 'efRate',
													id: 'efRate',
													listeners: {
														 change: function(field, newValue, oldValue) {
														  
														    var accessRate = Ext.getCmp('accessRate').getValue();
															var efRate = Ext.getCmp('efRate').getValue();
															if(efRate != null){
															var efRateK = efRate.split("|")[0].split("K")[0];
															var accessRateK = accessRate.split("K")[0];
															var efRateM = efRate.split("|")[0].split("M")[0];
															var accessRateM = accessRate.split("M")[0];
															
															//alert(efRate.split("|")[0].split("K")[0] > accessRate.split("K")[0]);
															if((accessRate != null && accessRate.indexOf("K")!= -1 && efRate.indexOf("K") != -1 && (parseInt(efRateK) > parseInt(accessRateK)))  || (accessRate != null && accessRate.indexOf("M") != -1 && efRate.indexOf("M") != -1 && (parseInt(efRateM) > parseInt(accessRateM))) || (accessRate != null && accessRate.indexOf("K") != -1 && efRate.indexOf("M") != -1)){
																 Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, " Please enter a valid EF Rate!");
																return;
															}
														}
														}
													}
										},
										{
                                            xtype: 'checkboxfield',
                                            id: 'beService',
											name: 'beService',
                                            margin: '5 333 11 10',
											//colspan:4,
											width: 80,
											maxWidth: 80,
											labelWidth: 65,
                                            fieldLabel: 'BE Service',
                                            boxLabel: '',
											disabled: true,
											hidden: true,
											handler: function (field, value) {
												/*scope: this,
												this.checkValue = field.getValue();
												console.log(this.checkValue);
												if (this.checkValue == true) {
													
													me.setFieldDisabled("efRate",false);	
												}
												else if (this.checkValue == false) {
													me.setFieldDisabled("efRate",true);	
												}*/
											}
                                        },
										{
                                            xtype: 'combobox',
                                            //margin: '0 20 0 0',
											margin: '15 10 0 10',
                                            maxWidth: 190,
                                            width: 190,
                                            fieldLabel: '<b>Classifier</b>',
                                            labelWidth: 60,
											store: this.getClassifier(),
											queryMode: 'local',
											displayField: 'displayText',
											valueField: 'valueText',
											name: 'classifier',
											id: 'classifier',
											listeners: {
														 change: function(field, newValue, oldValue) {
														 console.log("selected classifier* "+newValue);
														 if(newValue == 'v2-802.1ad'){
															me.setFieldDisabled("beService",false);	
																Ext.getCmp("beService").setValue(true);
															}
														else{
															me.setFieldDisabled("beService",true);
															Ext.getCmp("beService").setValue(false);															
															}	
														}
													}
												
                                        },
										{
                                            xtype: 'checkboxfield',
                                            id: 'isAllAFSelected',
											name: 'isAllAFSelected',
                                            margin: '15 20 0 10',
											width: 130,
											labelWidth: 111,
											fieldLabel: '<b>AF3%/AF2%/AF1%</b>',
                                            boxLabel: '',
											scope: this,
												handler: function (field, value) {
													scope: this,
													this.checkValue = field.getValue();
													console.log(this.checkValue);
													if (this.checkValue == true) {
													 Ext.getCmp("af1").setValue("");
													 Ext.getCmp("af2").setValue("");
													 Ext.getCmp("af3").setValue("");
													 me.setFieldDisabled('af1',false);
													 me.setFieldDisabled('af2',false);
													 me.setFieldDisabled('af3',false);
												     me.setFieldDisabled('isAF1Selected',true);
												     me.setFieldDisabled('isAF2Selected',true);
													 me.setFieldDisabled('isAF3Selected',true);
													 Ext.getCmp("isAF1Selected").setValue(true);
													 Ext.getCmp("isAF2Selected").setValue(true);
													 Ext.getCmp("isAF3Selected").setValue(true);
													 

													}
													else if (this.checkValue == false) {
													 me.setFieldDisabled('af1',true);
													 me.setFieldDisabled('af2',true);
													 me.setFieldDisabled('af3',true);
													 me.setFieldDisabled('isAF1Selected',false);
												     me.setFieldDisabled('isAF2Selected',false);
													 me.setFieldDisabled('isAF3Selected',false);
													 
													 Ext.getCmp("isAF1Selected").setValue(false);
													 Ext.getCmp("isAF2Selected").setValue(false);
													 Ext.getCmp("isAF3Selected").setValue(false);
													}
												}
                                        },
										{
                                            xtype: 'numberfield',
                                            margin: '15 5 0 0',
                                            width: 50,
                                            fieldLabel: '',//AF3%
											labelSeparator: ' ',
											decimalPrecision:0,
                                            //labelWidth: 40,
											name: 'af3',
											id: 'af3',
											disabled: true,
											maxValue: 100,
                                            minValue: 1
                                        },
										{
                                            xtype: 'checkboxfield',
                                            id: 'isAF3Selected',
											name: 'isAF3Selected',
                                            margin: '15 10 10 0',
											width: 25,
											labelWidth: 15,
                                            
                                            boxLabel: '',
											scope: this,
											handler: function (field, value) {
												scope: this,
												this.checkValue = field.getValue();
												console.log(this.checkValue);
												var isAllAFSelected = Ext.getCmp("isAllAFSelected").getValue();
												if (this.checkValue == true & isAllAFSelected == false) {
												 Ext.getCmp("af3").setValue("100");
												 Ext.getCmp("af2").setValue("0");
												 Ext.getCmp("af1").setValue("0");
												 me.setFieldDisabled('af1',true);
												 me.setFieldDisabled('af2',true);
												 me.setFieldDisabled('af3',true);
												 
												 me.setFieldDisabled('isAF1Selected',true);
												 me.setFieldDisabled('isAF2Selected',true);
													 
												 //var isAllAFSelected = Ext.getCmp("isAllAFSelected").getValue();
												 
												 Ext.getCmp("isAF1Selected").setValue(false);
												 Ext.getCmp("isAF2Selected").setValue(false);
												
											 }
												else if (this.checkValue == false & isAllAFSelected != false) {
												 Ext.getCmp("af3").setValue("");
												 Ext.getCmp("af2").setValue("");
												 Ext.getCmp("af1").setValue("");
												 me.setFieldDisabled('af1',false);
												 me.setFieldDisabled('af2',false);
												 me.setFieldDisabled('af3',true);
												}
												else if (this.checkValue == false && isAllAFSelected == false) {
												 Ext.getCmp("af3").setValue("");
												 Ext.getCmp("af2").setValue("");
												 Ext.getCmp("af1").setValue("");
												 me.setFieldDisabled('af3',true);
												 me.setFieldDisabled('isAF1Selected',false);
												 me.setFieldDisabled('isAF2Selected',false);
												}
											}
                                        },
                                        {
                                            xtype: 'numberfield',
                                            margin: '15 5 0 0',
                                            width: 50,
                                            fieldLabel: '',//AF2%
											labelSeparator: ' ',
											decimalPrecision:0,
                                            //labelWidth: 40,
											name: 'af2',
											id: 'af2',
											disabled: true,
											maxValue: 100,
                                            minValue: 1
                                        },
										{
                                            xtype: 'checkboxfield',
                                            id: 'isAF2Selected',
											name: 'isAF2Selected',
                                            margin: '15 5 0 0',
											width: 25,
											labelWidth: 15,
                                            
                                            boxLabel: '',
											scope: this,
											handler: function (field, value) {
												scope: this,
												this.checkValue = field.getValue();
												console.log(this.checkValue);
												var isAllAFSelected = Ext.getCmp("isAllAFSelected").getValue();
												if (this.checkValue == true & isAllAFSelected == false) {
												     Ext.getCmp("af2").setValue("100");
													 Ext.getCmp("af1").setValue("0");
												     Ext.getCmp("af3").setValue("0");
													 me.setFieldDisabled('af1',true);
													 me.setFieldDisabled('af2',true);
													 me.setFieldDisabled('af3',true);
													 me.setFieldDisabled('isAF1Selected',true);
												     me.setFieldDisabled('isAF3Selected',true);
													 //var isAllAFSelected = Ext.getCmp("isAllAFSelected").getValue();
													
														 Ext.getCmp("isAF1Selected").setValue(false);
														 Ext.getCmp("isAF3Selected").setValue(false);
													 
												}
												else if (this.checkValue == false & isAllAFSelected != false) {
												     Ext.getCmp("af2").setValue("");
													 Ext.getCmp("af1").setValue("");
												     Ext.getCmp("af3").setValue("");
													 me.setFieldDisabled('af2',true);
													 me.setFieldDisabled('af3',false);
												}
												else if (this.checkValue == false && isAllAFSelected == false) {
												 Ext.getCmp("af2").setValue("");
												 Ext.getCmp("af1").setValue("");
												 Ext.getCmp("af3").setValue("");
												 me.setFieldDisabled('af2',true);
												 me.setFieldDisabled('isAF1Selected',false);
												 me.setFieldDisabled('isAF3Selected',false);
												}
											}
                                        },
										{
                                            xtype: 'numberfield',
                                            margin: '15 5 0 0',
                                            width: 50,
                                            fieldLabel: '',//AF1%
											labelSeparator: ' ',
                                            //labelWidth: 40,
											decimalPrecision:0,
											name: 'af1',
											id: 'af1',
											disabled: true,
											maxValue: 100,
                                            minValue: 1
                                        },
										{
                                            xtype: 'checkboxfield',
                                            id: 'isAF1Selected',
											name: 'isAF1Selected',
                                            margin: '15 0 10 0',
											width: 25,
											labelWidth: 15,
                                            
                                            boxLabel: '',
											scope: this,
											handler: function (field, value) {
												scope: this,
												this.checkValue = field.getValue();
												console.log(this.checkValue);
												var isAllAFSelected = Ext.getCmp("isAllAFSelected").getValue();
												if (this.checkValue == true & isAllAFSelected == false) {
												 Ext.getCmp("af1").setValue("100");
												 Ext.getCmp("af2").setValue("0");
												 Ext.getCmp("af3").setValue("0");
												 me.setFieldDisabled('af1',true);
												 me.setFieldDisabled('af2',true);
												 me.setFieldDisabled('af3',true);
												 me.setFieldDisabled('isAF2Selected',true);
												 me.setFieldDisabled('isAF3Selected',true);
												 
												 Ext.getCmp("isAF2Selected").setValue(false);
												 Ext.getCmp("isAF3Selected").setValue(false);
												
												}
												else if (this.checkValue == false & isAllAFSelected != false) {
												 Ext.getCmp("af1").setValue("");
												 Ext.getCmp("af2").setValue("");
												 Ext.getCmp("af3").setValue("");
												 me.setFieldDisabled('af1',true);
												 me.setFieldDisabled('af2',false);
												 me.setFieldDisabled('af3',false); 
												 Ext.getCmp("isAF1Selected").setValue(false);
												}
												else if (this.checkValue == false && isAllAFSelected == false) {
												 Ext.getCmp("af1").setValue("");
												 Ext.getCmp("af2").setValue("");
												 Ext.getCmp("af3").setValue("");
												 me.setFieldDisabled('af1',true);
												 me.setFieldDisabled('isAF2Selected',false);
												 me.setFieldDisabled('isAF3Selected',false);
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
									width: 100,
									id: 'clearAddSiteInterfacePanelButton',
									text: 'Reset',
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
                            title: 'Staged Interface Details',
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
													plugins:[Ext.create('Ext.ux.grid.JxFilterRow', {
														remoteFilter:false,
														
													})],
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
															text: 'IP Address',
															//align: 'center',
															//editable: true,
															dataIndex: 'ipAddress'
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
                                                            text: 'CIU Name',
                                                            align: 'center',
                                                            dataIndex: 'ciuName'
                                                        },
														{
                                                            xtype: 'gridcolumn',
                                                            text: 'CIU Alias',
                                                            align: 'center',
                                                            dataIndex: 'ciuAlias'
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
															//maxWidth: 70,
															align: 'center',
															sortable: true,
															dataIndex: 'endPointServiceType',
															text: 'Service Type'
														},
														{
                                                            xtype: 'gridcolumn',
                                                            text: 'CIU LB',
                                                            align: 'center',
                                                            dataIndex: 'ciuLoopback',
                                                            hidden: true
                                                        },
														{
                                                            xtype: 'gridcolumn',
                                                            text: 'Access Type',
                                                            align: 'center',
                                                            dataIndex: 'accessType'
                                                        },
														{
                                                            xtype: 'gridcolumn',
                                                            text: 'Conn. Type',
                                                            align: 'center',
                                                            dataIndex: 'connectionType',
                                                            hidden: true
                                                        },
														{
															xtype: 'gridcolumn',
															editable: true,
															maxWidth: 160,
															sortable: true,
															editable: true,
															align: 'center',
															dataIndex: 'vlanId',
															hidden: true,
															text: 'VLAN',
															width: 50
                                                            
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
															sortable: true,
															align: 'left',
															dataIndex: 'accessRate',
															text: 'Access Rate',
															hidden: true
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															align: 'center',
															dataIndex: 'efRate',
															text: 'EF Rate',
															hidden: true,
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															align: 'center',
															dataIndex: 'efService',
															text: 'EF Service',
															hidden: true
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															align: 'center',
															dataIndex: 'beService',
															text: 'BE Service',
															hidden: true
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															align: 'center',
															dataIndex: 'isAllAFSelected',
															text: '',
															hidden: true
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															align: 'center',
															dataIndex: 'isAF1Selected',
															text: '',
															hidden: true
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															align: 'center',
															dataIndex: 'isAF2Selected',
															hidden: true
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															align: 'center',
															dataIndex: 'isAF3Selected',
															hidden: true
														},
														{
                                                            xtype: 'gridcolumn',
                                                            text: 'EF1',
                                                            align: 'center',
                                                            dataIndex: 'ef1',
                                                            hidden: true,
															width: 0
                                                        },
														{
                                                            xtype: 'gridcolumn',
                                                            text: 'EF2',
                                                            align: 'center',
                                                            dataIndex: 'ef2',
                                                            hidden: true,
															width: 0
                                                        },
														{
                                                            xtype: 'gridcolumn',
                                                            text: 'EF3',
                                                            align: 'center',
                                                            dataIndex: 'ef3',
                                                            hidden: true,
															width: 0
                                                        },
														{
                                                            xtype: 'gridcolumn',
                                                            text: 'Classifier',
                                                            align: 'center',
                                                            dataIndex: 'classifier',
                                                            hidden: true,
															width: 0
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
															text: 'loopbackSubnetMask',
															dataIndex: 'loopbackSubnetMask',
															hidden: true,
															width: 0
														},
														{
															xtype: 'gridcolumn',
															text: 'RD',
															dataIndex: 'rd',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR
														},
														{
															xtype: 'gridcolumn',
															dataIndex: 'spkVrfName',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR
														},
														{
															xtype: 'gridcolumn',
															dataIndex: 'spkRd',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR
														},
														{
															xtype: 'gridcolumn',
															dataIndex: 'spkVrfId',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR
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
															text: 'Sender Site',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'senderSite'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: 'SSM IP',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'ssmIP'
														},
														
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: 'SSM IP Mask',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'ssmIpMask'
														}
														,
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: 'RP Type',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'rpType'
														}
														,
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: 'RP Address',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'rpAddress'
														}
														,
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: 'RP Range',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'rpGprRange'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: 'CSID',
															hidden: true,
															//style: this.FIELDSET_WHITE_COLOR,
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
															text: 'Topology',
															dataIndex: 'topology',
															hidden: true,
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: 'RT(Mesh)',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'rt'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: 'RT(Hub)',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'rtHub'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: 'RT(Spoke)',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'rtSpoke'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: 'End Point',
															hidden: true,
															//style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'endPointType'
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
															dataIndex: 'nextHOP'
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
															sortable: true,
															text: '',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'qosType'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: '',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'vpnName'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: '',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'vpnAlias'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: '',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'policyGroup'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: '',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'vpnRate'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: '',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'AsRd'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: '',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'AsRdSpk'
														}
														
														
													],
													listeners: {
															itemdblclick: function(dv, record, item, index, e) {
															console.log("selected row1 : "+index);
															console.log(">>>   : "+record.get('topology'));
															Ext.getCmp("endpointPanel").setDisabled(false);
															Ext.getCmp('spkVrfId').setDisabled(false);
															Ext.getCmp('spkVrfName').setDisabled(false);
															Ext.getCmp('siteName').setDisabled(false);
															Ext.getCmp("endpointPanel").setDisabled(false);
															Ext.getCmp('csId').setDisabled(false);
															Ext.getCmp('vlanId').setDisabled(false);
															Ext.getCmp('ipAddress').setDisabled(false);
															Ext.getCmp('peerAS').setDisabled(false);
															Ext.getCmp('neighbourAddress').setDisabled(false);
															Ext.getCmp('ciuLoopback').setDisabled(false);
															Ext.getCmp('ciuName').setDisabled(false);
															Ext.getCmp('accessRate').setDisabled(false);
															var endpointPanel = Ext.ComponentQuery.query('#endpointPanel')[0];
															endpointPanel.show();
															this.isCCI=true;
															var updateBtn = Ext.getCmp('updateBtn');
															updateBtn.show();
															
															var interfacegrid = Ext.ComponentQuery.query('gridpanel[name=siteInterfaceGrid]')[0];
															interfacegrid.setDisabled(true);
															//me.setFieldDisabled('siteInterface',true);
															var stageBtn = Ext.getCmp('stageBtn');
															
															
															var clearInactiveEntriesFromListButton = Ext.getCmp('clearInactiveEntriesFromListButton');
															clearInactiveEntriesFromListButton.hide();
															
																
															var autonegotiate =Ext.getCmp("autonegotiate").setValue(record.get('autonegotiate'));	
															var adminState =Ext.getCmp("adminState").setValue(record.get('adminState'));
															var multiVRF =Ext.getCmp("multiVRF").setValue(record.get('multiVRF'));
															var firstUnitForVRF =Ext.getCmp("firstUnitForVRF").setValue(record.get('firstUnitForVRF'));
															var traficControlProfile =Ext.getCmp("traficControlProfile").setValue(record.get('traficControlProfile'));
															
															var qosType =Ext.getCmp("qosType").setValue(record.get('qosType'));
															
															var nextHOP =Ext.getCmp("nextHOP").setValue(record.get('nextHOP'));
															var endPointServiceType =Ext.getCmp("endPointServiceType").setValue(record.get('endPointServiceType'));
															Ext.getCmp("ciuLoopback").setValue(record.get('ciuLoopback'));
															var ciuName =Ext.getCmp("ciuName").setValue(record.get('ciuName'));
															var ciuAlias =Ext.getCmp("ciuAlias").setValue(record.get('ciuAlias'));
															var accessType =Ext.getCmp("accessType").setValue(record.get('accessType'));
															var connectionType =Ext.getCmp("connectionType").setValue(record.get('connectionType'));
															var csId =Ext.getCmp("csId").setValue(record.get('csId'));
															var pathPreferences =Ext.getCmp("pathPreferences").setValue(record.get('pathPreferences'));
															var vlanId =Ext.getCmp("vlanId").setValue(record.get('vlanId'));
															var ipAddress =Ext.getCmp("ipAddress").setValue(record.get('ipAddress'));
															var subnetMask =Ext.getCmp("subnetMask").setValue(record.get('subnetMask'));
															
															var loopbackSubnetMask =Ext.getCmp("loopbackSubnetMask").setValue(record.get('loopbackSubnetMask'));
															
															var ipMTU =Ext.getCmp("ipMTU").setValue(record.get('ipMTU'));
															
															var ipv6Peer =Ext.getCmp("ipv6Peer").setValue(record.get('ipv6Peer'));
															var ipv6Address =Ext.getCmp("ipv6Address").setValue(record.get('ipv6Address'));
															
															console.log("ipv6Address .  "+ipv6Address);
															//var mvpn =  Ext.getCmp('mvpn').checkboxCmp.getValue();
															var rd =Ext.getCmp("rd").setValue(record.get('rd'));
															var neighbourAddress =Ext.getCmp("neighbourAddress").setValue(record.get('neighbourAddress'));
															var localPref =Ext.getCmp("localPref").setValue(record.get('localPref'));
															var med =Ext.getCmp("med").setValue(record.get('med'));
															var peerAS =Ext.getCmp("peerAS").setValue(record.get('peerAS'));
															//var rt =Ext.getCmp("rt").setValue(record.get('rt'));
															//var rtHub =Ext.getCmp("rtHub").setValue(record.get('rtHub'));
															//var rtSpoke =Ext.getCmp("rtSpoke").setValue(record.get('rtSpoke'));
															
															Ext.getCmp("spkVrfName").setValue(record.get('spkVrfName'));
															Ext.getCmp("AsRdSpk").setValue(record.get('AsRdSpk'));
															Ext.getCmp("AsRd").setValue(record.get('AsRd'));
															Ext.getCmp("spkRd").setValue(record.get('spkRd'));
															Ext.getCmp("spkVrfId").setValue(record.get('spkVrfId'));

															var accessRate =Ext.getCmp("accessRate").setValue(record.get('accessRate'));
															
															var topology = record.get('topology');
															Ext.getCmp("topology").setValue(topology);
															if(topology == 'Mesh'){
																Ext.getCmp("vpnName").setFieldLabel("VRF Name");
																Ext.getCmp("AsRd").setFieldLabel("RD/RT");
																Ext.getCmp("spkVrfName").hide();
																Ext.getCmp("AsRdSpk").hide();
																Ext.getCmp("spkRd").hide();
																Ext.getCmp("spkVrfId").hide();
																Ext.getCmp("spkVrfName").setDisabled(true);
																Ext.getCmp("AsRdSpk").setDisabled(true);
																Ext.getCmp("spkRd").setDisabled(true);
																Ext.getCmp("spkVrfId").setDisabled(true);
															}if(topology == 'Hub'){
																Ext.getCmp("vpnName").setFieldLabel("Hub VRF Name");
																Ext.getCmp("AsRd").setFieldLabel("Hub RD/RT");
																Ext.getCmp("spkVrfName").show();
																Ext.getCmp("AsRdSpk").show();
																Ext.getCmp("spkRd").show();
																Ext.getCmp("spkVrfId").show();
																Ext.getCmp("spkVrfName").setDisabled(false);
																Ext.getCmp("AsRdSpk").setDisabled(false);
																Ext.getCmp("spkRd").setDisabled(false);
																Ext.getCmp("spkVrfId").setDisabled(false);
															}if(topology == 'Spoke'){
																Ext.getCmp("vpnName").setFieldLabel("Hub VRF Name/ID");
																Ext.getCmp("AsRd").setFieldLabel("Hub RD/RT");
																Ext.getCmp("spkVrfName").show();
																Ext.getCmp("AsRdSpk").show();
																Ext.getCmp("spkRd").show();
																Ext.getCmp("spkVrfId").hide();
																Ext.getCmp("spkVrfName").setDisabled(false);
																Ext.getCmp("AsRdSpk").setDisabled(false);
																Ext.getCmp("spkRd").setDisabled(false);
																Ext.getCmp("spkVrfId").setDisabled(true);
														
													}
															
															
															var vpnName =Ext.getCmp("vpnName").setValue(record.get('vpnName'));
															var vpnAlias =Ext.getCmp("vpnAlias").setValue(record.get('vpnAlias'));
															var policyGroup =Ext.getCmp("policyGroup").setValue(record.get('policyGroup'));
															
															Ext.getCmp("spkVrfName").setValue(record.get('spkVrfName'));
															Ext.getCmp("spkRd").setValue(record.get('spkRd'));
															Ext.getCmp("spkVrfId").setValue(record.get('spkVrfId'));
															var vpnRate =Ext.getCmp("vpnSpeed").setValue(record.get('vpnRate'));
															
															var efRate =Ext.getCmp("efRate").setValue(record.get('efRate'));
															
															var efService =Ext.getCmp("efService").setValue(record.get('efService'));
															var beService =Ext.getCmp("beService").setValue(record.get('beService'));
															var classifier =Ext.getCmp("classifier").setValue(record.get('classifier'));
															
															var isAllAFSelected =Ext.getCmp("isAllAFSelected").setValue(record.get('isAllAFSelected'));
															var isAF1Selected =Ext.getCmp("isAF1Selected").setValue(record.get('isAF1Selected'));
															var isAF2Selected =Ext.getCmp("isAF2Selected").setValue(record.get('isAF2Selected'));
															var isAF3Selected =Ext.getCmp("isAF3Selected").setValue(record.get('isAF3Selected'));
															
															var af1 =Ext.getCmp("af1").setValue(record.get('af1'));
															var af2 =Ext.getCmp("af2").setValue(record.get('af2'));
															var af3 =Ext.getCmp("af3").setValue(record.get('af3'));
															
															var mvpn =Ext.getCmp("mvpn").checkboxCmp.setValue(record.get('mvpn'));
															var senderSite =Ext.getCmp("senderSite").setValue(record.get('senderSite'));
															var ssmIP =Ext.getCmp("ssmIP").setValue(record.get('ssmIP'));
															var ssmIpMask =Ext.getCmp("ssmIpMask").setValue(record.get('ssmIpMask'));
															var rpType =Ext.getCmp("rpType").setValue(record.get('rpType'));
															var rpAddress =Ext.getCmp("rpAddress").setValue(record.get('rpAddress'));
															var rpGprRange =Ext.getCmp("rpGprRange").setValue(record.get('rpGprRange'));
															
															console.log("rpGprRange .  "+rpGprRange);
															
														    stageBtn.hide();
															var selectedRowIndex = Ext.getCmp('index');
															selectedRowIndex.setValue(index);
															
															me.setFieldDisabled('siteName',true);
															me.setFieldDisabled('topology',true);
															Ext.ComponentQuery.query('#endpointPanel')[0].show();
														
															},
															 itemclick: function(dv, record, item, index, e) {
																console.log("selected row11 : "+index);
																var selectedRowIndex = Ext.getCmp('index');
																selectedRowIndex.setValue(index);
														
															}
															},
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
                                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'fieldcontainer',
                            dock: 'bottom',
                            height: 45,
                            width: 960,
                            fieldLabel: '',
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    margin: '0 40 0 0',
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
                                    text: '   Verify      ',
									handler: function(button, event) {
										var data = this.getDataJSON();
										this.scriptUtils.verifyForm(this,data);
	                                },
									scope: this
                                },
                                {
                                    xtype: 'button',
                                    margin: '0 40 0 0',
                                    maxHeight: 35,
                                    width: 80,
                                    text: 'Clear',
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
									handler: function(button, event) {
        	                                    me.close();
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
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
	   // Handler to populate 'siteGrid'.
    getSiteStore: function() {
        var siteStore = Ext.create('Ext.data.Store',{
            storeId: 'siteStore',
            
            fields: [
                {name: 'site'},
                {name: 'vendorType'},
                {name: 'os'},
                {name: 'plateform'},
                {name: 'mgmtIP'}
            ], 
            data: [
                /* TEST DATA */
                
                {
                    site: 'PE1',
                    vendorType: 'Juniper',
                    os: '14.1R1',
					plateform: 'MX80',
					mgmtIP: '192.168.1.1'
                    
                },
                {
                     site: 'PE2',
                    vendorType: 'Juniper',
                    os: '14.1R1',
					plateform: 'MX80',
					mgmtIP: '192.168.1.2'
                },
                {
                    site: 'PE3',
                    vendorType: 'Juniper',
                    os: '14.1R1',
					plateform: 'MX80',
					mgmtIP: '192.168.1.3'
                },
                {
                    site: 'PE4',
                    vendorType: 'Juniper',
                    os: '14.1R1',
					plateform: 'MX80',
					mgmtIP: '192.168.1.4'
                }
                
            ]
        });
        
        return siteStore;
    },

    getStagedInterfacesStore: function() {
        var stagedInterfacesStore = Ext.create('Ext.data.Store',{
            storeId: 'stagedInterfacesStore',
            fields: [
                {name: 'pedeviceId'},
				{name: 'site'},
                {name: 'Interface'},
                {name: 'endPointServiceType'},
                {name: 'ciuLoopback'},
				 {name: 'ciuName'},
				  {name: 'ciuAlias'},
				{name: 'accessType'},
				{name: 'connectionType'},
				{name: 'csId'},
				{name: 'pathPreferences'},
                {name: 'vlanId'},
                {name: 'ipAddress'},
				{name: 'subnetMask'},
				{name: 'loopbackSubnetMask'},
                {name: 'ipMTU'},
				{name: 'ipv6Peer'},
				{name: 'ipv6Address'},
				{name: 'AsRd'},
				{name: 'AsRdSpk'},
				{name: 'rd'},
				{name: 'spkRd'},
				{name: 'spkVrfName'},
				{name: 'spkVrfId'},
				{name: 'neighbourAddress'},
				{name: 'localPref'},
				{name: 'med'},
				{name: 'peerAS'},
				{name: 'accessRate'},
				{name: 'vpnName'},
				{name: 'vpnAlias'},
				{name: 'policyGroup'},
				{name: 'vpnRate'},
				{name: 'efService'},
				{name: 'isAllAFSelected'},
				{name: 'isAF1Selected'},
				{name: 'isAF2Selected'},
				{name: 'isAF3Selected'},
				{name: 'beService'},
				{name: 'classifier'},
				{name: 'efRate'},
				{name: 'af1'},
				{name: 'af2'},
				{name: 'af3'},
				
				{name: 'mvpn'},
				{name: 'senderSite'},
				{name: 'ssmIP'},
				{name: 'ssmIpMask'},
				{name: 'rpType'},
				{name: 'rpAddress'},
				{name: 'rpGprRange'},
				{name: 'topology'},
				//{name: 'rt'},
				//{name: 'rtHub'},
				//{name: 'rtSpoke'},
				{name: 'autonegotiate'},
				{name: 'adminState'},
				{name: 'nextHOP'},
				{name: 'multiVRF'},
				{name: 'firstUnitForVRF'},
				{name: 'traficControlProfile'},
				{name: 'qosType'}
                
            ], groupField: 'site', 
            data: [
              		
            ]
        });
    
        return stagedInterfacesStore;
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
	getMultiVRFDetails:function(id) {
		var interfaceList='';
		//serviceui/resteasy/cpp-service/advance-details/7634997?portName=ge-0/2/3&customerName=customer1
		var selectedPort=  Ext.getCmp("siteInterfaceGrid").getSelectionModel().getSelection()[0].data.portName;
		var deviceId = Ext.getCmp("siteName").getValue();
		var customerName = Ext.getCmp("customerName").getValue();
		Ext.Ajax.request({
			method:'GET',
			url:'../serviceui/resteasy/cpp-service/advance-details/'+deviceId+'?portName='+selectedPort+'&customerName='+customerName,
			
			//params:{"vendorType":record.get('vendorType')},
			success:function(r) {				
				var result = Ext.decode(r.responseText);
				
				//console.log("result  :"+result["CPPCustomerBean"]["customerId"]);
				
				if(result.CPPCustomerBean != undefined){
					Ext.getCmp("customerName").setValue(result["CPPCustomerBean"]["name"]);
					
					var af1 = result["CPPCustomerBean"]["af1"];
					var af2 = result["CPPCustomerBean"]["af2"];
					var af3 = result["CPPCustomerBean"]["af3"];
					var ciuName = result["CPPCustomerBean"]["ciuName"];
					var customerId = result["CPPCustomerBean"]["customerId"];
					var efRate = result["CPPCustomerBean"]["efRate"];
					var efService = result["CPPCustomerBean"]["efService"];
					var isAF1Selected = result["CPPCustomerBean"]["isAF1Selected"];
					var isAF2Selected = result["CPPCustomerBean"]["isAF2Selected"];
					var isAF3Selected = result["CPPCustomerBean"]["isAF3Selected"];
					var isAllAFSelected = result["CPPCustomerBean"]["isAF3Selected"];
					var qosType = result["CPPCustomerBean"]["qosType"];
            
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
			},
			{
				name:'mtu',
				mapping:'mtu'			
			},
			{
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
		
    },
populateData:function(data){

	this.scriptUtils.setFieldValues(this,this.commonData);
			  
			 
			  var attribs = Ext.JSON.decode(data.attribs);

	
var formObj = {};
   	//formObj.externalId = data.externalId;	
	if(data.attribs != undefined){
		generalAttr = Ext.decode(data.attribs);
		Ext.iterate(generalAttr, function(item,index,arrObj){
			Ext.iterate(item, function(key,val,obj){
			console.log(key);
			if(key == 'serviceOrderId'){
					formObj.serviceId = val;
					Ext.getCmp('serviceId').setDisabled(true);
				}
				if(key == 'vpnName'){
					formObj.vpnName = val;
					Ext.getCmp('vpnName').setDisabled(true);
				}
				if(key == 'vpnAlias'){
					formObj.vpnAlias = val;
					Ext.getCmp('vpnAlias').setDisabled(true);
				}
				if(key == 'rd'){
					formObj.rd = val;
					Ext.getCmp('rd').setDisabled(true);
				}
				if(key == 'endPointServiceType'){
					formObj.endPointServiceType = val;
					Ext.getCmp('endPointServiceType').setDisabled(true);
				}
				if(key == 'policyGroup'){
					formObj.policyGroup = val;
					Ext.getCmp('policyGroup').setDisabled(true);
				}
				if(key == 'maxRoute'){
					formObj.maxRoute = val;
					Ext.getCmp('maxRoute').setDisabled(true);
				}if(key == 'enforceRoute'){
					if(val == 'true'){
						//formObj.enforceRoute = val;
							Ext.getCmp('enforceRoute').setValue(true);
						}
						Ext.getCmp('enforceRoute').setDisabled(true);
				}
				if(key == 'qosType'){
					formObj.qosType = val;
					Ext.getCmp('qosType').setDisabled(true);
				}
				if(key == 'application'){
					formObj.application = val;
					Ext.getCmp('application').setDisabled(true);
				}
				if(key == 'operationalMode'){
					formObj.operationalMode = val;
					Ext.getCmp('operationalMode').setDisabled(true);
				}
				if(key == 'redistConnRoutes'){
					formObj.redistConnRoutes = val;
					Ext.getCmp('redistConnRoutes').setDisabled(true);
				}
				if(key == 'accounting'){
					formObj.accounting = val;
					Ext.getCmp('accounting').setDisabled(true);
				}
				if(key == 'flowSampling'){
					formObj.flowSampling = val;
					Ext.getCmp('flowSampling').setDisabled(true);
				}
				if(key == 'customer'){
				
				    var attribs = Ext.JSON.decode(data.attribs);
				    
					formObj.customerName = attribs[0].customer.e.name;
					formObj.customerId = attribs[0].customer.e.id;
					Ext.getCmp('customerId').setDisabled(true);
					formObj.email = attribs[0].customer.e.email;
					formObj.customerDescription = attribs[0].customer.e.description;
				}
				
				
			});
		});		
	}
	this.scriptUtils.setFieldValues(this,formObj);

	var storeData = [];
	console.log("unis.seId   "+data.unis.seId);
	
	console.log("unis.endPointsData   "+data.endPointsData);
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
				
				commonEndPointsData.vpnName = commonEndPointsData.vrfName;
				console.log("rdMesh: "+commonEndPointsData.rdMesh);
				console.log("rdHub: "+commonEndPointsData.rdHub);
				console.log("rdSpoke: "+commonEndPointsData.rdSpoke);
				
				if(commonEndPointsData.topology == 'Mesh'){
					commonEndPointsData.rd = commonEndPointsData.rdMesh; //RD = RT
					commonEndPointsData.AsRd = commonEndPointsData.ASMesh;
				}else if(commonEndPointsData.topology == 'Hub'){
					commonEndPointsData.rd = commonEndPointsData.rdHub; //RD=RT
					commonEndPointsData.AsRdSpk = commonEndPointsData.ASSpoke;
					commonEndPointsData.AsRd = commonEndPointsData.ASHub;
					commonEndPointsData.AsRdSpk = commonEndPointsData.ASSpoke;
					commonEndPointsData.spkRd = commonEndPointsData.rdSpoke;
				}else if(commonEndPointsData.topology == 'Spoke'){
					commonEndPointsData.spkRd = commonEndPointsData.rdSpoke; //RD=RT
					commonEndPointsData.AsRdSpk = commonEndPointsData.ASSpoke;
					commonEndPointsData.AsRd = commonEndPointsData.ASHub;
				}
				
				console.log("rtMesh: "+commonEndPointsData.rtMesh);
				console.log("rtHub: "+commonEndPointsData.rtHub);
				console.log("rtSpoke: "+commonEndPointsData.rtSpoke);
				
				console.log("ASMesh: "+commonEndPointsData.ASMesh);
				console.log("ASHub: "+commonEndPointsData.ASHub);
				console.log("ASSpoke: "+commonEndPointsData.ASSpoke);
				
				console.log("vrfName: "+commonEndPointsData.vrfName);
				console.log("spkVrfName: "+commonEndPointsData.spkVrfName);
				console.log("spkVrfId: "+commonEndPointsData.spkVrfId);
				//commonEndPointsData:port
				storeData.push(commonEndPointsData);
			}
		}
		
		var grid = Ext.ComponentQuery.query('container[name=stagedInterfacesGrid]')[0];
		 //var grid = Ext.getCmp("stagedInterfacesGrid").getStore();
		var gridStore = grid.getStore();
		gridStore.removeAll();
		gridStore.loadData(storeData);		
		
		

		Ext.getCmp('spkVrfId').setDisabled(true);
		Ext.getCmp('spkVrfName').setDisabled(true);
		Ext.getCmp('siteName').setDisabled(false);
		Ext.getCmp("endpointPanel").setDisabled(true);
		Ext.getCmp('csId').setDisabled(true);
		Ext.getCmp('vlanId').setDisabled(true);
		Ext.getCmp('ipAddress').setDisabled(true);
		Ext.getCmp('peerAS').setDisabled(true);
		Ext.getCmp('neighbourAddress').setDisabled(true);
		Ext.getCmp('ciuLoopback').setDisabled(true);
		Ext.getCmp('ciuName').setDisabled(true);
		Ext.getCmp('accessRate').setDisabled(true);
	
   },
	getDataJSON:function(){
	console.log("form getDataJSON data': ");
	   // Get all the user-filled form data values.
        var cdata = this.scriptUtils.getFormValues(this);
		        
        // Perform some sanity validations.
    	if(this.validateForm(cdata)){
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
		
		common.serviceTag = "TELUS_L3VPN";
        
        // Add service common attributes ...
		var commonAttributesArray = [];
		var vpnName = Ext.getCmp("vpnName").getValue().trim();
			vpnName.replace('&','&amp;')
		//cdata.serviceOrderName		
		commonAttributesArray.push({
			 "serviceOrderId": Ext.getCmp("serviceId").getValue(),
            "vpnName": vpnName,
			"vpnAlias": Ext.getCmp("vpnAlias").getValue(),
			"rd": Ext.getCmp("rd").getValue(),
			"endPointServiceType": Ext.getCmp("endPointServiceType").getValue(),
			"policyGroup": Ext.getCmp("policyGroup").getValue(),
            "application": Ext.getCmp("application").getValue(),
			"operationalMode": Ext.getCmp("operationalMode").getValue(),
			"maxRoute": Ext.getCmp("maxRoute").getValue(),
			"enforceRoute": Ext.getCmp("enforceRoute").getValue(),
			//"topology": cdata.topology,
			"serviceType" : cdata.serviceType,
			"qosType" : Ext.getCmp("qosType").getValue(),
			"accounting" : Ext.getCmp("accounting").getValue(),
			"flowSampling" : Ext.getCmp("flowSampling").getValue(),
			"architecture" :"JCE",
			"redistConnRoutes" : Ext.getCmp("redistConnRoutes").getValue(),
			"customer": customerArray
		});
		
		common[Jx.ProvConstants.SERVICE_COMMON_ATTRIBUTES] = Ext.encode(commonAttributesArray);

		formDataArray = [];
		var siteName = this.scriptUtils.getFieldByName('siteName');
				console.log( "moid "+siteName.getValue());
				console.log( "getRawValue "+siteName.getRawValue());
				 
		var stagedInterfacesStore = Ext.getCmp("stagedInterfacesGrid").getStore();
		var stagedInterfacesStore_RowCount = stagedInterfacesStore.count();
		console.log("stagedInterfacesStore_RowCount : " + stagedInterfacesStore_RowCount);
		if(stagedInterfacesStore_RowCount==0){
			 Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "It Doesn't Look Like Anything Was added to the staged area!");
			 return;
		}
		/*if(Ext.getCmp("customerName").getValue() =='' || Ext.getCmp("customerName").getValue() == null){
			 Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please search for the customer in order to process the request!");
			 return;
		}*/
		console.log("Value of 'stagedInterfacesStore_RowCount': " + stagedInterfacesStore_RowCount);
		for(var i=0; i < stagedInterfacesStore_RowCount; i++) {
    		var row = stagedInterfacesStore.getAt(i);
			var efRate_BWLimit_BurstSize = [];
			if(row.data.efRate != null){
				 efRate_BWLimit_BurstSize = row.data.efRate.split("|");
				}else
				{
					efRate_BWLimit_BurstSize[0]=0;
					efRate_BWLimit_BurstSize[1]=0;
					efRate_BWLimit_BurstSize[2]=0;
					efRate_BWLimit_BurstSize[3]=0;
				}
			
			console.log("pedeviceId : " + row.data.pedeviceId);
			
			var multiVRFArray = [];	
			multiVRFArray.push({
				"customerId": Ext.getCmp("customerId").getValue(),
				"qosType": row.data.qosType,
				"efRate": row.data.efRate,
				"efService": row.data.efService,
				"isAllAFSelected": row.data.isAllAFSelected,
				"isAF1Selected": row.data.isAF1Selected,
				"isAF2Selected": row.data.isAF2Selected,
				"isAF3Selected": row.data.isAF3Selected,
				"af1": row.data.af1,
				"af2": row.data.af2,
				"af3": row.data.af3,
				"ciuName": row.data.ciuName
			});
		
			
			//var ciuName = row.data.ciuName.replace('','');
			formDataArray.push({
				"Interface": row.data.Interface,
				"pedeviceId": row.data.pedeviceId, //siteName.getValue(),//
				"site": row.data.site, //siteName.getRawValue(),//
				//"ethernateOption": row.data.ethernateOption,
				"vlanId": row.data.vlanId,
				"endPointServiceType": row.data.endPointServiceType, //row.data.validateVlan1
				"ciuLoopback": row.data.ciuLoopback,
				"ciuName": row.data.ciuName,
				"ciuAlias": row.data.ciuAlias,
				"csId": row.data.csId,
				"pathPreferences": row.data.pathPreferences,
				"accessType": row.data.accessType,
				"connectionType": row.data.connectionType,
				"serviceType" : cdata.serviceType,
				"ipAddress": row.data.ipAddress,
				"subnetMask": row.data.subnetMask,
				"loopbackSubnetMask": row.data.loopbackSubnetMask,
				"ipMTU": row.data.ipMTU,
				"ipv6Peer": row.data.ipv6Peer,
				"ipv6Address": row.data.ipv6Address,
				"rdMesh": row.data.rd,
				"rtMesh": row.data.rd, //in the future, if RD and RT are not same. then will assigning appropriate value.
				"rdHub": row.data.rd,
				"rtHub": row.data.rd, //in the future, if RD and RT are not same. then will assigning appropriate value.
				"rdSpoke": row.data.spkRd,
				"rtSpoke": row.data.spkRd, //in the future, if RD and RT are not same. then will assigning appropriate value.
				"ASMesh": row.data.AsRd,
				"ASHub": row.data.AsRd,
				"ASSpoke": row.data.AsRdSpk,
				
				"neighbourAddress": row.data.neighbourAddress,
				"localPref": row.data.localPref,
				"med": row.data.med,
				"peerAS": row.data.peerAS,
				//"rt": row.data.rt,
				//"rtHub": row.data.rtHub,
				//"rtSpoke": row.data.rtSpoke,
				"accessRate": row.data.accessRate,
				"vrfName": row.data.vpnName,
				"spkVrfName": row.data.spkVrfName,
				"spkVrfId": row.data.spkVrfId,
				
				"vpnAlias": row.data.vpnAlias,
				"policyGroup": row.data.policyGroup,
				"vpnRate": row.data.vpnRate,
				"efRate": row.data.efRate,
				"efRate1": efRate_BWLimit_BurstSize[0],
				"typeOfService": efRate_BWLimit_BurstSize[1],
				"bwLimit": efRate_BWLimit_BurstSize[2],
				"burstSize": efRate_BWLimit_BurstSize[3],
				"efService": row.data.efService,
				"isAllAFSelected": row.data.isAllAFSelected,
				"isAF1Selected": row.data.isAF1Selected,
				"isAF2Selected": row.data.isAF2Selected,
				"isAF3Selected": row.data.isAF3Selected,
				"beService": row.data.beService,
				"classifier": row.data.classifier,
				"af1": row.data.af1,
				"af2": row.data.af2,
				"af3": row.data.af3,
				"mvpn": row.data.mvpn,
				"senderSite": row.data.senderSite,
				"ssmIP": row.data.ssmIP,
				"ssmIpMask": row.data.ssmIpMask,
				"rpType": row.data.rpType,
				"rpAddress": row.data.rpAddress,
				"rpGprRange": row.data.rpGprRange,
				"seId": 0,
				"outerEncap":row.data.vlanId,
				"innerEncap":1,
				"operation": 'ADD',
				"recordOPType": 'ADD',
				"vendorType": Jx.ProvConstants.JUNIPER,
				"topology": row.data.topology,
				"autonegotiate": row.data.autonegotiate,
				"adminState": row.data.adminState,
				"nextHOP": row.data.nextHOP,
				"multiVRF": row.data.multiVRF,
				"firstUnitForVRF": row.data.firstUnitForVRF,
				"traficControlProfile": row.data.traficControlProfile,
				"qosType": row.data.qosType,
				"advanced": multiVRFArray
			});
		}
				
		common[Jx.ProvConstants.SERVICE_ENDPOINT_ATTRIBUTES] = Ext.encode(formDataArray);
		console.log("form data': " + formDataArray.toString());
		
		return common;
    },
	validateForm:function(cdata) {
	
	var vpnName = Ext.getCmp("vpnName").getValue();
	var serviceId = Ext.getCmp("serviceId").getValue();
	var topology = Ext.getCmp("topology").getValue();
	var vpnAlias = Ext.getCmp("vpnAlias").getValue();
	
	if(serviceId == null || serviceId == ''){
	Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please enter the valid Service Id");
            return true;
	}
	if(vpnName == null || vpnName == '' || vpnName.indexOf("_") == 0 || vpnName.indexOf("-") == 0 || vpnName.lastIndexOf("_") == vpnName.length-1 || vpnName.lastIndexOf("-") == vpnName.length-1){
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please enter the valid VRF Name");
            return true;
	}
	if(topology == null || topology == ''){
	Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please enter the valid Topology");
            return true;
	}
	if(vpnAlias == null || vpnAlias == ''){
	Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please enter the valid VPN Alias");
            return true;
	}if(rd == null || rd == ''){
			isValid = true;
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the valid RD");
			return isValid;
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
                {valueText: '', displayText: 'Select ...'},
                /*{valueText: 'REDI', displayText: 'RE Direct'},
				 {valueText: 'REDU', displayText: 'RE Dual'}*/
				 {valueText: 'RE Direct', displayText: 'RE Direct'}
				 //{valueText: 'RE Dual', displayText: 'RE Dual'}
            ]
        });

        return connectionTypeStore;
    },
	
	getClassifier:function() {
        var classifier= Ext.create('Ext.data.Store',{
            storeId: 'classifier',
            fields: [
                {name: 'valueText'},
                {name: 'displayText'}
            ], 
            data: [
                {valueText: '', displayText: 'Select ...'},
                {valueText: 'v2-DSCP(default)', displayText: 'v2-DSCP(default)'},
				{valueText: 'v2-802.1p', displayText: 'v2-802.1p'},
				{valueText: 'v2-802.1ad', displayText: 'v2-802.1ad'},
				{valueText: 'v1-IP Prec', displayText: 'v1-IP Prec'}
            ]
        });

        return classifier;
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
               
				{valueText: '1M', displayText: '1M'},
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
				{valueText: '64K|Premium|96K|15000', displayText: '64K'},
				{valueText: '128K|Premium|160K|15000', displayText: '128K'},
				{valueText: '192K|Premium|224K|15000', displayText: '192K'},
				
			    {valueText: '256K|Premium|272K|15000', displayText: '256K'},
				{valueText: '320K|Premium|336K|15000', displayText: '320K'},
				{valueText: '384K|Premium|416K|15000', displayText: '384K'},
				{valueText: '448K|Premium|496K|15000', displayText: '448K'},
				{valueText: '512K|Premium|528K|15000', displayText: '512K'},
				{valueText: '576K|Premium|624K|15000', displayText: '576K'},
				{valueText: '640K|Premium|704K|15000', displayText: '640K'},
				{valueText: '704K|Premium|736K|15000', displayText: '704K'},
				{valueText: '768K|Premium|784K|15000', displayText: '768K'},
				{valueText: '832K|Premium|880K|15000', displayText: '832K'},
				{valueText: '896K|Premium|928K|15000', displayText: '896K'},
				{valueText: '960K|Premium|1008K|15000', displayText: '960K'},
				{valueText: '1024K|Premium|1064K|15000', displayText: '1024K'},
				{valueText: '1088K|Premium|1136K|15000', displayText: '1088K'},
				{valueText: '1152K|Premium|1184K|15000', displayText: '1152K'},
				{valueText: '1216K|Premium|1248K|20000', displayText: '1216K'},
				{valueText: '1280K|Premium|1312K|20000', displayText: '1280K'},
				{valueText: '1344K|Premium|1360K|20000', displayText: '1344K'},
				{valueText: '1500K|Premium|1532K|20000', displayText: '1500K'},
				{valueText: '1M|Premium|1005000|20000', displayText: '1M'},
				{valueText: '2M|Premium|2096000|20000', displayText: '2M'},
				{valueText: '3M|Premium|3M|30000', displayText: '3M'},
				{valueText: '4M|Premium|4M|40000', displayText: '4M'},
				{valueText: '5M|Premium|5100000|50000', displayText: '5M'},
				{valueText: '6M|Premium|6M|60000', displayText: '6M'},
				{valueText: '7M|Premium|7M|70000', displayText: '7M'},
				{valueText: '8M|Premium|8M|80000', displayText: '8M'},
				{valueText: '9M|Premium|9M|90000', displayText: '9M'},
				{valueText: '10M|Premium|10M|100000', displayText: '10M'},
				{valueText: '15M|Premium|15M|100000', displayText: '15M'},
				{valueText: '20M|Premium|20M|100000', displayText: '20M'},
				{valueText: '25M|Premium|25M|100000', displayText: '25M'},
				{valueText: '30M|Premium|30M|100000', displayText: '30M'},
				{valueText: '40M|Premium|40M|100000', displayText: '40M'},
				{valueText: '50M|Premium|50M|100000', displayText: '50M'},
				{valueText: '60M|Premium|60M|100000', displayText: '60M'},
				{valueText: '70M|Premium|70M|100000', displayText: '70M'},
				{valueText: '80M|Premium|80M|100000', displayText: '80M'},
				{valueText: '90M|Premium|90M|100000', displayText: '90M'},
				{valueText: '100M|Premium|100M|100000', displayText: '100M'},
				{valueText: '150M|Premium|150M|100000', displayText: '150M'},
				//{valueText: '180M', displayText: '180M-Non DSL'},
				{valueText: '200M|Premium|200M|125000', displayText: '200M'},
				{valueText: '250M|Premium|250M|160000', displayText: '250M'},
				{valueText: '300M|Premium|300M|190000', displayText: '300M'}
			]
        });

        return EFRateStore;
    },

	validateEndpointDetails:function() {
	var isValid = false;
	var vlan = Ext.getCmp("vlanId").getValue();
	var vpnName = Ext.getCmp("vpnName").getValue();
	
	var endPointServiceType = Ext.getCmp("endPointServiceType").getValue();
	console.log(" endPointServiceType: "+endPointServiceType);
	var ciuLoopback = Ext.getCmp("ciuLoopback").getValue();
	console.log("ciuLoopback : "+ciuLoopback);
	
	var neighbourAddress = Ext.getCmp("neighbourAddress").getValue();
	
	var ciuName = Ext.getCmp("ciuName").getValue();
	console.log("ciuName : "+ciuName);

	var ciuAlias = Ext.getCmp("ciuAlias").getValue();
	console.log("ciuAlias : "+ciuAlias);

	var accessType = Ext.getCmp("accessType").getValue();
	console.log("accessType : "+accessType);
	var connectionType = Ext.getCmp("connectionType").getValue();
	console.log(" connectionType: "+connectionType);

	var csId = Ext.getCmp("csId").getValue();
	
	//var rt = Ext.getCmp("rt").getValue();
	
	//var rtHub = Ext.getCmp("rtHub").getValue();
	
	//var rtSpoke = Ext.getCmp("rtSpoke").getValue();
	
	console.log(" csId: "+csId);

	var pathPreferences = Ext.getCmp("pathPreferences").getValue();
	console.log(" pathPreferences: "+pathPreferences);


	var vlanId = Ext.getCmp("vlanId").getValue();
	console.log("vlanId : "+vlanId);
	var ipAddress = Ext.getCmp("ipAddress").getValue();
	console.log(" ipAddress: "+ipAddress);

	var subnetMask = Ext.getCmp("subnetMask").getValue();
	console.log("subnetMask : "+subnetMask);

	var loopbackSubnetMask = Ext.getCmp("loopbackSubnetMask").getValue();
	console.log("loopbackSubnetMask : "+loopbackSubnetMask);


	var ipMTU = Ext.getCmp("ipMTU").getValue();
	console.log(" ipMTU: "+ipMTU);
	var ipv6Peer =  Ext.getCmp('ipv6Peer').getValue();
	console.log("ipv6Peer : "+ipv6Peer);
	var ipv6Address = Ext.getCmp("ipv6Address").getValue();
	console.log("ipv6Address : "+ipv6Address);
	
	var localPref = Ext.getCmp("localPref").getValue();
	console.log(" localPref: "+localPref);
	var med = Ext.getCmp("med").getValue();
	console.log(" med: "+med);
	var peerAS = Ext.getCmp("peerAS").getValue();
	console.log(" peerAS: "+peerAS);
	var rd = Ext.getCmp("rd").getValue();
	
	var accessRate = Ext.getCmp("accessRate").getValue();
	
	var vpnAlias = Ext.getCmp("vpnAlias").getValue();
	var policyGroup = Ext.getCmp("policyGroup").getValue();
	var vpnRate = Ext.getCmp("vpnSpeed").getValue();
	
	var efService = Ext.getCmp("efService").getValue();
	var efRate = Ext.getCmp("efRate").getValue();
	var classifier = Ext.getCmp("classifier").getValue();
	console.log(">>*********************************");
	
			if(ipAddress == 0)
			ipAddress = ipAddress +"";
		if(neighbourAddress == 0)
			neighbourAddress = neighbourAddress +"";
		if(ciuLoopback == 0)
			ciuLoopback = ciuLoopback +"";
		
		if((vpnName == null || (vpnName != null && (vpnName.charAt(0) == '-' || vpnName.charAt(0) == '_' )))){
			isValid = true;
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the valid VRF Name");
			return isValid;
		}
		if((ciuAlias != null && (ciuAlias.charAt(0) == '-' || ciuAlias.charAt(0) == '_' ))){
			isValid = true;
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the valid CIU Alias");
			return isValid;
		}
		
		if(csId == null || csId == ''){
			isValid = true;
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the valid CSID");
			return isValid;
		}else if(endPointServiceType == null || endPointServiceType == ''){
			isValid = true;
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the valid Service Type");
			return isValid;
		}else if(ciuName == null || ciuName == ''){
			isValid = true;
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the valid CIU Name");
			return isValid;
		}else if(connectionType == null || connectionType == ''){
			isValid = true;
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the valid Connection Type");
			return isValid;
		}else if(pathPreferences == null || pathPreferences == ''){
			isValid = true;
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the valid Path Preference");
			return isValid;
		}else if(ipAddress == null || ipAddress == ''){
			isValid = true;
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the valid IP Address");
			return isValid;
		}else if(ipAddress != null && ipAddress.split(".").length != 4){
			isValid = true;
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the valid IP Address");
			return isValid;
		}else if(subnetMask == null || subnetMask == ''){
			isValid = true;
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the valid Subnet Mask");
			return isValid;
		}else if(connectionType != null && connectionType == 'RE Dual' && (vlan == null || vlan == "")){
			isValid = true;
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the valid vlan!");
			return isValid;
		}else if(peerAS == null || peerAS == ''){
			isValid = true;
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the valid PEER AS");
			return isValid;
		}else if(peerAS == null || peerAS == ''){
			isValid = true;
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the valid PEER AS");
			return isValid;
		}else if(med == null || med == ''){
			isValid = true;
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the valid MED");
			return isValid;
		}else if(localPref == null || localPref == ''){
			isValid = true;
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the valid Local Pref");
			return isValid;
		}else if(neighbourAddress == null || neighbourAddress == ''){
			isValid = true;
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the valid Neighbour Address");
			return isValid;
		}else if(neighbourAddress != null && neighbourAddress.split(".").length != 4){
			isValid = true;
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the valid Neighbour Address");
			return isValid;
		}else if(ciuLoopback == null || ciuLoopback == ''){
			isValid = true;
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the valid CIU loopback");
			return isValid;
		}else if(ciuLoopback != null && ciuLoopback.split(".").length != 4){
			isValid = true;
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the valid CIU Loopback");
			return isValid;
		}else if(accessRate == null || accessRate == ''){
			isValid = true;
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the valid Access Rate");
			return isValid;
		}else if(efService == true && (efRate == null || efRate == '')){
			isValid = true;
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the valid EF Rate");
			return isValid;
		}else if(classifier == null || classifier == ''){
			isValid = true;
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the valid Classifier");
			return isValid;
		}	
	return isValid;
	},	
handleAddStagedInterface:function() {

//if(isInterfaceForCustomerExist){
	//Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "This port is used by another customer. Please use another port");
	//return;
//	}

console.log("is port valid: "+this.isPortValid);

//var isPortValid = this.isPortValid;
//console.log("is port valid: "+ sPortValid);
if(!isPortValid){
	Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "This interface is not ready for use");
	return;
}
	
var isDataValid = this.validateEndpointDetails();
	console.log("isDataValid > > > > : > "+isDataValid);
	if(isDataValid)
		return;
	

var selection = Ext.getCmp("siteInterfaceGrid").getSelectionModel().hasSelection();

if(!selection){
	Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please select one of the site interface in the grid in order process!");
	return;

}
//alert("interface selected: "+selection);



console.log("device id: "+this.moid);
	console.log("port id: "+this.port);
	var vlan = Ext.getCmp("vlanId").getValue()
	console.log("vlanId: "+vlan);
	var stagedInterfacesStore = Ext.getCmp("stagedInterfacesGrid").getStore();
	
	console.log("stages no ** : "+stagedInterfacesStore.count());
	
	var numberOfDuplicateVLAN = 0;
		if(stagedInterfacesStore.count() > 0){
			for(var i=0; i < stagedInterfacesStore.count(); i++) {
				var row = stagedInterfacesStore.getAt(i);
				console.log("moid>>>>>"+ row.data.pedeviceId);
				console.log("port2>>>>>"+ row.data.Interface);
				console.log("vlanId1>>>>>"+ row.data.vlanId);
				
				if((this.moid == row.data.moid) && (this.port == row.data.Interface) && (vlan == row.data.vlanId) ){
				numberOfDuplicateVLAN++;
				console.log("numberOfDuplicateVLAN>>>>>"+ numberOfDuplicateVLAN);
				if(numberOfDuplicateVLAN > 0){
					Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "VLAN ID cant be the same for selected Site and Port, Please change the VLAN ID.!");
					return;
					}
				}
			}
		}
		

var endPointServiceType = this.scriptUtils.getFieldByName("endPointServiceType").getValue();
console.log(" endPointServiceType: "+endPointServiceType);
var ciuLoopback = this.scriptUtils.getFieldByName("ciuLoopback").getValue();
console.log("ciuLoopback : "+ciuLoopback);

var ciuName = this.scriptUtils.getFieldByName("ciuName").getValue();
console.log("ciuName : "+ciuName);

Ext.getCmp("ciuName").setDisabled(false);

var ciuAlias = this.scriptUtils.getFieldByName("ciuAlias").getValue();
console.log("ciuAlias : "+ciuAlias);

/*if(ciuName.contains("!") || ciuName.contains("&") || ciuAlias.contains("!") || ciuAlias.contains("&")){
	Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "special character !/& not allowed in CIU Name/Alias!");
	return;
}*/
				

var accessType = this.scriptUtils.getFieldByName("accessType").getValue();
console.log("accessType : "+accessType);
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

var loopbackSubnetMask = this.scriptUtils.getFieldByName("loopbackSubnetMask").getValue();
console.log("loopbackSubnetMask : "+loopbackSubnetMask);


var ipMTU = this.scriptUtils.getFieldByName("ipMTU").getValue();
console.log(" ipMTU: "+ipMTU);

//var ipv6Peer = this.scriptUtils.getFieldByName("ipv6Peer").getValue();

var ipv6Peer =  Ext.getCmp('ipv6Peer').getValue();
console.log("ipv6Peer : "+ipv6Peer);
var ipv6Address = this.scriptUtils.getFieldByName("ipv6Address").getValue();
//var ipv6Address1 = this.scriptUtils.getFieldByName("ipv6Address1").getValue();
//var ipv6Address2 = this.scriptUtils.getFieldByName("ipv6Address2").getValue();
//var ipv6Address3 = this.scriptUtils.getFieldByName("ipv6Address3").getValue();
console.log("ipv6Address : "+ipv6Address);


var rd = this.scriptUtils.getFieldByName("rd").getValue();
console.log("rd : "+rd);
var vpnName = this.scriptUtils.getFieldByName("vpnName").getValue(); //Mesh vrf
var spkVrfName = this.scriptUtils.getFieldByName("spkVrfName").getValue(); 
var spkRd = this.scriptUtils.getFieldByName("spkRd").getValue(); 
var spkVrfId = this.scriptUtils.getFieldByName("spkVrfId").getValue(); 


var neighbourAddress = this.scriptUtils.getFieldByName("neighbourAddress").getValue();
console.log("rneighbourAddressd : "+neighbourAddress);

var localPref = this.scriptUtils.getFieldByName("localPref").getValue();
console.log(" localPref: "+localPref);
var med = this.scriptUtils.getFieldByName("med").getValue();
console.log(" med: "+med);
var peerAS = this.scriptUtils.getFieldByName("peerAS").getValue();
console.log(" peerAS: "+peerAS);

var accessRate = this.scriptUtils.getFieldByName("accessRate").getValue();
var vpnAlias = Ext.getCmp("vpnAlias").getValue();
var policyGroup = Ext.getCmp("policyGroup").getValue();
var vpnRate = Ext.getCmp("vpnSpeed").getValue();

console.log(" accessRate: "+accessRate);
var efRate = this.scriptUtils.getFieldByName("efRate").getValue();
console.log("efRate : "+efRate);


var efService =  Ext.getCmp('efService').getValue();

var isAllAFSelected =  Ext.getCmp('isAllAFSelected').getValue();
var isAF1Selected =  Ext.getCmp('isAF1Selected').getValue();
var isAF2Selected =  Ext.getCmp('isAF2Selected').getValue();
var isAF3Selected =  Ext.getCmp('isAF3Selected').getValue();

var beService =  Ext.getCmp('beService').getValue();

var classifier =  Ext.getCmp('classifier').getValue();

var af1 = this.scriptUtils.getFieldByName("af1").getValue();
console.log("af1 : "+af1);
var af2 = this.scriptUtils.getFieldByName("af2").getValue();
console.log(" af2: "+af2);
var af3 = this.scriptUtils.getFieldByName("af3").getValue();
console.log("af3 : "+af3);

var mvpn =  Ext.getCmp('mvpn').checkboxCmp.getValue();
//var mvpn = this.scriptUtils.getFieldByName("mvpn").getValue();
console.log("mvpn : "+mvpn);
var senderSite = this.scriptUtils.getFieldByName("senderSite").getValue();
console.log("senderSite : "+senderSite);
var ssmIP = this.scriptUtils.getFieldByName("ssmIP").getValue();
console.log("ssmIP : "+ssmIP);
var ssmIpMask = this.scriptUtils.getFieldByName("ssmIpMask").getValue();
console.log("ssmIpMask : "+ssmIpMask);
var rpType = this.scriptUtils.getFieldByName("rpType").getValue();
console.log(" rpType: "+rpType);
var rpAddress = this.scriptUtils.getFieldByName("rpAddress").getValue();
console.log(" rpAddress: "+rpAddress);
var rpGprRange = this.scriptUtils.getFieldByName("rpGprRange").getValue();
console.log("rpGprRange : "+rpGprRange);

console.log("ipAddress': " + ipAddress);


var topology = this.scriptUtils.getFieldByName("topology").getValue();
console.log(" topology: "+topology);

var AsRd = this.scriptUtils.getFieldByName("AsRd").getValue();
var AsRdSpk = this.scriptUtils.getFieldByName("AsRdSpk").getValue();
	

var autonegotiate = this.scriptUtils.getFieldByName("autonegotiate").getValue();
var adminState = this.scriptUtils.getFieldByName("adminState").getValue();
var multiVRF = this.scriptUtils.getFieldByName("multiVRF").getValue();
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
	var qosType = this.scriptUtils.getFieldByName("qosType").getValue();
	
var nextHOP = this.scriptUtils.getFieldByName("nextHOP").getValue();

//var rt = this.scriptUtils.getFieldByName("rt").getValue();
//var rtHub = this.scriptUtils.getFieldByName("rtHub").getValue();

//var rtSpoke = this.scriptUtils.getFieldByName("rtSpoke").getValue();

//console.log(" rt: "+rt);

console.log("******************");


	console.log("site': " + this.site);
	console.log("port': " + this.port);
	console.log("moid  : " + this.moid);
	if(!this.validateAF()){
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please enter the valid AF1%AF2%AF3%");
	return;
	}

	if(af1+af2+af3 > 100 || af1+af2+af3 < 100){
	 Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "AF1% AF2% AF3% should be 100!");
            return true;
	}
	
	if((this.site == null) && (this.port == null) || (this.site == '') && (this.port == '')) {
            Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please select the Site and Site Interface in order to add to the staging area!!");
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
					//if(this.doesIpDuplicationExist(ipAddress1.getValue(), subnetMask1.getValue(), row.data.ipAddress, row.data.subnetMask)) {
						//console.log("Row '" + i + "' has duplicate IP!");
						//doesIpDuplicationExistInStagedInterfacesStore = true;
						//Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "this IP address is already been used, Please try with another IP!");
						// We can break out of the for loop as soon as the flag is set to true.
						//break;
					//}
				}
			}
				
				
		// Perform a check on the IP address entered. We need to make sure that the IP, in combination with the mask, is valid.
        // ie. we cannot have an IP that is the broadcast or network address of the subnet.
		if(this.validateIpAddress()){
          return;
       };
	
		
	var endpointPanel = Ext.ComponentQuery.query('#endpointPanel')[0];
	endpointPanel.hide();
	stagedInterfacesStore.add({
		pedeviceId: this.moid,
		site: this.site,
		Interface: this.port,
		endPointServiceType: endPointServiceType,   
		ciuLoopback: ciuLoopback,
		ciuName: ciuName,
		ciuAlias: ciuAlias,
		accessType: accessType,
		connectionType: connectionType,
		csId: csId,
		pathPreferences: pathPreferences,
		vlanId: vlanId,
		ipAddress: ipAddress,
		subnetMask: subnetMask,
		loopbackSubnetMask: loopbackSubnetMask,
		ipMTU: ipMTU,
		ipv6Peer: ipv6Peer,
		ipv6Address: ipv6Address,//+"."+ipv6Address1+"."+ipv6Address2+"."+ipv6Address3,
		vpnName: vpnName,
		AsRd: AsRd,
		AsRdSpk: AsRdSpk,
		rd: rd,
		spkVrfName: spkVrfName,
		spkRd: spkRd,
		spkVrfId: spkVrfId,
		neighbourAddress: neighbourAddress,
		localPref: localPref,
		med: med,
		peerAS: peerAS,
		accessRate: accessRate,
		vpnAlias: vpnAlias,
		policyGroup: policyGroup,
		vpnRate: vpnRate,
		efRate: efRate,
		efService: efService,
		isAllAFSelected: isAllAFSelected,
		isAF1Selected: isAF1Selected,
		isAF2Selected: isAF2Selected,
		isAF3Selected: isAF3Selected,
		beService: beService,
		classifier: classifier,
		af1: af1,
		af2: af2,
		af3:af3,
		recordOPType: 'ADD',
		autonegotiate: autonegotiate,
		adminState: adminState,
		multiVRF: multiVRF,
		firstUnitForVRF: firstUnitForVRF,
		traficControlProfile: traficControlProfile,
		qosType: qosType,
		nextHOP: nextHOP,
		mvpn: mvpn,
		senderSite: senderSite,
		ssmIP: ssmIP,
		ssmIpMask: ssmIpMask,
		rpType: rpType,
		rpAddress: rpAddress,
		rpGprRange: rpGprRange,
		topology: topology
		//rt: rt,
		//rtHub: rtHub,
		//rtSpoke: rtSpoke
	}); 	
},










handleUpdateStagedInterface:function() {

console.log("handleUpdateStagedInterface");
	var endPointServiceType = Ext.getCmp("endPointServiceType").getValue();
	var ciuLoopback = Ext.getCmp("ciuLoopback").getValue();
	var ciuName = Ext.getCmp("ciuName").getValue();
	var ciuAlias = Ext.getCmp("ciuAlias").getValue();
	
	/*if(ciuName.contains("!") || ciuName.contains("&") || ciuAlias.contains("!") || ciuAlias.contains("&")){
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "special character !/& not allowed in CIU Name/Alias!");
		return;
	}*/
	var accessType = Ext.getCmp("accessType").getValue();
	var connectionType = Ext.getCmp("connectionType").getValue();
	
	var csId = this.scriptUtils.getFieldByName("csId").getValue();
console.log(" csId: "+csId);

var pathPreferences = this.scriptUtils.getFieldByName("pathPreferences").getValue();
console.log(" pathPreferences: "+pathPreferences);

	var vlanId = Ext.getCmp("vlanId").getValue();
	var ipAddress = Ext.getCmp("ipAddress").getValue();
	var subnetMask = Ext.getCmp("subnetMask").getValue();
	var loopbackSubnetMask = Ext.getCmp("loopbackSubnetMask").getValue();
	var ipMTU = Ext.getCmp("ipMTU").getValue();
	
			
		// Perform a check on the IP address entered. We need to make sure that the IP, in combination with the mask, is valid.
        // ie. we cannot have an IP that is the broadcast or network address of the subnet.
		if(this.validateIpAddress()){
          return;
       };
	
	console.log("ipMTU': " +ipMTU);
	
	var ipv6Peer =Ext.getCmp("ipv6Peer").getValue();
	var ipv6Address =Ext.getCmp("ipv6Address").getValue();
	//var ipv6Address1 =Ext.getCmp("ipv6Address1").getValue();
	//var ipv6Address2 =Ext.getCmp("ipv6Address2").getValue();
	//var ipv6Address3 =Ext.getCmp("ipv6Address3").getValue();

	var rd = Ext.getCmp("rd").getValue();
	//var vpnName = this.scriptUtils.getFieldByName("vpnName").getValue(); //Mesh vrf
	var spkVrfName = Ext.getCmp("spkVrfName").getValue(); 
	var spkRd = Ext.getCmp("spkRd").getValue(); 
	var spkVrfId = Ext.getCmp("spkVrfId").getValue();
	var AsRd = Ext.getCmp("AsRd").getValue();
	var AsRdSpk = Ext.getCmp("AsRdSpk").getValue();
	var neighbourAddress = Ext.getCmp("neighbourAddress").getValue();
	var localPref = Ext.getCmp("localPref").getValue();
	var med = Ext.getCmp("med").getValue();
	var peerAS = Ext.getCmp("peerAS").getValue();
	
	//var rt = Ext.getCmp("rt").getValue();
	//var rtHub = Ext.getCmp("rtHub").getValue();
	//var rtSpoke = Ext.getCmp("rtSpoke").getValue();
	
	console.log("peerAS': " +peerAS);
	
	
	var accessRate = Ext.getCmp("accessRate").getValue();
	var vpnAlias = Ext.getCmp("vpnAlias").getValue();
	var policyGroup = Ext.getCmp("policyGroup").getValue();
	var vpnRate = Ext.getCmp("vpnSpeed").getValue();
	var efRate = Ext.getCmp("efRate").getValue();
	var efService = Ext.getCmp("efService").getValue();
	var isAllAFSelected = Ext.getCmp("isAllAFSelected").getValue();
	var isAF1Selected = Ext.getCmp("isAF1Selected").getValue();
	var isAF2Selected = Ext.getCmp("isAF2Selected").getValue();
	var isAF3Selected = Ext.getCmp("isAF3Selected").getValue();
	var beService = Ext.getCmp("beService").getValue();
	var classifier = Ext.getCmp("classifier").getValue();
	var af1 = Ext.getCmp("af1").getValue();
	var af2 = Ext.getCmp("af2").getValue();
	var af3 = Ext.getCmp("af3").getValue();
	
	console.log("af3': " +af3);
	
	var mvpn =Ext.getCmp("mvpn").checkboxCmp.getValue();
	var senderSite =Ext.getCmp("senderSite").getValue();
	var ssmIP =Ext.getCmp("ssmIP").getValue();
	var ssmIpMask =Ext.getCmp("ssmIpMask").getValue();
	var rpType =Ext.getCmp("rpType").getValue();
	var rpAddress =Ext.getCmp("rpAddress").getValue();
	var rpGprRange =Ext.getCmp("rpGprRange").getValue();
	
	//var autonegotiate = (Ext.getCmp("autonegotiate").getValue()==true) ? "true" : "false";
	//var adminState = (Ext.getCmp("adminState").getValue()==true) ? "true" : "false";
	var autonegotiate = Ext.getCmp("autonegotiate").getValue();
	var adminState = Ext.getCmp("adminState").getValue();
	
	var multiVRF = Ext.getCmp("multiVRF").getValue();
	var firstUnitForVRF = Ext.getCmp("firstUnitForVRF").getValue();
	var traficControlProfile = Ext.getCmp("traficControlProfile").getValue();
	var qosType = Ext.getCmp("qosType").getValue();
	var nextHOP = Ext.getCmp("nextHOP").getValue();
	console.log("rpGprRange': " +rpGprRange);
	console.log("autonegotiate': " +autonegotiate);
	console.log("adminState': " +adminState);

	var index = Ext.getCmp("index").getValue();
	console.log('index to update: '+index);


	console.log("******************");
	console.log("ipAddress': " + ipAddress);
	console.log("******************");


	console.log("site': " + this.site);
	console.log("port': " + this.port);
	console.log("moid  : " + this.moid);
	
	if(af1+af2+af3 > 100 || af1+af2+af3 < 100){
	 Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "AF1% AF2% AF3% should be 100!");
            return true;
	}
	
	//var isCCI = Ext.getCmp('isCCI');
	//isCCI.setValue(false);
	
	var stagedInterfacesStore = Ext.getCmp("stagedInterfacesGrid").getStore();
	var row = stagedInterfacesStore.getAt(index);
	
	row.data.endPointServiceType= endPointServiceType;   
		row.data.ciuLoopback= ciuLoopback;
		row.data.ciuName= ciuName;
		row.data.ciuAlias= ciuAlias;
		row.data.accessType= accessType;
		row.data.connectionType= connectionType;
		row.data.csId= csId,
		row.data.pathPreferences= pathPreferences,
		row.data.vlanId= vlanId;
		row.data.ipAddress= ipAddress;
		row.data.subnetMask= subnetMask;
		row.data.loopbackSubnetMask=loopbackSubnetMask;
		row.data.ipMTU= ipMTU;
		row.data.ipv6Peer= ipv6Peer;
		row.data.ipv6Address= ipv6Address;//+"."+ipv6Address1+"."+ipv6Address2+"."+ipv6Address3;
		row.data.rd= rd;
		row.data.spkVrfName = spkVrfName,
		row.data.spkRd = spkRd,
		row.data.spkVrfId = spkVrfId,
		row.data.neighbourAddress= neighbourAddress;
		row.data.localPref= localPref;
		row.data.med= med;
		row.data.peerAS= peerAS;
		row.data.accessRate= accessRate;
		row.data.vpnAlias= vpnAlias;
		row.data.policyGroup= policyGroup;
		row.data.vpnRate= vpnRate;
		row.data.efService= efService;
		row.data.isAllAFSelected= isAllAFSelected;
		row.data.isAF1Selected= isAF1Selected;
		row.data.isAF2Selected= isAF2Selected;
		row.data.isAF3Selected= isAF3Selected;
		row.data.beService= beService;
		row.data.classifier= classifier;
		row.data.efRate= efRate;
		row.data.af1= af1;
		row.data.af2= af2;
		row.data.af3=af3;
		
		row.data.mvpn=mvpn;
		row.data.senderSite=senderSite;
		row.data.ssmIP=ssmIP;
		row.data.ssmIpMask=ssmIpMask;
		row.data.rpType=rpType;
		row.data.rpAddress=rpAddress;
		row.data.rpGprRange=rpGprRange;
		//row.data.rtHub=rtHub;
		//row.data.rtSpoke=rtSpoke;
		row.data.AsRd=AsRd;
		row.data.AsRdSpk=AsRdSpk;
		
		row.data.autonegotiate = autonegotiate;
		row.data.adminState = adminState;
		row.data.multiVRF = multiVRF;
		row.data.firstUnitForVRF = firstUnitForVRF;
		row.data.traficControlProfile = traficControlProfile;
		row.data.qosType = qosType;
		row.data.nextHOP = nextHOP;

	var endpointPanel = Ext.ComponentQuery.query('#endpointPanel')[0];
	endpointPanel.hide();
	
	var clearInactiveEntriesFromListButton = Ext.getCmp('clearInactiveEntriesFromListButton');
	clearInactiveEntriesFromListButton.show();
	
	this.isCCI=false;
															
															
	var updateBtn = Ext.getCmp('updateBtn');
	updateBtn.hide();
	var stageBtn = Ext.getCmp('stageBtn');
	stageBtn.show();
	
	var interfacegrid = Ext.ComponentQuery.query('gridpanel[name=siteInterfaceGrid]')[0];
	interfacegrid.setDisabled(false);
	
	
	var siteName = Ext.getCmp('siteName').setDisabled(false);
	var topology = Ext.getCmp('topology').setDisabled(false);
	
															
	//me.setFieldDisabled('siteInterface',true);
															
	Ext.getCmp("stagedInterfacesGrid").getView().refresh();	
},
handleClearAddSiteInterfacePanelButton:function() {
        var endPointServiceType = Ext.getCmp("endPointServiceType").reset();
		var ciuLoopback =Ext.getCmp("ciuLoopback").reset();
		var ciuLoopback =Ext.getCmp("ciuName").reset();
		var ciuLoopback =Ext.getCmp("ciuAlias").reset();
		var csId =Ext.getCmp("csId").reset();
		var accessType =Ext.getCmp("accessType").reset();
		var connectionType =Ext.getCmp("connectionType").reset();
		var vlanId =Ext.getCmp("vlanId").reset();
		var ipAddress =Ext.getCmp("ipAddress").reset();
		var subnetMask =Ext.getCmp("subnetMask").reset();
		var loopbackSubnetMask =Ext.getCmp("loopbackSubnetMask").reset();
		var ipMTU =Ext.getCmp("ipMTU").reset();

		var rd =Ext.getCmp("rd").reset();
		var neighbourAddress =Ext.getCmp("neighbourAddress").reset();
		var localPref =Ext.getCmp("localPref").reset();
		var med =Ext.getCmp("med").reset();
		var peerAS =Ext.getCmp("peerAS").reset();
		var accessRate =Ext.getCmp("accessRate").reset();
		var vpnAlias =Ext.getCmp("vpnAlias").reset();
		var policyGroup =Ext.getCmp("policyGroup").reset();
		var vpnRate =Ext.getCmp("vpnSpeed").reset();
		var efRate =Ext.getCmp("efRate").reset();
		var af1 =Ext.getCmp("af1").reset();
		var af2 =Ext.getCmp("af2").reset();
		var af3 =Ext.getCmp("af3").reset();
    },
   handleClearInactiveEntriesFromList:function() {
        // Get a count of the number of entries currently in grid 'stagedInterfacesGrid'.
		/*var stagedInterfacesStore = Ext.getCmp("stagedInterfacesGrid").getStore();
		var stagedInterfacesStore_RowCount;
		 stagedInterfacesStore_RowCount = stagedInterfacesStore.count();
		var index = this.scriptUtils.getFieldByName("index").getValue();
		console.log('index to clear: '+index);
		console.log('stage count: '+stagedInterfacesStore_RowCount);
		
		var j=0;
		for(var i=0; i < stagedInterfacesStore_RowCount; i++) {
		console.log("row count* "+stagedInterfacesStore_RowCount);

			console.log("row: "+i + " selection " +Ext.getCmp("stagedInterfacesGrid").getSelectionModel().hasSelection())
				if (Ext.getCmp("stagedInterfacesGrid").getSelectionModel().hasSelection()) {
				
				stagedInterfacesStore.removeAt(i);
	
				}

			}*/
		
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
				if(numberOfDuplicateVLAN > 0){
					Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "VLAN ID cant be the same for selected Site and Port, Please change the VLAN ID.!");
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
				console.log("msg msg: "+result.message);
				
				if(result.success == 'true'){
					msg='VLAN is available';
				}
				else if(result.success == 'false'){
					msg='VLAN is in Use. Please use another one!!';
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
        Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "ERROR: Cannot Use Network Address of Subnet!");
        return true;
    }
    // Check if the IP address in question is the broadcast address of the subnet.
    else if((fourthOctet + 1) % subnetSize == 0) {
        Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "ERROR: Cannot Use Broadcast Address of Subnet!");
        return true;
    }
    else {
        // Do Nothing
    }
},
	getNetworkAddress: function(ipAddress, subnetMask_DecimalNotation) {
        //console.log("In 'getNetworkAddress()' ...");
        //console.log("Value of 'ipAddress': " + ipAddress);
        //console.log("Value of 'subnetMask_DecimalNotation': " + subnetMask_DecimalNotation);
        
        var subnetMask_DottedDecimalNotation;
        
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
	console.log("getting interface description*****************");
	var vendor = 'Juniper';
    var inventoryType = 'device';
	var device_IntferfaceDesc_XPath = "/device/configuration/interfaces/interface[name='" + interfaceName + "']";
	var formData = this.scriptUtils.getFormValues(this);
	var siteName = Ext.getCmp('siteName').getValue();
	this.getNodeList(siteName, vendor, inventoryType, device_IntferfaceDesc_XPath, function(results){ 
		
		
		try{
			var interfaceDescription = results["interface"].description;
			
			var hierarchicalScheduler = results["interface"]["hierarchical-scheduler"];
			var flexibleVlanTagging = results["interface"]["flexible-vlan-tagging"];
			var encapsulation = results["interface"].encapsulation;
			
			console.log("hierarchicalScheduler: "+ hierarchicalScheduler);
			console.log("flexibleVlanTagging: "+ flexibleVlanTagging);
			console.log("encapsulation: "+ encapsulation);
			if(hierarchicalScheduler != undefined && flexibleVlanTagging!= undefined && encapsulation != undefined){
				console.log("valid");
				this.isPortValid = true;
			}else{
				console.log("invalid");
				this.isPortValid = false;
			}
			console.log("is port valid: : "+ this.isPortValid);
			
			Ext.getCmp("lblInterfaceDescription").setValue(interfaceDescription);
			console.log("Value of 'interfaceDescription': " + interfaceDescription);
			console.log("Value of 'interfaceDescription  comment': " + results["interface"]["description"]["#text"]);
			if(results["interface"]["description"]["#text"] != undefined){
				Ext.getCmp("lblInterfaceDescription").setValue(results["interface"]["description"]["#text"])
			}
		}
		catch(e){
			console.log("error:   "+e);
			Ext.getCmp("lblInterfaceDescription").setValue("");
		}
	}
	);
},
getInterfaceDescription1: function(interfaceName) {
	var isPortAllowed = false;
    var vendor = 'Juniper';
    var inventoryType = 'device';
    var device_IntferfaceDesc_XPath = "/device/configuration/interfaces/interface[name='" + interfaceName + "']";
    var interfaceDescription = "";
    
    var formData = this.scriptUtils.getFormValues(this);
 var siteName = Ext.getCmp('siteName').getValue();
 console.log("site name: "+siteName);
    this.getNodeList(siteName, vendor, inventoryType, device_IntferfaceDesc_XPath, function(results){ 
		try{
        interfaceDescription = results["interface"].description;
		var unit = results["interface"].unit;
		//result["CPPCustomerBean"]["email"]
        console.log("Value of 'interfaceDescription': " + interfaceDescription);
		console.log("Value of 'interfaceDescription': " + results["interface"]["description"]["#text"]);
		console.log("unit > > > > <:>"+unit);
		var unt ='';
		if(unit.length==undefined || unit.length=='undefined'){
			
			unt =  unit;
			this.firstUnitForVRF = unt.name;
			Ext.getCmp("firstUnitForVRF").setValue(this.firstUnitForVRF);
		}else{
			unt =  unit[0];
			this.firstUnitForVRF = unt.name;
			Ext.getCmp("firstUnitForVRF").setValue(this.firstUnitForVRF);
		}
		
		console.log("unt name: "+unt.name);
        var customerId = Ext.getCmp('customerId').getValue();
		console.log("customerId.. "+customerId);
		if(interfaceDescription == undefined){
			Ext.getCmp("ciuName").setValue('');
			Ext.getCmp("qoSType").setValue('');
			Ext.getCmp("traficControlProfile").setValue('');
			Ext.getCmp("qosType").setValue('');
			Ext.getCmp("ciuName").setDisabled(false);
			Ext.getCmp("qoSType").setDisabled(false);
		}
		var tokenizedDescription = '';
		//var custInfoForMultiVRF = '';
		
		try{
			tokenizedDescription = interfaceDescription.split('.')[0].split('|');
			//custInfoForMultiVRF = tokenizedDescription[0];
		}
		catch(e){
		console.log("error:   "+e);
		interfaceDescription = results["interface"]["description"]["#text"];
		tokenizedDescription = interfaceDescription.split('.')[0].split('|');
		//custInfoForMultiVRF = tokenizedDescription[0];
		}
		
		console.log("tokenizedDescription > > "+tokenizedDescription);
		
		console.log("token length.. "+tokenizedDescription.length);
		console.log("cust id.. "+tokenizedDescription[0]);
		
		
		if(tokenizedDescription.length > 1){
			this.CIUName = tokenizedDescription[1];
			this.TRAFIC_CONTROL_PROFILE = tokenizedDescription[3];
			Ext.getCmp("traficControlProfile").setValue(this.TRAFIC_CONTROL_PROFILE);
			console.log("this.CIUName 1"+this.CIUName);
			Ext.getCmp("ciuName").setValue(this.CIUName);
			Ext.getCmp("qosType").setValue(tokenizedDescription[2]);
			Ext.getCmp("ciuName").setDisabled(true);
			Ext.getCmp("qosType").setDisabled(true);
				if(customerId != tokenizedDescription[0]){
				console.log("isPortAllowed>  . . "+isPortAllowed);
					Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "This port is used by another customer. Please use another port");
					isPortAllowed= true;
					Ext.getCmp("ciuName").setDisabled(false);
					Ext.getCmp("qosType").setDisabled(false);
					this.isInterfaceForCustomerExist = true;
					isPortAllowed = this.isInterfaceForCustomerExist;
					console.log("this.isInterfaceForCustomerExist>>>>  . . "+this.isInterfaceForCustomerExist);
					//return true;
			}else{
				this.isInterfaceForCustomerExist = false;
				Ext.getCmp("ciuName").setDisabled(true);
				Ext.getCmp("qosType").setDisabled(true);
				Ext.getCmp("multiVRF").setValue(true);
				
			}
		}else{
			this.CIUName = '';
			this.firstUnitForVRF = '';
			this.TRAFIC_CONTROL_PROFILE = '';
			Ext.getCmp("ciuName").setValue('');
			Ext.getCmp("ciuName").setDisabled(false);
			Ext.getCmp("qosType").setDisabled(false);
			Ext.getCmp("qosType").setValue("");
			Ext.getCmp("multiVRF").setValue(false);
			this.isInterfaceForCustomerExist = false;
		}
		
	}catch(e){
			this.CIUName = '';
			this.firstUnitForVRF = '';
			this.TRAFIC_CONTROL_PROFILE = '';
			this.isInterfaceForCustomerExist = false;
			Ext.getCmp("qosType").setDisabled(false);
			Ext.getCmp("ciuName").setDisabled(false);
			Ext.getCmp("ciuName").setValue('');
	}		
																
																
		
        //var tokenizedDescription = interfaceDescription.split('.');
        //var customerId = tokenizedDescription[0];
        //var ciuName = tokenizedDescription[1];
        
        //console.log("Value of 'customerId': " + customerId);
        //console.log("Value of 'ciuName': " + ciuName);
    }
	
	
	
	
	);   
//return isPortAllowed;	
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
}
,
getOption: function() {
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
                },
                {
                   option: 'MVPN Options'
                }
                
                
            ]
        });
        
        return optionStore;    
    },
validateAF: function() {
	var af1 = Ext.getCmp("af1").getValue();
	var af2 = Ext.getCmp("af2").getValue();
	var af3 = Ext.getCmp("af3").getValue();
	
	var isValid = false;
	
	if(parseInt(af1)== 0 || parseInt(af1)== 10 || parseInt(af1)== 20 || parseInt(af1)== 30 || parseInt(af1)== 40 || parseInt(af1)== 50 || parseInt(af1)== 60 || parseInt(af1)== 70 || parseInt(af1)== 80 || parseInt(af1)== 90 || parseInt(af1)== 100)
		isValid=  true;
	else
		return  false;	
	 if(parseInt(af2)== 0 || parseInt(af2)== 10 || parseInt(af2)== 20 || parseInt(af2)== 30 || parseInt(af2)== 40 || parseInt(af2)== 50 || parseInt(af2)== 60 || parseInt(af2)== 70 || parseInt(af2)== 80 || parseInt(af2)== 90 || parseInt(af2)== 100)
		isValid = true;
	else
		return  false;		
	 if(parseInt(af3)== 0 || parseInt(af3)== 10 || parseInt(af3)== 20 || parseInt(af3)== 30 || parseInt(af3)== 40 || parseInt(af3)== 50 || parseInt(af3)== 60 || parseInt(af3)== 70 || parseInt(af3)== 80 || parseInt(af3)== 90 || parseInt(af3)== 100)
		isValid = true;		
	else
		return false;
	
	console.log("isValid > "+isValid);	
	return isValid;
	
    }
});