/*
***************************************************
   DEVICE-TURNUP GUI SCRIPT

      > Support: Bhanu Singh
      > Company: Juniper Networks
      > Contact: bhanus@juniper.net
      > Version: 1.2            
      > Revision Date: 2015-04-14
      
      [Copyright 2009-2015 Juniper Networks, Inc.]
      [All rights reserved.]      
      
***************************************************
*/

Ext.ns("Jx.cpp.service");
var scriptObj = {};
scriptObj.namespace = 'Jx.cpp.service.l3vpn';
Ext.define('Jx.cpp.service.l3vpn', {
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
    hidden: false,
    width: 960,
    autoScroll: true,
	name:'l3vpnModify',
	x: 200,
    y: 20,
	title: 'L3VPN Service',
	FIELDSET_BACKGROUND_COLOR:'background-color:#F8F8F8',
	FIELDSET_WHITE_COLOR:'background-color:#FFFFFF',
	site: '', port: '', encapsulation: '',moid: '',
	isPortValid: false,

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
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            height: 221,
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
                                    height: 220,
                                    width: 300,
									maxWidth: 300,
									name: 'customerFieldset',
									id: 'customerFieldset',
                                    title: 'Customer Information',
									margin: '0 10 0 0',
									style: this.FIELDSET_BACKGROUND_COLOR,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            flex: 1,
                                            maxWidth: 220,
                                            width: 200,
											maxHeight: 25,
                                            fieldLabel: '<b>ID</b>',
											name: 'customerId',
											id: 'customerId',
											disabled: true,
											allowBlank: false,
											hideTrigger: true,
											keyNavEnabled: false,
											mouseWheelEnabled: false,
											listeners: {
											  specialkey: function(f,e){
												if (e.getKey() == e.ENTER) {
													//me.setFieldValue('customerName','Telus User');
													//me.setFieldValue('email','admin@telus.com');
													//me.setFieldValue('customerDescription','admin user');
												}
											  }
											}
                                        },
										{
                                            xtype: 'textfield',
                                            flex: 1,
                                            fieldLabel: 'Name',
											maxHeight: 25,
											name: 'customerName',
											id: 'customerName',
											readOnly: true,
											disabled: true
                                        },
                                        /*{
                                            xtype: 'textfield',
                                            flex: 1,
                                            //maxWidth: 250,
                                            fieldLabel: 'Email',
											maxHeight: 25,
											name: 'email',
											id: 'email',
											readOnly: true,
											disabled: true
                                        },*/
                                        {
                                            xtype: 'textareafield',
                                            flex: 1,
                                            height: 65,
                                            fieldLabel: 'Description',
											name: 'customerDescription',
											id: 'customerDescription',
											readOnly: true,
											disabled: true
                                        }
                                    ]
                                },
								{
				
													xtype: 'fieldset',
													height: 180,
													width: 350,
													layout: 'column',
													//title: 'IPv4 Prefix List',
													id: 'prefixListFieldSet1',
													itemId: 'prefixListFieldSet1',
													hidden: true,
													style: this.FIELDSET_BACKGROUND_COLOR,
												   items: [
														{
									  
														xtype: 'gridpanel',
														height: 170,
														margin: '0 0 0 0',
														id: 'prefixListGrid1',
														name: 'prefixListGrid1',
														//layout: 'fit',
														autoScroll: true,
														forceFit: true,
														width: 338,
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
																maxWidth: 310,
																width: 310,
																align: 'center',
																sortable: true,
																dataIndex: 'prefixList',
																text: ''
													}
												]
													
											}
										]
									},
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    height: 220,
									minWidth: 600,
                                    margin: '0 10 0 0',
                                    title: 'Service Details',
									name: 'serviceFieldset',
									id: 'serviceFieldset',
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
											margin: '0 80 0 0',
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
											xtype: 'combobox',
											flex: 1,
											fieldLabel: 'Topology',
											//labelSeparator: ' ',
											width: 220,
											labelWidth: 105,
											margin: '0 10 0 0',
											labelAlign: 'left',
											value: 'Mesh',
											//colspan:1,
											name: 'topology',
											id: 'topology',
											store: ['Mesh', 'Hub' , 'Spoke'],
											listeners: {
												render: function (field) {
														console.log("render");
															Ext.getCmp("rd").setValue("852:");
														},
												'change':function(list,record) {
												
													var topology = Ext.getCmp('topology').getValue();
													//var endPointType = Ext.getCmp('endPointType');
													//var values = [];
													//var siteInterfaceCount = Ext.ComponentQuery.query('gridpanel[name=siteInterfaceGrid]')[0].getStore().count();
													if(topology == 'Mesh'){
														Ext.getCmp("vpnName").setFieldLabel("VRF Name");
														//Ext.getCmp("AsRd").setFieldLabel("Route Distinguisher");
														Ext.getCmp("rd").setFieldLabel("Route Distinguisher");
														Ext.getCmp("spkVrfName").hide();
														//Ext.getCmp("AsRdSpk").hide();
														Ext.getCmp("spkRd").hide();
														Ext.getCmp("spkVrfId").hide();
														Ext.getCmp("spkVrfName").setDisabled(true);
														//Ext.getCmp("AsRdSpk").setDisabled(true);
														Ext.getCmp("spkRd").setDisabled(true);
														Ext.getCmp("spkVrfId").setDisabled(true);
														//Ext.getCmp("AsRd").setValue("852");
														Ext.getCmp("rd").setValue("852:");
													}if(topology == 'Hub'){
														Ext.getCmp("vpnName").setFieldLabel("Hub VRF Name");
														//Ext.getCmp("AsRd").setFieldLabel("Hub Route Distinguisher");
														Ext.getCmp("rd").setFieldLabel("Hub Route Distinguisher");
														Ext.getCmp("spkVrfName").show();
														//Ext.getCmp("AsRdSpk").show();
														Ext.getCmp("spkRd").show();
														Ext.getCmp("spkVrfId").show();
														Ext.getCmp("spkVrfName").setDisabled(false);
														//Ext.getCmp("AsRdSpk").setDisabled(false);
														Ext.getCmp("spkRd").setDisabled(false);
														Ext.getCmp("spkVrfId").setDisabled(false);
														//Ext.getCmp("AsRd").setValue("");
														Ext.getCmp("rd").setValue("");
													}if(topology == 'Spoke'){
														Ext.getCmp("vpnName").setFieldLabel("Hub VRF Name/ID");
														//Ext.getCmp("AsRd").setFieldLabel("Hub Route Distinguisher");
														Ext.getCmp("rd").setFieldLabel("Hub Route Distinguisher");
														Ext.getCmp("spkVrfName").show();
														//Ext.getCmp("AsRdSpk").show();
														Ext.getCmp("spkRd").show();
														Ext.getCmp("spkVrfId").hide();
														Ext.getCmp("spkVrfName").setDisabled(false);
														//Ext.getCmp("AsRdSpk").setDisabled(false);
														Ext.getCmp("spkRd").setDisabled(false);
														Ext.getCmp("spkVrfId").setDisabled(true);
														//Ext.getCmp("AsRd").setValue("");
														Ext.getCmp("rd").setValue("");
													}
												
												
											
												}
											}
										},
										{
											xtype:'label',
											text: "Service ID must be in the range 380000 to 389999",
											name: 'lblServiceId',
											id: 'lblServiceId',
											margin: '3 100 0 0',
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
											margin: '5 80 0 0',
											id: 'policyGroup',
											labelAlign: 'left',
											width: 220,
											labelWidth: 95,
											value: 'STD',
											store: ['STD','TQSTD','BVOIP','CNS3']
                                        },
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: '<b>VRF Name</b>',
											margin: '1 0 0 0',
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
											xtype: 'combobox',
											margin: '7 80 0 0',
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
															//var loopbackSubnetMask = Ext.getCmp('loopbackSubnetMask');
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
																//me.setFieldDisabled("management",true);																
															}													
														}
													}
										},
										{
											xtype: 'textfield',
											margin: '0 0 0 0',
											width: 258,
											labelWidth: 105,
											fieldLabel: 'Route Distinguisher',
											labelAlign: 'left',
											name: 'rd',
											id: 'rd',
											allowBlank: false,
											value: '852:',
											maskRe:/^[0-9 :]/,
											listeners: {
												blur : function() {
														//console.log("off focus ** ")
															var rd = Ext.getCmp("rd").getValue();
															//console.log("off focus ** "+rd);
															if(rd.split(":").length == 2 && rd.split(":")[0].length <=5 && rd.split(":")[1].length <=5 && rd.split(":")[0].length > 1 && rd.split(":")[1].length > 1){
																//do nothing
															}else{
																Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please enter a valid Route Distinguisher");
																Ext.getCmp('rd').focus(true, 200);
															return;
															}
															console.log("off focus ** ");
														}
											}
										},
										
										
										{
                                            xtype: 'textfield',
                                            flex: 1,
                                            fieldLabel: '<b>VPN Alias</b>',
											margin: '7 0 0 0',
											width: 278,
											labelWidth: 95,
											maxHeight: 23,
											height: 23,
											allowBlank: true,
											name: 'vpnAlias',
											maxLength:20,											
											id: 'vpnAlias',
											maskRe:/^[A-Za-z0-9 _-]/,
											hidden: true
                                        },
										{
                                            xtype: 'checkboxfield',
                                            id: 'enforceRoute',
											name: 'enforceRoute',
											margin: '9 5 0 0',
											labelAlign: 'left',
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
                                            margin: '9 95 0 0',
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
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: 'Spoke VRF Name',
											margin: '5 0 0 0',
											width: 258,
											labelWidth: 105,
											maxHeight: 23,
											height: 23,
											labelAlign: 'left',
											name: 'spkVrfName',
											id: 'spkVrfName',
											disabled: true,
											maxLength:20,
											maskRe:/^[A-Za-z0-9 _-]/,
											hidden: true
										},
                                        {
                                            xtype: 'combobox',
                                            flex: 1,
                                            fieldLabel: 'Application Type',
											name: 'application',
											margin: '11 80 0 0',
											value: 'GEN',
											id: 'application',
											width: 220,
											labelWidth: 95,
											//colspan:1,
											store: ['GEN']
											//store: ['GEN','UniCaaS']
                                        },
										{
											xtype: 'textfield',
											margin: '0 0 0 0',
											width: 258,
											labelWidth: 105,
											fieldLabel: 'Spoke Route Distinguisher',
											labelAlign: 'left',
											name: 'spkRd',
											id: 'spkRd',
											maskRe:/^[0-9 :]/,
											hidden: true,
											listeners: {
												blur : function() {
														//console.log("off focus ** ")
															var rd = Ext.getCmp("spkRd").getValue();
															//console.log("off focus ** "+rd);
															if(rd.split(":").length == 2 && rd.split(":")[0].length <=5 && rd.split(":")[1].length <=5 && rd.split(":")[0].length > 1 && rd.split(":")[1].length > 1){
																//do nothing
															}else{
																Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please enter a valid Route Distinguisher");
																Ext.getCmp('spkRd').focus(true, 200);
															return;
															}
															console.log("off focus ** ");
														}
											}
										},
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: 'Spoke Service ID',
											margin: '5 0 0 300',
											width: 258,
											labelWidth: 105,
											maxHeight: 23,
											height: 23,
											labelAlign: 'left',
											name: 'spkVrfId',
											id: 'spkVrfId',
											disabled: true,
											maxLength:20,
											maskRe:/^[A-Za-z0-9 _-]/,
											hidden: true
										},
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
                                        },
										{
											xtype: 'hiddenfield',
											name: 'oldAccessDetail',
											id: 'oldAccessDetail'
										},
										{
											xtype: 'hiddenfield',
											name: 'oldQoSOptionDetail',
											id: 'oldQoSOptionDetail'
										},
										{
											xtype: 'hiddenfield',
											name: 'oldEndpointType',
											id: 'oldEndpointType'
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
									name: 'nodeFieldset',
									id: 'nodeFieldset',
                                    title: 'Select Node',
									style: this.FIELDSET_BACKGROUND_COLOR,
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            height: 45,
                                            fieldLabel: '',
                                            items: [
                                              
												{
													xtype: 'textfield',
													flex: 1,
													fieldLabel: 'Site',
													margin: '5 0 0 0',
													labelWidth: 65,
													name: 'siteNameRO',
													id: 'siteNameRO',
													hidden: true,
													disabled: true										
												},
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
													//value: Ext.getCmp("deployedInterfacesGrid").getSelectionModel().getSelection()[0].data.moid,
													store: this.scriptUtils.getDeviceStore(commonData),
													queryMode: 'remote',
													editable: true,
													displayField: 'name',
													valueField: 'moid',
													listeners: {
														'select':function(list,record) {
															//var siteInterfaceGrid = Ext.ComponentQuery.query('gridpanel[name=siteInterfaceGrid]')[0];
															me.getHardwareModel(Ext.getCmp("siteName").getValue());
															me.getSoftwareVersion(Ext.getCmp("siteName").getValue());
															me.loadSiteInterfaceGrid(Ext.getCmp("siteName").getValue(),'');
															
															Ext.getCmp("csId").setDisabled(false);
															Ext.getCmp("isAF1Selected").setDisabled(false);
															Ext.getCmp("isAF2Selected").setDisabled(false);
															Ext.getCmp("isAF3Selected").setDisabled(false);
															Ext.getCmp("isAllAFSelected").setDisabled(false);
															//me.setFieldDisabled("classifier",false);	
														}
													}
													
                                                },
												{
													xtype: 'textfield',
													flex: 1,
													fieldLabel: 'Software Version',
													margin: '5 0 0 0',
													//maxHeight: 25,
													//maxWidth: 255,
													//width: 255,
													name: 'softwareVersion',
													id: 'softwareVersion',
													labelWidth: 100,
													readOnly: true,
													disabled: true,
													allowBlank: true,
													minLength:1//,
													//margin: '5 0 0 0'
												},
												{
													xtype: 'textfield',
													flex: 1,
													fieldLabel: 'Node Type',
													margin: '5 0 0 0',
													//maxHeight: 25,
													//maxWidth: 255,
													//width: 255,
													name: 'nodeType',
													id: 'nodeType',
													labelWidth: 100,
													readOnly: true,
													disabled: true,
													allowBlank: true,
													minLength:1//,
													//margin: '5 0 0 0'
												}
												
                                            ]
											
                                        }
										 
                                    ]
                                },
                                ,
								{
                                    xtype: 'fieldset',
                                    flex: 1,
                                    margins: '0 5 0 0',
                                    height: 220,
                                    maxHeight: 300,
									name: 'siteInterface',
									id: 'siteInterface',
                                    layout: 'fit',
                                    title: 'Select Port/LAG',
									style: this.FIELDSET_BACKGROUND_COLOR,
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            height: 230,
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
                                                            maxWidth: 100,
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
                                                            width: 80,
                                                            sortable: true,
                                                            dataIndex: 'speed',
                                                            text: 'Speed',
															flex:1	
                                                        }
                                                    ],
													listeners: {
															itemclick: function(dv, record, item, index, e) {
																console.log("item****************  "+item.cells[0]);
																Ext.ComponentQuery.query('#endpointPanel')[0].show();
																Ext.getCmp("lblIUnitDescription").setValue("");
																me.getSelectedSite(record);
																me.getInterfaceDescription(record.get('portName'), record.get('deviceId'));
																//Ext.getCmp("topologyFieldset").setDisabled(false);
																Ext.getCmp("rd").setDisabled(false);
																//var topology = Ext.getCmp('topology').getValue();
																
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
													fieldStyle: {
													 //'fontFamily'   : 'Garamond',
													 //'fontFamily'   : 'Calibri',
													 //'fontSize'     : '13px'
												   },
													
													style : {
														color : 'grey'
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
                                    height: 220,
                                    maxHeight: 300,
                                    maxWidth: 250,
                                    width: 250,
									name: 'accessDetailFieldset',
									id: 'accessDetailFieldset',
                                    title: 'Set Access Details',
									readOnly: true,
									style: this.FIELDSET_BACKGROUND_COLOR,
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            height: 45,
                                            fieldLabel: '',
                                            items: [
                                              
												{
													xtype: 'combobox',
													//margin: '10 10 0 0',
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
																 //console.log("connection type 11********: "+newValue);
																  pathPreference.setValue("Primary");
																	//me.setFieldDisabled("pathPreferences",true);	
																 }else{
																	//me.setFieldDisabled("pathPreferences",false);	
																 }
																}
															}
												},
												{
													xtype: 'combobox',
													//margin: '5 10 0 0',
													width: 220,
													//labelWidth: 75,
													fieldLabel: 'Access Type',
													labelWidth: 100,
													name: 'accessType',
													id: 'accessType',
													value: 'HS',
													store: ['HS'] 
													//store: ['HS', 'DSL'] 
												},
												{
													xtype: 'combobox',
													width: 220,
													labelWidth: 100,
													fieldLabel: 'Port Speed',
													name: 'portSpeed',
													id: 'portSpeed',
													store: '' ,
													queryMode: 'local',
													editable: true,
													displayField: 'displayText',
													valueField: 'valueText'
												},
											   {
													xtype: 'combobox',
													margin: '10 10 0 0',
													width: 220,
													//labelWidth: 130,
													fieldLabel: '<b>Path Preference</b>',
													labelWidth: 100,
													//labelAlign: 'right',
													name: 'pathPreferences',
													id: 'pathPreferences',
													value: 'Primary',
													maxLength:15,
													store: ['Primary', 'Secondary'] 
												},
												{
												xtype: 'textfield',
												width: 1,
												name: 'oldEndPointServiceType',
												id: 'oldEndPointServiceType',
												hidden: true
												},
												{
                                                    xtype: 'combobox',
                                                    fieldLabel: 'Admin State',
													margin: '10 0 0 0',
                                                    boxLabel: '',
													name: 'adminState',
													id: 'adminState',
													value: 'Down',
													width: 170,
													labelWidth: 100,
													store: [['Up','Up'],['Down','Down']]
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
													hidden: true
												},
												{
                                                    xtype: 'checkboxfield',
													margin: '10 0 0 0',
                                                    fieldLabel: 'Auto Negotiate',
                                                    boxLabel: '',
													name: 'autonegotiate',
													id: 'autonegotiate',
													labelWidth: 100
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
                            //height: 550, //650
							 height:'auto !important',
							width: 900,
							id: 'endpointPanel',
                            //hidden: true,
                            //title: '',
							animCollapse: false,
                            collapsed: false,
                            collapsible: false,
							preventHeader: true ,
							style: this.FIELDSET_BACKGROUND_COLOR,
                            items: [
								{
									xtype: 'container',
                                    flex: 1,
									//height: 525,
									height:'auto !important',
									width: 900,
									style: this.FIELDSET_BACKGROUND_COLOR,
                                    items: [
									{
                                    xtype: 'panel',
									animCollapse: false,
									collapsed: false,
									collapsible: false,
                                    height: 125,
                                    width: 900,
									layout: 'column',
                                    
                                    title: 'L3 Interface Options',
									id: 'accessOptionGrid',
                                    itemId: 'accessOptionGrid',
									//hidden: true,
									style: this.FIELDSET_BACKGROUND_COLOR,
                                    items: [
										
										{
											xtype:'textfield',
											fieldLabel: 'L3 Interface Description',
											labelWidth: 135,
											//height: 70,
											width: 875,
											disabled: true,
											readOnly: true,
											name: 'lblIUnitDescription',
											id: 'lblIUnitDescription',
											margin: '5 0 0 10',
											readOnly: true,
											fieldStyle: {
											 //'fontFamily'   : 'Garamond',
											 //'fontFamily'   : 'Calibri',
											 //'fontSize'     : '13px'
										   },
											
											style : {
												color : 'grey'
											}
										 },
										{
                                            xtype: 'numberfield',
                                            margin: '8 10 0 10',
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

											maskRe:/^[0-9]/
                                        },
										{
                                            xtype: 'numberfield',
                                            margin: '8 3 0 0',
                                            width: 110,
											labelWidth: 40,
                                            fieldLabel: '<b>VLAN</b>',
											name: 'vlanId',
											id: 'vlanId',
                                            labelAlign: 'left',
											minValue: 1,
											maxValue: 4096,
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
                                            xtype: 'hiddenfield',
                                            fieldLabel: 'VLAN',
											name: 'oldVlanId',
											id: 'oldVlanId'

                                        },
										{
											xtype: 'button',
											text: 'Validate',
											name: 'validateBtn',
											id: 'validateBtn',
											margin: '8 10 0 0',
											tooltip: 'Validate Vlan',
											handler: function(button, event) {
												var vlanId = Ext.getCmp('vlanId').getValue();
												console.log("vlanId "+vlanId);
												me.validateVLAN(vlanId);
											}
										},
                                        {
                                            xtype: 'textfield',
                                            margin: '8 10 0 0',
                                            width: 230,
											maxWidth: 230,
                                            fieldLabel: '<b>IPv4 Address/Mask</b>',
											labelWidth: 125,
                                            name: 'ipAddress',
											id: 'ipAddress',
											allowBlank: false,
											//vtype:'IPAddress',
											listeners: {
											blur : function() {
												var ipAddress = Ext.getCmp("ipAddress").getValue();
																	
												if(ipAddress !='' && ipAddress != null && ipAddress.split(".").length == 4 && (parseInt(ipAddress.split(".")[0]) > 0 && parseInt(ipAddress.split(".")[0]) < 256 && !isNaN(ipAddress.split(".")[0]) && parseInt(ipAddress.split(".")[1]) >= 0 && parseInt(ipAddress.split(".")[1]) < 256 && !isNaN(ipAddress.split(".")[1]) && parseInt(ipAddress.split(".")[2]) >= 0 && parseInt(ipAddress.split(".")[2]) < 256 && !isNaN(ipAddress.split(".")[2]) && parseInt(ipAddress.split(".")[3]) >= 0 && parseInt(ipAddress.split(".")[3]) < 256 && !isNaN(ipAddress.split(".")[3]))){
													//return  true;
												} else {
													 Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Error: valid value is xxx.xxx.xxx.xxx");
												}
																	
												 if(ipAddress.split(".").length == 4){
												 if(me.validateIpAddress()){
														Ext.getCmp("neighbourAddress").setValue("");
													  return;
												   };
													 var subnetMask = Ext.getCmp("subnetMask").getValue();
													 me.getNetworkAddress(ipAddress, subnetMask);
													 var broadcastAddress = me.getBroadcastAddress(ipAddress, subnetMask);
													 
													 //var startRange = networkAddress.split(".")[3];
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
											},
											'change':function(list,record) {
												 
												}
												
											}
									    },
                                        {
                                            xtype: 'label',
                                            margin: '11 4 0 0',
											width: 3,
											maxWidth: 3,
                                            text: '/'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            margin: '8 10 0 0',
                                            width: 30,
											maxWidth: 30,
                                            labelSeparator: ' ',
                                            name: 'subnetMask',
											id: 'subnetMask',
											allowBlank: false,
											
											//fieldLabel: '/',
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
													 me.getNetworkAddress(ipAddress, subnetMask);
													 var broadcastAddress = me.getBroadcastAddress(ipAddress, subnetMask);
													 
													// var startRange = networkAddress.split(".")[3];
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
                                            xtype: 'hiddenfield',
                                            name: 'oldIPV4AddressAndMask',
											id: 'oldIPV4AddressAndMask',
                                        },
                                        {
                                            xtype: 'combobox',
                                            margin: '8 50 10 0',
                                            width: 132,
											fieldLabel: 'IP MTU',
                                            labelWidth: 53,
											value: '1500',
											hidden: true,
											labelAlign: 'right',
											name: 'ipMTU',
											id: 'ipMTU',
											store: ['1500', '3000'] 
                                        },
										{
											xtype: 'label',
											flex: 1,
											width: 186,
											margin: '8 50 10 0',
											text: '.',
											style : {
												//background : '#F8F8F8',
												color : '#F8F8F8'
											}
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
											//hidden: true,
											
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
                                            margin: '5 10 0 0',
											width: 430,
											maxWidth: 430,
											labelWidth: 150,
                                            fieldLabel: 'RE IPv6 Address/Mask',
											labelAlign: 'right',
											name: 'ipv6Address',
											id: 'ipv6Address',
											//maxLength:15,
                                            enforceMaxLength: true,
											hidden: true
											
                                        },
										{
											xtype: 'combobox',
											flex: 1,
											margin: '5 0 0 0',
											width: 220,
											maxWidth: 220,
											fieldLabel: 'Operational Mode',
											emptyText:'Select',
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
													Ext.getCmp('operationalMode').setValue("PEN");
												},
												load: function () {
												console.log("load");
													var combo = Ext.getCmp('operationalMode');
													combo.setValue("PEN");
												},
												'select':function(list,record) {
													//var siteInterfaceGrid = Ext.ComponentQuery.query('gridpanel[name=siteInterfaceGrid]')[0];
													//me.loadSiteInterfaceGrid(Ext.getCmp("siteName").getValue());
													
													var operationalMode = Ext.getCmp('operationalMode').getValue();
													if( operationalMode == 'TST'){
													Ext.getCmp("prefixDetailBtn").show();
													console.log("operationalMode> selected > "+operationalMode);
														//Ext.getCmp("prefixListGrid1").getStore().removeAll();
														//var win = this.up('window').openPrefixListWindow();//grid, rowIndex, colIndex
														//win.show();			
													}else{
														Ext.getCmp("prefixDetailBtn").hide();
													}													
												}
											}
											
										},
										{
											xtype: 'button',
											text: 'Performance Prefixes',
											name: 'prefixDetailBtn',
											margin: '3 0 0 0',
											id: 'prefixDetailBtn',
											tooltip: '',
											hidden: true,
											//icon: '../serviceuicommon/images/cpp/Settings_16x16.png',
											//width: 20,
											//margin: '0 0 0 0',
											
											
											handler: function(button, event) {
												var operationalMode = Ext.getCmp('operationalMode').getValue();
													if( operationalMode == 'TST'){
													console.log("operationalMode> selected > "+operationalMode);
														//Ext.getCmp("prefixListGrid1").getStore().removeAll();
														var win = this.up('window').openPrefixListWindow();//grid, rowIndex, colIndex
														win.show();			
													}	
											}
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
                                    height: 60,
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
											//minValue: 64512,
											//maxValue: 65534,
											hideTrigger: true,
											keyNavEnabled: false,
											mouseWheelEnabled: false,
											
											listeners: {
												
											}
                                        },
                                        {
                                            xtype: 'hiddenfield',
                                            name: 'oldRT',
											id: 'oldRT'

                                        },
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
                                            width: 205,
											maxWidth: 205,
                                            fieldLabel: '<b>IPv4 Neighbour</b>',
											labelWidth: 100,
                                            name: 'neighbourAddress',
											id: 'neighbourAddress',
											allowBlank: false,
											vtype:'IPAddress'
                                        },
										{
                                            xtype: 'textfield',
                                            margin: '10 0 0 0',
                                            width: 310,
											maxWidth: 310,
                                            fieldLabel: 'CIU IPv6 Address',
											labelWidth: 100,
                                            name: 'nextHOP',
											id: 'nextHOP',
											hidden: true											
										},
										{
                                            xtype: 'hiddenfield',
                                            fieldLabel: 'Address',
											name: 'oldNeighbourAddress',
											id: 'oldNeighbourAddress'

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
											//vtype: 'IPAddress'
											listeners: {
											blur : function() {
												var ipAddress = Ext.getCmp("ciuLoopback").getValue();
																
												if(ipAddress !='' && ipAddress != null && ipAddress.split(".").length == 4 && (parseInt(ipAddress.split(".")[0]) > 0 && parseInt(ipAddress.split(".")[0]) < 256 && !isNaN(ipAddress.split(".")[0]) && parseInt(ipAddress.split(".")[1]) >= 0 && parseInt(ipAddress.split(".")[1]) < 256 && !isNaN(ipAddress.split(".")[1]) && parseInt(ipAddress.split(".")[2]) >= 0 && parseInt(ipAddress.split(".")[2]) < 256 && !isNaN(ipAddress.split(".")[2]) && parseInt(ipAddress.split(".")[3]) >= 0 && parseInt(ipAddress.split(".")[3]) < 256 && !isNaN(ipAddress.split(".")[3]))){
													//return  true;
												} else {
													 Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Error: valid value is xxx.xxx.xxx.xxx");
												}
													
											},
											'change':function(list,record) {
												 
												}
												
											}
									   },
									   {
                                            xtype: 'hiddenfield',
                                            fieldLabel: 'Address',
											name: 'oldCiuLoopback',
											id: 'oldCiuLoopback'

                                        },
										{
                                            xtype: 'label',
                                            margin: '0 2 0 0',
											width: 2,
											maxWidth: 2,
                                            text: '/',
											hidden: true
                                        },
										{
                                            xtype: 'numberfield',
                                            margin: '5 10 0 0',
                                            width: 30,
											maxWidth: 30,
                                            labelSeparator: ' ',
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
                                            margin: '5 10 0 0',
                                            width: 250,
											labelWidth: 65,
                                            fieldLabel: '<b>CIU Name</b>',
											name: 'ciuName',
											id: 'ciuName',
											maxLength: 26,
											allowBlank: false,
											enableKeyEvents: true,
											maskRe:/^[A-Za-z0-9 _-]/,
											//vtype: 'AlphaUnderscore',
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
                                            margin: '5 50 0 0',
                                            width: 320,
											labelWidth: 65,
											fieldLabel: 'CIU Alias',
											name: 'ciuAlias',
											id: 'ciuAlias',
											maskRe:/^[A-Za-z0-9 :_-]/,
											//vtype: 'alphanum',
											maxLength: 26
                                        },
										{
                                            xtype: 'checkboxfield',
                                            id: 'management',
											name: 'management',
                                            margin: '15 10 0 10',
											width: 110,
											maxWidth: 110,
											labelWidth: 80,
											//disabled: true,
                                            fieldLabel: 'Management',
                                            boxLabel: ''/*,
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
											}*/
                                        },
										{
                                            xtype: 'textfield',
                                            margin: '15 10 0 10',
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
                                            margin: '15 0 0 0',
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
												//margin: '0 0 0 0',
												flex: 1,
												width: 190,
												fieldLabel: '<b>QoS Type</b>',
												labelWidth: 60,
												margin: '5 10 0 10',
												labelAlign: 'left',
												//colspan:1,
												disabled: true,
												id: 'qosType',
												value: 'QoS per Access',
												store: ['QoS per Access', 'QoS per VPN'],
												listeners: {
															 change: function(field, newValue, oldValue) {
															 console.log("connection type********: "+newValue);
															 
															 //var pathPreference = Ext.getCmp("pathPreferences");
															 
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
                                            fieldLabel: '<b>VPN Speed</b>',
											name: 'vpnSpeed',
											id: 'vpnSpeed',
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
													
													//me.setFieldDisabled("efRate",false);	
												}
												else if (this.checkValue == false) {
													//me.setFieldDisabled("efRate",true);	
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
										{	xtype: 'hiddenfield',
											name: 'oldEFRate',
											id: 'oldEFRate'
										},
										{
                                            xtype: 'checkboxfield',
                                            id: 'beService',
											name: 'beService',
                                            margin: '5 185 11 10',
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
											//disabled: true,
											store: this.getClassifier(),
											value: 'DSCP',
											queryMode: 'local',
											displayField: 'displayText',
											valueField: 'valueText',
											name: 'classifier',
											id: 'classifier',
											listeners: {
														 change: function(field, newValue, oldValue) {
														 console.log("selected classifier** "+newValue);
														 console.log("ciu is multivrf? ** "+Ext.getCmp("ciuName").disabled);
														 if(newValue == '802.1ad'){
															//Ext.getCmp("isAllAFSelected").setValue(true);
															//me.setFieldDisabled("isAllAFSelected",true);	
															
															//me.setFieldDisabled("beService",false);	
															Ext.getCmp("beService").setValue(true);
															}
														else{
															//Ext.getCmp("isAllAFSelected").setValue(false);
															if(Ext.getCmp("ciuName").disabled){
																//me.setFieldDisabled("isAllAFSelected",false);	
																//me.setFieldDisabled("beService",true);	
																Ext.getCmp("beService").setValue(false);
																}
															}	
														}
													}
												
                                        },
										{
                                            xtype: 'checkboxfield',
                                            id: 'isAllAFSelected',
											name: 'isAllAFSelected',
                                            margin: '15 30 0 0',
											disabled: true,
											width: 130,
											labelWidth: 111,
											fieldLabel: '<b>AF3%/AF2%/AF1%</b>',
                                            boxLabel: '',
											scope: this,
												handler: function (field, value) {
													scope: this,
													this.checkValue = field.getValue();
													console.log(this.checkValue);
													if(!Ext.getCmp("qosType").disabled){
														if (this.checkValue == true) {
														console.log("ALL AF checked");
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
                                            minValue: 10,
											step: 10
                                        },
										{
                                            xtype: 'checkboxfield',
                                            id: 'isAF3Selected',
											name: 'isAF3Selected',
                                            margin: '15 10 10 0',
											width: 25,
											labelWidth: 15,
                                            disabled: true,
                                            boxLabel: '',
											scope: this,
											handler: function (field, value) {
												scope: this,
												this.checkValue = field.getValue();
												console.log(this.checkValue);
												var isAllAFSelected = Ext.getCmp("isAllAFSelected").getValue();
												if(!Ext.getCmp("qosType").disabled){
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
											decimalPrecision:0,
                                            labelWidth: 40,
											name: 'af2',
											id: 'af2',
											disabled: true,
											maxValue: 100,
                                            minValue: 10,
											step: 10
                                        },
										{
                                            xtype: 'checkboxfield',
                                            id: 'isAF2Selected',
											name: 'isAF2Selected',
                                            margin: '15 5 0 0',
											width: 25,
											labelWidth: 15,
                                            disabled: true,
                                            boxLabel: '',
											scope: this,
											handler: function (field, value) {
												scope: this,
												this.checkValue = field.getValue();
												console.log(this.checkValue);
												var isAllAFSelected = Ext.getCmp("isAllAFSelected").getValue();
												if(!Ext.getCmp("qosType").disabled){
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
											}
                                        },
										{
                                            xtype: 'numberfield',
                                            margin: '15 5 0 0',
                                            width: 50,
                                            fieldLabel: '',//AF1%
											labelSeparator: ' ',
											decimalPrecision:0,
                                            //labelWidth: 40,
											decimalPrecision:0,
											name: 'af1',
											id: 'af1',
											disabled: true,
											maxValue: 100,
                                            minValue: 10,
											step: 10
                                        },
										{
                                            xtype: 'checkboxfield',
                                            id: 'isAF1Selected',
											name: 'isAF1Selected',
                                            margin: '15 0 10 0',
											width: 25,
											labelWidth: 15,
                                            disabled: true,
                                            boxLabel: '',
											scope: this,
											handler: function (field, value) {
												scope: this,
												this.checkValue = field.getValue();
												console.log(this.checkValue);
												var isAllAFSelected = Ext.getCmp("isAllAFSelected").getValue();
												if(!Ext.getCmp("qosType").disabled){
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
                                    text: 'Delete L3 Interface',
									name: 'deleteBtn',
									id: 'deleteBtn',
									hidden: true,
									width: 170,
                                    margin: 5,
									handler: function(button, event) {
                                        me.handleDeleteStagedInterface();
                                    }
                                },
								{
									xtype: 'button',
									width: 100,
									id: 'clearAddSiteInterfacePanelButton',
									text: 'Reset',
									hidden: true,
									tooltip: 'Clear Panel Entries',
									handler: function(button, event) {
										me.handleClearAddSiteInterfacePanelButton();
									}
								},
								{
									xtype: 'hiddenfield',
									name: 'isDeployedUpdated',
									id: 'isDeployedUpdated'
								}
                            ]
                        },
						{
                            xtype: 'fieldset',
                            height: 150,
                            width: 900,
                            title: 'Deployed Interfaces',
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
									height: 148,
                                    headerPosition: 'right',
                                    activeTab: 0,
									style: this.FIELDSET_BACKGROUND_COLOR,
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            title: '',
											layout: 'fit',
											//tabConfig: {
                                              //  xtype: 'tab',
                                                //width: 70
                                            //},
											style: this.FIELDSET_BACKGROUND_COLOR,
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    height: 135,
													name: 'deployedInterfacesGrid',
                                                    id: 'deployedInterfacesGrid',
                                                    maxHeight: 135,
													layout: 'fit',
                                                    maxWidth: 875,
                                                    width: 875,
                                                    title: '',
													columnLines: true,
													hideHeaders: false,
                                                    forceFit: true,
                                                    store: this.provisionedInterfacesGridStore(),
													style: this.FIELDSET_BACKGROUND_COLOR,
													plugins:[Ext.create('Ext.ux.grid.JxFilterRow', {
														remoteFilter:false,
														
													})],
													columns: [
														{
															xtype: 'gridcolumn',
															hidden: true,
															hideable: false,
															dataIndex: 'pedeviceId'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: 'IP Address',
															dataIndex: 'ipAddress',
															hidden: true,
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: 'IP Address',
															maxWidth: 120,
															dataIndex: 'ipAddressAndMask'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															align: 'center',
															dataIndex: 'port',
															//hideable: false,
															maxWidth: 90,
															text: 'Port',
															hidden: false
														},
														{
                                                            xtype: 'gridcolumn',
                                                            text: 'CIU Name',
                                                            align: 'center',
                                                            dataIndex: 'ciuName',
															maxWidth: 180
                                                        },
														{
                                                            xtype: 'gridcolumn',
                                                            text: 'CIU Alias',
                                                            align: 'center',
                                                            dataIndex: 'ciuAlias',
															maxWidth: 180
                                                        },
														
														{
															xtype: 'gridcolumn',
															sortable: true,
															align: 'center',
															dataIndex: 'site',
															text: 'Site Name',
															hidden: false,
															hideable:false,
															maxWidth: 130,
														},
														{
															xtype: 'gridcolumn',
															//maxWidth: 70,
															align: 'center',
															sortable: true,
															dataIndex: 'endPointServiceType',
															text: 'Service Type',
															maxWidth: 90,
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
                                                            dataIndex: 'accessType',
															maxWidth: 90
                                                        },
														{
                                                            xtype: 'gridcolumn',
                                                            align: 'center',
                                                            dataIndex: 'portSpeed',
															hidden: true
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
															sortable: true,
															editable: true,
															align: 'center',
															dataIndex: 'vlanId',
															hidden: true,
															text: 'VLAN'
                                                            
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
															dataIndex: 'operationalMode'
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
															dataIndex: 'oldQosType'
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
														/*{
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
														},*/
														{
															xtype: 'gridcolumn',
															align: 'center',
															dataIndex: 'oldEndPointServiceType',
															text: 'Service Type',
															hidden: true
														},
														{
                                                            xtype: 'gridcolumn',
                                                            text: 'CIU LB',
                                                            align: 'center',
                                                            dataIndex: 'oldCiuLoopback',
                                                            hidden: true
                                                        },
														{
															xtype: 'gridcolumn',
															sortable: true,
															editable: true,
															dataIndex: 'oldVlanId',
															hidden: true
                                                            
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: 'IP Address',
															//align: 'center',
															editable: true,
															dataIndex: 'oldIPV4AddressAndMask',
															hidden: true
														},																
														{
															xtype: 'gridcolumn',
															text: 'Neighbour Address',
															dataIndex: 'oldNeighbourAddress',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR
														},
														
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: '',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'oldRT'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: '',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'oldAccessDetail'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: '',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'oldQoSOptionDetail'
														}
														,
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: '',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'oldEFRate'
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
                                                            dataIndex: 'deployedInterface',
															hidden: true
                                                        },
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: '',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'prefixList'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: '',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'prefixListBeforeUpdate'
														},
														{
															xtype: 'gridcolumn',
															align: 'center',
															dataIndex: 'management',
															hidden: true
														}

														
													],
													listeners: {
															itemdblclick: function(dv, record, item, index, e) {
															console.log("hello**********************************");
															console.log("selected row1 : "+index);
															console.log("port : "+record.get('port'));
															//me.getInterfaceDescription(record.get('port'), record.get('moid'));
															//me.getInterfaceDescription(record.get('port'), record.get('moid'));
															//me.getMultiVRFDetails(record.get('port'));
															me.getUnitDescription(record.get('port'), record.get('vlanId'),record.get('moid'));
															
															var dataForDisplay = record.get('dataForDisplay');
															if(dataForDisplay != undefined){
																var displayData = dataForDisplay.split("|");
																//softwareVersion + "|"+ nodeType + "|" + siteName;	
																Ext.getCmp("siteNameRO").setValue(record.get('site'));
																Ext.getCmp("softwareVersion").setValue(displayData[0]);
																Ext.getCmp("nodeType").setValue(displayData[1]);
																Ext.getCmp("siteNameRO").setValue(displayData[2]);
																Ext.getCmp("lblInterfaceDescription").setValue(displayData[3]);
															}
															var csId = record.get('csId');
															var ciuName = record.get('ciuName');
															var accessType = record.get('accessType');
															var accessRate = record.get('accessRate');
															var endPointServiceType = record.get('endPointServiceType');
															var application = Ext.getCmp('application').getValue();
															var protocol = (record.get('ipv6Peer') == true) ? 'MV6' : 'MV4';
															var topology = record.get('topology');
															var vrfName = '';
															if(topology == 'Mesh'){
																vrfName = record.get('vrfName');
															}else if(topology == 'Hub'){
																vrfName = record.get('vrfName');
															}else if(topology == 'Spoke'){
																vrfName = record.get('spkVrfName');
															}
															var pathPreferences = record.get('pathPreferences');
															var vpnSpeed = record.get('vpnSpeed') == undefined ? '' : record.get('vpnSpeed');
															var architecture = 'JCE';
															var connectionnType = (record.get('connectionType') == 'RE Direct') ? 'REDI' : 'REDU';
															var policyGroup = record.get('policyGroup');
															var operationalMode = record.get('operationalMode');
															var ciuAlias = record.get('ciuAlias');
															
															var unitDescription = csId + "." + ciuName + "." + accessType + "." + accessRate + "." + endPointServiceType + "." + application + "." + protocol + "." + vrfName + "." + pathPreferences + "." + vpnSpeed +"." + architecture + "." + connectionnType + "." +policyGroup + "." + operationalMode + "." + ciuAlias;
															
															console.log("unitDescription >: "+unitDescription);
															
															Ext.getCmp("lblIUnitDescription").setValue(unitDescription);
															
															
															console.log("moid******************: "+record.get('moid'));
															Ext.getCmp("siteName").setValue(record.get('moid'));	
															Ext.getCmp("isDeployedUpdated").setValue("true");
															Ext.getCmp("endpointPanel").setDisabled(false);
															Ext.getCmp('spkVrfId').setDisabled(false);
															Ext.getCmp('spkVrfName').setDisabled(false);
															Ext.getCmp('siteName').setDisabled(false);
															Ext.getCmp('csId').setDisabled(false);
															Ext.getCmp('vlanId').setDisabled(false);
															Ext.getCmp('ipAddress').setDisabled(false);
															Ext.getCmp('peerAS').setDisabled(false);
															Ext.getCmp('neighbourAddress').setDisabled(false);
															Ext.getCmp('ciuLoopback').setDisabled(false);
															//Ext.getCmp('ciuName').setDisabled(false);
															Ext.getCmp('accessRate').setDisabled(false);
															Ext.getCmp("portSpeed").setDisabled(true);
															
															Ext.getCmp('csId').setDisabled(true);
															Ext.getCmp('localPref').setDisabled(true);
															Ext.getCmp('med').setDisabled(true);
															Ext.getCmp('ciuName').setDisabled(true);
															Ext.getCmp('ciuAlias').setDisabled(true);
															
															/////Ext.getCmp('af1').setDisabled(true);
															/////Ext.getCmp('af2').setDisabled(true);
															/////Ext.getCmp('af3').setDisabled(true);
															/////Ext.getCmp('isAF1Selected').setDisabled(true);
															/////Ext.getCmp('isAF2Selected').setDisabled(true);
															/////Ext.getCmp('isAF3Selected').setDisabled(true);
															/////Ext.getCmp('isAllAFSelected').setDisabled(true);
													 
															Ext.getCmp('qosType').setDisabled(true);
															
															var portCombo = Ext.getCmp("portSpeed");
															//childCombo.clearValue();
															portCombo.getStore().removeAll();
															var portName = record.get('port');
															
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
																	
															
															var endpointPanel = Ext.ComponentQuery.query('#endpointPanel')[0];
															endpointPanel.show();
															//var topology = Ext.getCmp("topology").getValue();
															
															Ext.getCmp("autonegotiate").setValue(record.get('autonegotiate'));	
															Ext.getCmp("adminState").setValue(record.get('adminState'));
															Ext.getCmp("operationalMode").setValue(record.get('operationalMode'));
															Ext.getCmp("nextHOP").setValue(record.get('nextHOP'));
															Ext.getCmp("multiVRF").setValue(record.get('multiVRF'));
															Ext.getCmp("firstUnitForVRF").setValue(record.get('firstUnitForVRF'));
															Ext.getCmp("traficControlProfile").setValue(record.get('traficControlProfile'));
															Ext.getCmp("qosType").setValue(record.get('qosType'));
															Ext.getCmp("oldAccessDetail").setValue(record.get('oldAccessDetail'));
															Ext.getCmp("oldQoSOptionDetail").setValue(record.get('oldQoSOptionDetail'));
															
															Ext.getCmp("oldEndpointType").setValue(record.get('oldEndpointType'));
															Ext.getCmp("vpnAlias").setValue(record.get('vpnAlias'));
															Ext.getCmp("policyGroup").setValue(record.get('policyGroup'));
															Ext.getCmp("vpnSpeed").setValue(record.get('vpnRate'));
															
															Ext.getCmp("management").setValue(record.get('management'));
															
															me.setFieldDisabled('ipAddress',true);
															me.setFieldDisabled('subnetMask',true);
															me.setFieldDisabled('vlanId',true);
															me.setFieldDisabled('neighbourAddress',true);
															//me.setFieldDisabled('rt',true);
															//me.setFieldDisabled('rtHub',true);
															//me.setFieldDisabled('rtSpoke',true);
															me.setFieldDisabled('ciuLoopback',true);
															me.setFieldDisabled('loopbackSubnetMask',true);
															var updateBtn = Ext.getCmp('updateBtn');
															updateBtn.show();
															Ext.getCmp('deleteBtn').show();
															
															var interfacegrid = Ext.ComponentQuery.query('gridpanel[name=siteInterfaceGrid]')[0];
															interfacegrid.setDisabled(true);
															
															//me.setFieldDisabled('siteInterface',true);
															var stageBtn = Ext.getCmp('stageBtn');
															
															var clearInactiveEntriesFromListButton = Ext.getCmp('clearInactiveEntriesFromListButton');
															clearInactiveEntriesFromListButton.hide();
															
															var operationalMode = record.get('operationalMode');
															//Ext.getCmp("prefixListGrid1").getStore().removeAll();
															if(operationalMode == 'TST'){
																Ext.getCmp("operationalMode").setValue(record.get('operationalMode'));
																Ext.getCmp("prefixDetailBtn").show();
																if(record.get('prefixList').length !=undefined)	{	
																	for (var i=0; i< record.get('prefixList').length; i++) {
																		console.log("prefixList "+ record.get('prefixList')[i].prefixList);
																			Ext.getCmp("prefixListGrid1").getStore().add({
																				prefixList: record.get('prefixList')[i].prefixList
																			
																			}); 
																		}
																	}else{
																		Ext.getCmp("prefixListGrid1").getStore().add({
																			prefixList: record.get('prefixList').prefixList
																		
																		}); 
																	}
																	Ext.getCmp("prefixListGrid1").getView().refresh();	
																}
															
															//Ext.getCmp('topology').setDisabled(false);
															me.setFieldDisabled('topology',true);
															
															Ext.getCmp("endPointServiceType").setValue(record.get('endPointServiceType'));
															Ext.getCmp("oldEndPointServiceType").setValue(record.get('oldEndPointServiceType'));

															Ext.getCmp("ciuLoopback").setValue(record.get('ciuLoopback'));
															Ext.getCmp("oldCiuLoopback").setValue(record.get('oldCiuLoopback'));
															
															Ext.getCmp("ciuName").setValue(record.get('ciuName'));
															Ext.getCmp("ciuAlias").setValue(record.get('ciuAlias'));
															Ext.getCmp("accessType").setValue(record.get('accessType'));
															Ext.getCmp("portSpeed").setValue(record.get('portSpeed'));
															Ext.getCmp("connectionType").setValue(record.get('connectionType'));
															Ext.getCmp("csId").setValue(record.get('csId'));
															Ext.getCmp("pathPreferences").setValue(record.get('pathPreferences'));
															Ext.getCmp("vlanId").setValue(record.get('vlanId'));
															Ext.getCmp("oldVlanId").setValue(record.get('vlanId'));
															Ext.getCmp("ipAddress").setValue(record.get('ipAddress'));
															//Ext.getCmp("ipAddressAndMask").setValue(record.get('ipAddressAndMask'));
															Ext.getCmp("oldIPV4AddressAndMask").setValue(record.get('oldIPV4AddressAndMask'));
															Ext.getCmp("neighbourAddress").setValue(record.get('neighbourAddress'));
															Ext.getCmp("oldNeighbourAddress").setValue(record.get('oldNeighbourAddress'));

															Ext.getCmp("subnetMask").setValue(record.get('subnetMask'));
															Ext.getCmp("loopbackSubnetMask").setValue(record.get('loopbackSubnetMask'));
															Ext.getCmp("ipMTU").setValue(record.get('ipMTU'));
															
															Ext.getCmp("ipv6Peer").setValue(record.get('ipv6Peer'));
															var ipv6Address =Ext.getCmp("ipv6Address").setValue(record.get('ipv6Address'));
															
															console.log("ipv6Address .  "+ipv6Address);
															//var mvpn =  Ext.getCmp('mvpn').checkboxCmp.getValue();
															Ext.getCmp("rd").setValue(record.get('rd'));
															Ext.getCmp("neighbourAddress").setValue(record.get('neighbourAddress'));
															Ext.getCmp("localPref").setValue(record.get('localPref'));
															Ext.getCmp("med").setValue(record.get('med'));
															Ext.getCmp("peerAS").setValue(record.get('peerAS'));
															//var rt =Ext.getCmp("rt").setValue(record.get('rt'));
															Ext.getCmp("oldRT").setValue(record.get('oldRT'));
															Ext.getCmp("spkVrfName").setValue(record.get('spkVrfName'));
															//Ext.getCmp("AsRdSpk").setValue(record.get('AsRdSpk'));
															//Ext.getCmp("AsRd").setValue(record.get('AsRd'));
															Ext.getCmp("spkRd").setValue(record.get('spkRd'));
															Ext.getCmp("spkVrfId").setValue(record.get('spkVrfId'));
															
															var topology = record.get('topology');
															Ext.getCmp("topology").setValue(topology);
															if(topology == 'Mesh'){
																Ext.getCmp("vpnName").setFieldLabel("VRF Name");
																Ext.getCmp("rd").setFieldLabel("Route Distinguisher");
																Ext.getCmp("spkVrfName").hide();
																//Ext.getCmp("AsRdSpk").hide();
																Ext.getCmp("spkRd").hide();
																Ext.getCmp("spkVrfId").hide();
																Ext.getCmp("spkVrfName").setDisabled(true);
																//Ext.getCmp("AsRdSpk").setDisabled(true);
																Ext.getCmp("spkRd").setDisabled(true);
																Ext.getCmp("spkVrfId").setDisabled(true);
															}if(topology == 'Hub'){
																Ext.getCmp("vpnName").setFieldLabel("Hub VRF Name");
																Ext.getCmp("rd").setFieldLabel("Hub Route Distinguisher");
																Ext.getCmp("spkVrfName").show();
																//Ext.getCmp("AsRdSpk").show();
																Ext.getCmp("spkRd").show();
																Ext.getCmp("spkVrfId").show();
																Ext.getCmp("spkVrfName").setDisabled(false);
																//Ext.getCmp("AsRdSpk").setDisabled(false);
																Ext.getCmp("spkRd").setDisabled(false);
																Ext.getCmp("spkVrfId").setDisabled(false);
															}if(topology == 'Spoke'){
																Ext.getCmp("vpnName").setFieldLabel("Hub VRF Name/ID");
																Ext.getCmp("rd").setFieldLabel("Hub Route Distinguisher");
																Ext.getCmp("spkVrfName").show();
																//Ext.getCmp("AsRdSpk").show();
																Ext.getCmp("spkRd").show();
																Ext.getCmp("spkVrfId").hide();
																Ext.getCmp("spkVrfName").setDisabled(false);
																//Ext.getCmp("AsRdSpk").setDisabled(false);
																Ext.getCmp("spkRd").setDisabled(false);
																Ext.getCmp("spkVrfId").setDisabled(true);
															}
															
															Ext.getCmp("accessRate").setValue(record.get('accessRate'));
															Ext.getCmp("efRate").setValue(record.get('efRate'));
															
															Ext.getCmp("oldEFRate").setValue(record.get('oldEFRate'));
															Ext.getCmp("efService").setValue(record.get('efService'));
															Ext.getCmp("beService").setValue(record.get('beService'));
															Ext.getCmp("classifier").setValue(record.get('classifier'));
															
															Ext.getCmp("isAllAFSelected").setValue(record.get('isAllAFSelected'));
															Ext.getCmp("isAF1Selected").setValue(record.get('isAF1Selected'));
															Ext.getCmp("isAF2Selected").setValue(record.get('isAF2Selected'));
															Ext.getCmp("isAF3Selected").setValue(record.get('isAF3Selected'));
															
															Ext.getCmp("af1").setValue(record.get('af1'));
															Ext.getCmp("af2").setValue(record.get('af2'));
															Ext.getCmp("af3").setValue(record.get('af3'));
															
															Ext.getCmp("mvpn").checkboxCmp.setValue(record.get('mvpn'));
															Ext.getCmp("senderSite").setValue(record.get('senderSite'));
															Ext.getCmp("ssmIP").setValue(record.get('ssmIP'));
															Ext.getCmp("ssmIpMask").setValue(record.get('ssmIpMask'));
															Ext.getCmp("rpType").setValue(record.get('rpType'));
															Ext.getCmp("rpAddress").setValue(record.get('rpAddress'));
															Ext.getCmp("rpGprRange").setValue(record.get('rpGprRange'));
															
														    stageBtn.hide();
															//var selectedRowIndex = Ext.getCmp('index');
															//selectedRowIndex.setValue(index);
															me.setFieldDisabled('siteName',true);
															//me.setFieldDisabled('topology',true);
															Ext.ComponentQuery.query('#endpointPanel')[0].show();
															//Ext.getCmp('optionPanelGrid').getSelectionModel().select(0);
															Ext.getCmp('accessOptionGrid').show();
															console.log("site************ " +Ext.getCmp("siteName").getValue());		
															//me.getHardwareModel(record.get('moid'));
															//me.getSoftwareVersion(record.get('moid'));
															Ext.getCmp("siteName").setValue(record.get('moid'));	
															Ext.getCmp("siteNameRO").setValue(record.get('site'));
															Ext.getCmp("siteName").hide();
															Ext.getCmp("siteNameRO").show();
															
															me.loadSiteInterfaceGrid(record.get('moid'), record.get('port'));
															//me.getMultiVRFDetails(record.get('port'));
														
															},
															 itemclick: function(dv, record, item, index, e) {
																console.log("selected row11 : "+index);
																var selectedRowIndex = Ext.getCmp('index');
																selectedRowIndex.setValue(index);
														
															}
															},
															 /*selModel: Ext.create('Ext.selection.CheckboxModel', {
													listeners: {
															deselect: function(model, record, index) {
																//id = record.get('id');
																//alert("deselect "+index);
																record.set({recordOPType: 'UPDATE'});
															},
															select: function(model, record, index) {
															record.set({recordOPType: 'DELETE'});
																//id = record.get('id');
																//alert("select "+index);
															}
														}

                                                    }),*/
													features: [{
                                                        ftype: 'grouping',
                                                        startCollapsed: false,
                                                        groupHeaderTpl: '{columnName}: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'
                                                    }]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                       {
                            xtype: 'fieldset',
                            height: 150,
							Height: 160,
                            width: 900,
                            title: 'Changed Service Details',
							style: this.FIELDSET_BACKGROUND_COLOR,
                           layout: 'fit',

                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            title: '',
											layout: 'fit',
											minHeight: 90,
											height: 148,
											autoScroll: true,
											tabConfig: {
                                                //xtype: 'tab',
                                                //width: 70
                                            },
											style: this.FIELDSET_BACKGROUND_COLOR,
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    height: 148,
													//maxHeight: 148,
                                                    id: 'stagedInterfacesGrid',
													name: 'stagedInterfacesGrid',
                                                    //maxHeight: 180,
													//layout: 'fit',
													
                                                    maxWidth: 875,
                                                    width: 875,
                                                    title: '',
													columnLines: true,
													hideHeaders: false,
                                                    forceFit: true,
                                                    store: this.getStagedInterfacesStore(),
													style: this.FIELDSET_BACKGROUND_COLOR,
													autoScroll: true,
													autoHeight: true,
													viewConfig: {
														scroll:false,
														style:{overflow: 'auto',overflowX: 'hidden'}
													},
													plugins:[Ext.create('Ext.ux.grid.JxFilterRow', {
														remoteFilter:false,
														
													})],
													columns: [
														
														{
															xtype: 'gridcolumn',
															hidden: true,
															hideable: false,
															dataIndex: 'pedeviceId'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: 'IP Address',
															dataIndex: 'ipAddress',
															hidden: true
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: 'IP Address',
															dataIndex: 'ipAddressAndMask',
															maxWidth: 130
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															align: 'center',
															dataIndex: 'port',
															//hideable: false,
															maxWidth: 90,
															text: 'Port',
															hidden: false
														},
														{
                                                            xtype: 'gridcolumn',
                                                            text: 'CIU Name',
                                                            align: 'center',
                                                            dataIndex: 'ciuName',
															maxWidth: 180
                                                        },
														{
                                                            xtype: 'gridcolumn',
                                                            text: 'CIU Alias',
                                                            align: 'center',
                                                            dataIndex: 'ciuAlias',
															maxWidth: 180
                                                        },
														
														{
															xtype: 'gridcolumn',
															sortable: true,
															align: 'center',
															dataIndex: 'site',
															text: 'Site Name',
															hidden: false,
															hideable:false,
															maxWidth: 130
														},
														{
															xtype: 'gridcolumn',
															//maxWidth: 70,
															align: 'center',
															sortable: true,
															dataIndex: 'endPointServiceType',
															text: 'Service Type',
															maxWidth: 90
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
                                                            dataIndex: 'accessType',
															maxWidth: 90
                                                        },
														{
                                                            xtype: 'gridcolumn',
                                                            align: 'center',
                                                            dataIndex: 'portSpeed',
															hidden: true
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
															sortable: true,
															editable: true,
															align: 'center',
															dataIndex: 'vlanId',
															hidden: true,
															text: 'VLAN'
                                                            
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
															dataIndex: 'operationalMode'
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
															dataIndex: 'oldQosType'
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
														/*{
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
														},*/
														{
															xtype: 'gridcolumn',
															align: 'center',
															dataIndex: 'oldEndPointServiceType',
															text: 'Service Type',
															hidden: true
														},
														{
                                                            xtype: 'gridcolumn',
                                                            text: 'CIU LB',
                                                            align: 'center',
                                                            dataIndex: 'oldCiuLoopback',
                                                            hidden: true
                                                        },
														{
															xtype: 'gridcolumn',
															sortable: true,
															editable: true,
															dataIndex: 'oldVlanId',
															hidden: true
                                                            
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: 'IP Address',
															//align: 'center',
															editable: true,
															dataIndex: 'oldIPV4AddressAndMask',
															hidden: true
														},																
														{
															xtype: 'gridcolumn',
															text: 'Neighbour Address',
															dataIndex: 'oldNeighbourAddress',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR
														},
														
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: '',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'oldRT'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: '',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'oldAccessDetail'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: '',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'oldQoSOptionDetail'
														}
														,
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: '',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'oldEFRate'
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
                                                            dataIndex: 'deployedInterface',
															hidden: true
                                                        },
														{
															xtype: 'gridcolumn',
															sortable: true,
															text: '',
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'prefixList'
														},
														{
															xtype: 'gridcolumn',
															align: 'center',
															dataIndex: 'management',
															hidden: true
														}
														
														
													],
												 
													listeners: {
															itemdblclick: function(dv, record, item, index, e) {
															console.log("selected row1 : "+index);
															console.log(">>>   : "+record.get('recordOPType'));
															Ext.getCmp("siteName").setValue(record.get('moid'));
															
															if(record.get('recordOPType') == 'MODIFY'){
																Ext.getCmp("siteName").hide();
																Ext.getCmp("siteNameRO").show();
																Ext.getCmp("ciuName").setDisabled(true);
																Ext.getCmp("ciuAlias").setDisabled(true);
																Ext.getCmp("localPref").setDisabled(true);
																Ext.getCmp("med").setDisabled(true);
																Ext.getCmp("portSpeed").setDisabled(true);
																Ext.getCmp("subnetMask").setDisabled(true);
																Ext.getCmp('csId').setDisabled(true);
																Ext.getCmp('vlanId').setDisabled(true);
																Ext.getCmp('ipAddress').setDisabled(true);
																Ext.getCmp('peerAS').setDisabled(true);
																Ext.getCmp('neighbourAddress').setDisabled(true);
																Ext.getCmp('ciuLoopback').setDisabled(true);
																Ext.getCmp('accessRate').setDisabled(false);
															}
															if(record.get('recordOPType') != 'DELETE'){
																Ext.getCmp("endpointPanel").setDisabled(false);
																Ext.getCmp('spkVrfId').setDisabled(false);
																Ext.getCmp('spkVrfName').setDisabled(false);
																Ext.getCmp('siteName').setDisabled(false);
																Ext.getCmp("endpointPanel").setDisabled(false);
																
																Ext.ComponentQuery.query('#endpointPanel')[0].show();
																
																var portCombo = Ext.getCmp("portSpeed");
															//childCombo.clearValue();
															portCombo.getStore().removeAll();
															var portName = record.get('port');
															
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
															
																//endpointPanel.show();
																//if(record.get('recordOPType') == 'ADD'){
																Ext.getCmp("isDeployedUpdated").setValue("false");
																//}
															//var topology = Ext.getCmp("topology").getValue();
																
															Ext.getCmp('updateBtn').show();
															//updateBtn.show();
																
															Ext.getCmp("autonegotiate").setValue(record.get('autonegotiate'));	
															Ext.getCmp("adminState").setValue(record.get('adminState'));
															Ext.getCmp("operationalMode").setValue(record.get('operationalMode'));
															
															Ext.getCmp("nextHOP").setValue(record.get('nextHOP'));
															
															Ext.getCmp("multiVRF").setValue(record.get('multiVRF'));
															Ext.getCmp("firstUnitForVRF").setValue(record.get('firstUnitForVRF'));
															Ext.getCmp("traficControlProfile").setValue(record.get('traficControlProfile'));
																														
															Ext.getCmp("qosType").setValue(record.get('qosType'));
															Ext.getCmp("vpnAlias").setValue(record.get('vpnAlias'));
															Ext.getCmp("policyGroup").setValue(record.get('policyGroup'));
															Ext.getCmp("vpnSpeed").setValue(record.get('vpnRate'));
															Ext.getCmp("management").setValue(record.get('management'));

															Ext.getCmp("oldAccessDetail").setValue(record.get('oldAccessDetail'));
															Ext.getCmp("oldQoSOptionDetail").setValue(record.get('oldQoSOptionDetail'));

															var interfacegrid = Ext.ComponentQuery.query('gridpanel[name=siteInterfaceGrid]')[0];
															interfacegrid.setDisabled(true);
															
															//me.setFieldDisabled('siteInterface',true);
															
															
															var stageBtn = Ext.getCmp('stageBtn');
															var clearInactiveEntriesFromListButton = Ext.getCmp('clearInactiveEntriesFromListButton');
															clearInactiveEntriesFromListButton.hide();
															
															var operationalMode = record.get('operationalMode');
															Ext.getCmp("prefixListGrid1").getStore().removeAll();
															if(operationalMode == 'TST'){
																Ext.getCmp("operationalMode").setValue(record.get('operationalMode'));
																Ext.getCmp("prefixDetailBtn").show();
																if(record.get('prefixList').length !=undefined)	{	
																	for (var i=0; i< record.get('prefixList').length; i++) {
																		console.log("prefixList "+ record.get('prefixList')[i].prefixList);
																			Ext.getCmp("prefixListGrid1").getStore().add({
																				prefixList: record.get('prefixList')[i].prefixList
																			
																			}); 
																		}
																	}else{
																		Ext.getCmp("prefixListGrid1").getStore().add({
																			prefixList: record.get('prefixList').prefixList
																		
																		}); 
																	}
																	Ext.getCmp("prefixListGrid1").getView().refresh();	
																}
															
															Ext.getCmp("endPointServiceType").setValue(record.get('endPointServiceType'));
															Ext.getCmp("oldEndPointServiceType").setValue(record.get('oldEndPointServiceType'));
															Ext.getCmp("ciuLoopback").setValue(record.get('ciuLoopback'));
															Ext.getCmp("oldCiuLoopback").setValue(record.get('oldCiuLoopback'));
															Ext.getCmp("ciuName").setValue(record.get('ciuName'));
															Ext.getCmp("ciuAlias").setValue(record.get('ciuAlias'));
															Ext.getCmp("accessType").setValue(record.get('accessType'));
															Ext.getCmp("portSpeed").setValue(record.get('portSpeed'));
															Ext.getCmp("connectionType").setValue(record.get('connectionType'));
															Ext.getCmp("csId").setValue(record.get('csId'));
															Ext.getCmp("pathPreferences").setValue(record.get('pathPreferences'));
															var vlanId =Ext.getCmp("vlanId").setValue(record.get('vlanId'));
															Ext.getCmp("oldVlanId").setValue(vlanId);
															Ext.getCmp("ipAddress").setValue(record.get('ipAddress'));
															Ext.getCmp("oldIPV4AddressAndMask").setValue(record.get('oldIPV4AddressAndMask'));
															Ext.getCmp("neighbourAddress").setValue(record.get('neighbourAddress'));
															Ext.getCmp("oldNeighbourAddress").setValue(record.get('oldNeighbourAddress'));
															Ext.getCmp("subnetMask").setValue(record.get('subnetMask'));
															Ext.getCmp("loopbackSubnetMask").setValue(record.get('loopbackSubnetMask'));
															Ext.getCmp("ipMTU").setValue(record.get('ipMTU'));
															
															Ext.getCmp("ipv6Peer").setValue(record.get('ipv6Peer'));
															if(record.get('ipv6Peer') == true){
																//Ext.getCmp("ipv6Peer").setValue(true);
																//Ext.getCmp("ipv6NeighAddress").show();
																Ext.getCmp("ipv6Address").show();
															}
															console.log("rec ipv6 address: "+record.get('ipv6Address'));
															var ipv6Address =Ext.getCmp("ipv6Address").setValue(record.get('ipv6Address'));
															console.log("ipv6Address .  "+ipv6Address);
															//var mvpn =  Ext.getCmp('mvpn').checkboxCmp.getValue();
															Ext.getCmp("rd").setValue(record.get('rd'));
															Ext.getCmp("neighbourAddress").setValue(record.get('neighbourAddress'));
															Ext.getCmp("localPref").setValue(record.get('localPref'));
															Ext.getCmp("med").setValue(record.get('med'));
															Ext.getCmp("peerAS").setValue(record.get('peerAS'));
															
															//var rt =Ext.getCmp("rt").setValue(record.get('rt'));
															//var rtHub =Ext.getCmp("rtHub").setValue(record.get('rtHub'));
															//var rtSpoke =Ext.getCmp("rtSpoke").setValue(record.get('rtSpoke'));
															
															Ext.getCmp("spkVrfName").setValue(record.get('spkVrfName'));
															//Ext.getCmp("AsRdSpk").setValue(record.get('AsRdSpk'));
															//Ext.getCmp("AsRd").setValue(record.get('AsRd'));
															Ext.getCmp("spkRd").setValue(record.get('spkRd'));
															Ext.getCmp("spkVrfId").setValue(record.get('spkVrfId'));
															
															Ext.getCmp("oldRT").setValue(record.get('oldRT'));
															
															Ext.getCmp("accessRate").setValue(record.get('accessRate'));
															var topology = record.get('topology');
															Ext.getCmp("topology").setValue(topology);
															if(topology == 'Mesh'){
																Ext.getCmp("vpnName").setFieldLabel("VRF Name");
																Ext.getCmp("rd").setFieldLabel("Route Distinguisher");
																Ext.getCmp("spkVrfName").hide();
																//Ext.getCmp("AsRdSpk").hide();
																Ext.getCmp("spkRd").hide();
																Ext.getCmp("spkVrfId").hide();
																Ext.getCmp("spkVrfName").setDisabled(true);
																//Ext.getCmp("AsRdSpk").setDisabled(true);
																Ext.getCmp("spkRd").setDisabled(true);
																Ext.getCmp("spkVrfId").setDisabled(true);
															}if(topology == 'Hub'){
																Ext.getCmp("vpnName").setFieldLabel("Hub VRF Name");
																Ext.getCmp("rd").setFieldLabel("Hub Route Distinguisher");
																Ext.getCmp("spkVrfName").show();
																//Ext.getCmp("AsRdSpk").show();
																Ext.getCmp("spkRd").show();
																Ext.getCmp("spkVrfId").show();
																Ext.getCmp("spkVrfName").setDisabled(false);
																//Ext.getCmp("AsRdSpk").setDisabled(false);
																Ext.getCmp("spkRd").setDisabled(false);
																Ext.getCmp("spkVrfId").setDisabled(false);
															}if(topology == 'Spoke'){
																Ext.getCmp("vpnName").setFieldLabel("Hub VRF Name/ID");
																Ext.getCmp("rd").setFieldLabel("Hub Route Distinguisher");
																Ext.getCmp("spkVrfName").show();
																//Ext.getCmp("AsRdSpk").show();
																Ext.getCmp("spkRd").show();
																Ext.getCmp("spkVrfId").hide();
																Ext.getCmp("spkVrfName").setDisabled(false);
																//Ext.getCmp("AsRdSpk").setDisabled(false);
																Ext.getCmp("spkRd").setDisabled(false);
																Ext.getCmp("spkVrfId").setDisabled(true);
															}
															Ext.getCmp("efRate").setValue(record.get('efRate'));
															Ext.getCmp("oldEFRate").setValue(record.get('oldEFRate'));
															Ext.getCmp("efService").setValue(record.get('efService'));
															Ext.getCmp("beService").setValue(record.get('beService'));
															Ext.getCmp("classifier").setValue(record.get('classifier'));
															
															Ext.getCmp("isAllAFSelected").setValue(record.get('isAllAFSelected'));
															Ext.getCmp("isAF1Selected").setValue(record.get('isAF1Selected'));
															Ext.getCmp("isAF2Selected").setValue(record.get('isAF2Selected'));
															Ext.getCmp("isAF3Selected").setValue(record.get('isAF3Selected'));
															
															Ext.getCmp("af1").setValue(record.get('af1'));
															Ext.getCmp("af2").setValue(record.get('af2'));
															Ext.getCmp("af3").setValue(record.get('af3'));
															
															Ext.getCmp("mvpn").checkboxCmp.setValue(record.get('mvpn'));
															Ext.getCmp("senderSite").setValue(record.get('senderSite'));
															Ext.getCmp("ssmIP").setValue(record.get('ssmIP'));
															Ext.getCmp("ssmIpMask").setValue(record.get('ssmIpMask'));
															Ext.getCmp("rpType").setValue(record.get('rpType'));
															Ext.getCmp("rpAddress").setValue(record.get('rpAddress'));
															Ext.getCmp("rpGprRange").setValue(record.get('rpGprRange'));
															me.setFieldDisabled('siteName',true);
															me.setFieldDisabled('topology',true);
															
															Ext.getCmp("siteName").setValue(record.get('moid'));
															me.getHardwareModel(record.get('moid'));
															me.getSoftwareVersion(record.get('moid'));
															Ext.getCmp("siteName").setValue(record.get('moid'));	
															Ext.getCmp("siteNameRO").setValue(record.get('site'));
															Ext.getCmp("siteName").hide();
															Ext.getCmp("siteNameRO").show();
															
															
														    stageBtn.hide();
															var selectedRowIndex = Ext.getCmp('index');
															selectedRowIndex.setValue(index);
															
															
														
															}
															},
															 itemclick: function(dv, record, item, index, e) {
																console.log("selected row11 : "+index);
																console.log("selected moid : "+record.get('moid'));
																Ext.getCmp("siteName").setValue(record.get('moid'));
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
                                    text: '   Submit      ',
									margin: '0 40 0 300',
									handler: function(button, event) {
										var data = this.getDataJSON();
										this.scriptUtils.saveModifyForm(this,data);
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
	                                    this.clearAllFields();
	                                        
	                                 },
	                                    scope: this,
                                },
                                {
                                    xtype: 'button',
                                    maxHeight: 35,
                                    width: 80,
									margin: '0 200 0 0',
                                    text: 'Cancel',
									handler: function(button, event) {
        	                                    me.close();
												//this.cancelFields();
								    }//,
	                                    //scope: this,
                                },
								,
								{
                                    xtype: 'button',
                                    margin: '0 40 0 0',
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
		me.on("show",this.populateData,this);
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
    getCompByName:function(type, name) {
    	return Ext.ComponentQuery.query(type+'[name=' + name +']')[0];
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

getStagedInterfacesStore: function() {
        var stagedInterfacesStore = Ext.create('Ext.data.Store',{
            storeId: 'stagedInterfacesStore',
            fields: [
                {name: 'moid'},
				{name: 'site'},
                {name: 'port'},
                {name: 'endPointServiceType'},
				{name: 'oldEndPointServiceType'},
                {name: 'ciuLoopback'},
				{name: 'oldCiuLoopback'},
				{name: 'ciuName'},
				{name: 'ciuAlias'},
				{name: 'accessType'},
				{name: 'portSpeed'},
				{name: 'connectionType'},
				{name: 'csId'},
				{name: 'pathPreferences'},
                {name: 'vlanId'},
				{name: 'oldVlanId'},
                {name: 'ipAddress'},
				{name: 'oldIPV4AddressAndMask'},
				{name: 'ipAddressAndMask'},
                {name: 'subnetMask'},
				{name: 'loopbackSubnetMask'},
                {name: 'ipMTU'},
				{name: 'ipv6Peer'},
				{name: 'ipv6Address'},
				{name: 'rd'},
				{name: 'spkRd'},
				{name: 'spkVrfName'},
				{name: 'spkVrfId'},
				
				{name: 'neighbourAddress'},
				
				{name: 'oldNeighbourAddress'},
				{name: 'localPref'},
				{name: 'med'},
				{name: 'peerAS'},
				{name: 'vpnName'},
				{name: 'accessRate'},
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
				{name: 'oldEFRate'},
				{name: 'af1'},
				{name: 'af2'},
				{name: 'af3'},
				{name: 'recordOPType'},
				{name: 'mvpn'},
				{name: 'senderSite'},
				{name: 'ssmIP'},
				{name: 'ssmIpMask'},
				{name: 'rpType'},
				{name: 'rpAddress'},
				{name: 'rpGprRange'},
				
				{name: 'seId'},
				{name: 'topology'},
				{name: 'rt'},
				{name: 'oldRT'},
				{name: 'autonegotiate'},
				{name: 'adminState'},
				{name: 'operationalMode'},
				{name: 'nextHOP'},
				{name: 'multiVRF'},
				{name: 'firstUnitForVRF'},
				{name: 'traficControlProfile'},
				{name: 'qosType'},
				{name: 'oldQosType'},
				{name: 'oldAccessDetail'},
				{name: 'oldQoSOptionDetail'},
				{name: 'dataForDisplay'},
				{name: 'deployedInterface'},
				{name: 'prefixList'},
				{name: 'management'}
                
            ], groupField: 'site', 
            data: [
              		
            ]
        });
    
        return stagedInterfacesStore;
    },

	provisionedInterfacesGridStore:function() {
		var piGridStore = Ext.create('Ext.data.Store', {
			fields:['moid','site','port','endPointServiceType','ciuLoopback','ciuName','ciuAlias','accessType', 'portspeed','connectionType','csId','pathPreferences','vlanId','csId','ipAddress','subnetMask','loopbackSubnetMask','ipMTU','ipv6Peer','ipv6Address','neighbourAddress','oldNeighbourAddress','localPref','med','peerAS','accessRate','vpnSpeed','efService','beService','classifier','isAllAFSelected','isAF1Selected','isAF2Selected','isAF3Selected','af1','af2','af3','mvpn','senderSite','ssmIP','ssmIpMask','rpType','rpAddress','rpGprRange','seId','topology','rt', 'autonegotiate', 'adminState','operationalMode', 'policyGroup','nextHOP','qosType','vpnAlias','policyGroup','vpnRate','rd','spkRd','spkVrfName','spkVrfId','rdMesh','rdHub','rdSpoke','ASMesh','ASHub','ASSpoke','vrfName', 'management','dataForDisplay','deployedInterface','endPointsData','prefixList','prefixListBeforeUpdate'],
            groupField:'deviceName',
			proxy:{
				url:'/serviceui/resteasy/cpp-service/get-unis/',
				type:'ajax',
				reader:{
					type:'json',
					root:'serviceUniBeanList',
					totalProperty:'serviceUniBeanListCount'
				}
			},
			listeners:{
				load:{
					fn:this.loadPIGridStore
				}
			},	
			pageSize:5
        });        
        return piGridStore;
    },
	loadPIGridStore:function(comp, records, successful, e) {
		var grid = Ext.ComponentQuery.query('gridpanel[name=deployedInterfacesGrid]')[0];
		if (grid != undefined) {
			var store = grid.getStore();
			
			//var advanced, mvpn;
			
			for (var i=0; i<records.length; i++) {
				var rec = store.getAt(i);
				//console.log("tec: "+rec);
				console.log("seId: "+rec.get("seId"));
				
				var endPointsData = Ext.decode(rec.get('endPointsData'));
				var endPointRecord = endPointsData[0];
				console.log("csID*****: "+endPointRecord.csId);
				console.log("port: "+endPointRecord.Interface);
				console.log("site: "+endPointRecord.site);
				//console.log("seId: "+rec.get("seId"));
				
				endPointRecord.vpnName = endPointRecord.vrfName;
				//console.log("rdMesh: "+endPointRecord.rdMesh);
				//console.log("rdHub: "+endPointRecord.rdHub);
				//console.log("rdSpoke: "+endPointRecord.rdSpoke);
				//console.log("1>> "+endPointRecord.ASHub);
				//console.log("2>> "+endPointRecord.ASSpoke);
				//console.log("3>> "+endPointRecord.ASMesh);
				if(endPointRecord.topology == 'Mesh'){
					endPointRecord.rd = endPointRecord.rdMesh; //RD = RT
					//endPointRecord.AsRd = endPointRecord.ASMesh;
					rec.set('rd',endPointRecord.rd);
					//rec.set('AsRd',endPointRecord.AsRd);
					
					//rec.set('ASMesh',endPointRecord.ASMesh);
					
				}else if(endPointRecord.topology == 'Hub'){
					endPointRecord.rd = endPointRecord.rdHub; //RD=RT
						//endPointRecord.AsRd = endPointRecord.ASHub;
					//endPointRecord.AsRdSpk = endPointRecord.ASSpoke;
					
					//rec.set('ASHub',endPointRecord.ASHub);
					//rec.set('ASSpoke',endPointRecord.ASSpoke);
					endPointRecord.spkRd = endPointRecord.rdSpoke;
					
					rec.set('rd',endPointRecord.rd);
					//rec.set('AsRdSpk',endPointRecord.AsRdSpk);
					//rec.set('AsRd',endPointRecord.AsRd);
					//rec.set('AsRdSpk',endPointRecord.AsRdSpk);
					rec.set('spkRd',endPointRecord.spkRd);
					rec.set('spkVrfId',endPointRecord.spkVrfId);
					rec.set('spkVrfName',endPointRecord.spkVrfName);
					
				}else if(endPointRecord.topology == 'Spoke'){
				
					//rec.set('ASHub',endPointRecord.ASHub);
					//rec.set('ASSpoke',endPointRecord.ASSpoke);
					
					endPointRecord.spkRd = endPointRecord.rdSpoke; //RD=RT
					//endPointRecord.AsRdSpk = endPointRecord.ASSpoke;
					//endPointRecord.AsRd = endPointRecord.ASHub;
					rec.set('spkRd',endPointRecord.spkRd);
					//rec.set('AsRdSpk',endPointRecord.AsRdSpk);
					//rec.set('AsRd',endPointRecord.AsRd);
					rec.set('spkVrfName',endPointRecord.spkVrfName);
				}
				
				
				rec.set('recordOPType','MODIFY');
				rec.set('port',endPointRecord.Interface);
				rec.set('moid',endPointRecord.pedeviceId);
				rec.set('site',endPointRecord.site);
				rec.set('vlanId',endPointRecord.vlanId);
				rec.set('endPointServiceType',endPointRecord.endPointServiceType);
				rec.set('oldEndPointServiceType',endPointRecord.endPointServiceType);
				//console.log("ciuloopback****: "+endPointRecord.ciuLoopback);
				rec.set('ciuLoopback',endPointRecord.ciuLoopback);
				
				rec.set('oldCiuLoopback',endPointRecord.ciuLoopback+"/"+endPointRecord.loopbackSubnetMask);
				rec.set('ciuName',endPointRecord.ciuName);
				rec.set('ciuAlias',endPointRecord.ciuAlias);
				rec.set('csId',endPointRecord.csId);
				rec.set('accessType',endPointRecord.accessType);
				if(endPointRecord.portSpeed != null){
					rec.set('portSpeed',endPointRecord.portSpeed.toUpperCase());
				}
				rec.set('vpnAlias',endPointRecord.vpnAlias);
				
				//console.log("connection Type: "+endPointRecord.connectionType);
				 
				 if(endPointRecord.connectionType == 'REDI'){
					rec.set('connectionType','RE Direct');
				}else{
					rec.set('connectionType','RE Dual');
					}
				
				//console.log("pathPreferences: "+endPointRecord.pathPreferences);
				rec.set('pathPreferences',endPointRecord.pathPreferences);
				rec.set('ipAddress',endPointRecord.ipAddress);
				rec.set('subnetMask',endPointRecord.subnetMask);
				rec.set('ipAddressAndMask',endPointRecord.ipAddress + "/" +endPointRecord.subnetMask);
				
				rec.set('oldIPV4AddressAndMask',endPointRecord.ipAddress+"/"+endPointRecord.subnetMask);
				rec.set('loopbackSubnetMask',endPointRecord.loopbackSubnetMask);
				rec.set('ipMTU',endPointRecord.ipMTU);
				var ipv6Peer =endPointRecord.ipv6Peer;
				console.log("ipv6Peer : "+ipv6Peer);
				rec.set('ipv6Peer',ipv6Peer);
				//console.log("autonegotiate > "+endPointRecord.autonegotiate);
				//console.log("adminState > "+endPointRecord.adminState);
				rec.set('autonegotiate',endPointRecord.autonegotiate);
				rec.set('adminState',endPointRecord.adminState);
				rec.set('operationalMode',endPointRecord.operationalMode);
				
				rec.set('policyGroup',endPointRecord.policyGroup);
				rec.set('qosType',endPointRecord.qosType);
				rec.set('oldQosType',endPointRecord.qosType);
				rec.set('vpnRate',endPointRecord.vpnRate);
				rec.set('vpnName',endPointRecord.vrfName);
				rec.set('management',endPointRecord.management);
				if(endPointRecord.qosType == 'QoS per Access'){
					Ext.getCmp("vpnSpeed").setDisabled(true);
				}
				rec.set('oldAccessDetail',endPointRecord.adminState+"|"+endPointRecord.autonegotiate);
				rec.set('nextHOP',endPointRecord.nextHOP);
				
				rec.set('ipv6Address',endPointRecord.ipv6Address);
				rec.set('rd',endPointRecord.rd);
				rec.set('neighbourAddress',endPointRecord.neighbourAddress);
				
				var oldNeighbourAddress = endPointRecord.neighbourAddress;
				rec.set('oldNeighbourAddress',oldNeighbourAddress);
				//console.log("oldNeighbourAddress*****************: "+oldNeighbourAddress);
				//rec.set('neighbourSubnetMask',endPointRecord.neighbourSubnetMask);
				rec.set('localPref',endPointRecord.localPref);
				rec.set('med',endPointRecord.med);
				rec.set('peerAS',endPointRecord.peerAS);
				rec.set('peerAsRd',endPointRecord.peerAs);
				//rec.set('ipv6NeighAddress',endPointRecord.ipv6NeighAddress);
				rec.set('accessRate',endPointRecord.accessRate);
				rec.set('vpnSpeed',endPointRecord.vpnSpeed);
				rec.set('efRate',endPointRecord.efRate);//+"|"+endPointRecord.typeOfService+"|"+endPointRecord.bwLimit+"|"+endPointRecord.burstSize);
				
				rec.set('oldEFRate',endPointRecord.efRate +"|"+endPointRecord.typeOfService+"|"+endPointRecord.bwLimit+"|"+endPointRecord.burstSize);
				
				rec.set('efService',endPointRecord.efService);
				rec.set('beService',endPointRecord.beService);
				rec.set('classifier',endPointRecord.classifier);
				rec.set('isAllAFSelected',endPointRecord.isAllAFSelected);
				rec.set('isAF1Selected',endPointRecord.isAF1Selected);
				rec.set('isAF2Selected',endPointRecord.isAF2Selected);
				rec.set('isAF3Selected',endPointRecord.isAF3Selected);
				
				rec.set('af1',endPointRecord.af1);
				rec.set('af2',endPointRecord.af2);
				rec.set('af3',endPointRecord.af3);
				rec.set('oldQoSOptionDetail',endPointRecord.accessRate+"|"+endPointRecord.vpnSpeed+"|"+endPointRecord.efService+"|"+endPointRecord.efRate+"|"+endPointRecord.classifier+"|"+endPointRecord.af3+"|"+endPointRecord.af2+"|"+endPointRecord.af1+"|"+endPointRecord.classifier);
				
				rec.set('mvpn',endPointRecord.mvpn);
				rec.set('senderSite',endPointRecord.senderSite);
				rec.set('ssmIP',endPointRecord.ssmIP);
				rec.set('ssmIpMask',endPointRecord.ssmIpMask);
				rec.set('rpType',endPointRecord.rpType);
				rec.set('rpAddress',endPointRecord.rpAddress);
				rec.set('rpGprRange',endPointRecord.rpGprRange);
				rec.set('seId',rec.get("seId"));
				rec.set('topology',endPointRecord.topology);
				
				//rec.set('rt',endPointRecord.rt);
				//rec.set('rtHub',endPointRecord.rtHub);
				//rec.set('rtSpoke',endPointRecord.rtSpoke);
				rec.set('oldRT',endPointRecord.rt);
				//rec.set('seId',endPointRecord.seId);
				rec.set('recordOPType','MODIFY');
				rec.set('rpGprRange',endPointRecord.rpGprRange);
				rec.set('vendorType',Jx.ProvConstants.JUNIPER);
				rec.set('dataForDisplay',endPointRecord.dataForDisplay);
				rec.set('deployedInterface',"true");
				
				//console.log("**operationalMode** > "+endPointRecord.operationalMode);
				//console.log("**prefixList** > "+endPointRecord.prefixList.prefixList);
				
				//console.log("**prefixList e** > "+endPointRecord.prefixList.prefixList.e);
				if(endPointRecord.operationalMode == 'TST'&& endPointRecord.prefixList.prefixList.e != undefined ){
					//endPointRecord.prefixList = endPointRecord.prefixList.prefixList.e;
					rec.set('prefixList',endPointRecord.prefixList.prefixList.e);
					rec.set('prefixListBeforeUpdate',endPointRecord.prefixList.prefixList.e);
					
				}
				else if(endPointRecord.operationalMode == 'TST'&& endPointRecord.prefixList.prefixList.e == undefined ){
					//endPointRecord.prefixList = endPointRecord.prefixList.prefixList;
					rec.set('prefixList',endPointRecord.prefixList.prefixList);
					rec.set('prefixListBeforeUpdate',endPointRecord.prefixList.prefixList);
				}
				
				
				
			}
		}	
	},
	populateData:function(){
      if(this.commonData != null) {

             this.scriptUtils.setFieldValues(this,this.commonData);
			  
			  var attribs = Ext.JSON.decode(this.commonData.attribs);
			  
			  Ext.getCmp("customerFieldset").setDisabled(true);
			  Ext.getCmp("serviceFieldset").setDisabled(true);
			  //Ext.getCmp("topologyFieldset").setDisabled(true);
			  
			  //Ext.getCmp("nodeFieldset").setDisabled(true);
			  //Ext.getCmp("accessDetailFieldset").setDisabled(true);
			  Ext.getCmp("connectionType").setDisabled(true);
			  Ext.getCmp("accessType").setDisabled(true);
			  Ext.getCmp("pathPreferences").setDisabled(true);
			  //Ext.getCmp("operationalMode").setDisabled(true);
			  
			  //var accounting = Ext.getCmp("accounting");
			  
			
			if(attribs[0].accounting=='true'){
				Ext.getCmp("accounting").setValue(true);
			}
			if(attribs[0].flowSampling=='true'){
				Ext.getCmp("flowSampling").setValue(true);
			}
			if(attribs[0].enforceRoute=='true'){
				Ext.getCmp("enforceRoute").setValue(true);
			}
			
			Ext.getCmp("adminState").setValue(attribs[0].adminState);
			Ext.getCmp("vpnName").setValue(attribs[0].vpnName);
			Ext.getCmp("maxRoute").setValue(attribs[0].maxRoute);
			Ext.getCmp("vpnAlias").setValue(attribs[0].vpnAlias);
			Ext.getCmp("rd").setValue(attribs[0].rd);
			Ext.getCmp("endPointServiceType").setValue(attribs[0].endPointServiceType);
			Ext.getCmp("policyGroup").setValue(attribs[0].policyGroup);
			Ext.getCmp("application").setValue(attribs[0].application);
			Ext.getCmp("operationalMode").setValue(attribs[0].operationalMode);
			Ext.getCmp("redistConnRoutes").setValue(attribs[0].redistConnRoutes);
			Ext.getCmp("accounting").setValue(attribs[0].accounting);
			
			
			Ext.getCmp("topology").setValue(attribs[0].topology);
			Ext.getCmp("vpnName").setValue(attribs[0].vrfName);
			Ext.getCmp("rd").setValue(attribs[0].rd);
			Ext.getCmp("spkRd").setValue(attribs[0].spkRd);
			Ext.getCmp("spkVrfId").setValue(attribs[0].spkVrfId);
			Ext.getCmp("spkVrfName").setValue(attribs[0].spkVrfName);
			
			Ext.getCmp("customerName").setValue(attribs[0].customer.e.name);
			Ext.getCmp("customerId").setValue(attribs[0].customer.e.ossCustomerId);
			
			Ext.getCmp("customerDescription").setValue(attribs[0].customer.e.description);
			
			console.log("cust info > "+attribs[0].customer.e.description);
			console.log("seID******************* > "+attribs[0].seId);
			console.log("service id:  "+attribs[0].serviceOrderId);
			Ext.getCmp("serviceId").setValue(attribs[0].serviceOrderId);
			//Ext.getCmp("name").setValue(attribs[0].name);
			
			console.log("service instance id > "+this.commonData.serviceInstanceId);
			//Ext.getCmp("description").setValue(attribs[0].description);
			
			var grid = Ext.ComponentQuery.query('gridpanel[name=deployedInterfacesGrid]')[0];
			var store = grid.getStore();
			store.removeAll();
			store.getProxy().url = '/serviceui/resteasy/cpp-service/unis/'+this.commonData.serviceInstanceId;
			store.getProxy().extraParams = {'fetchAllChildren': true};
			store.loadPage(1);
                      
        }
		Ext.ComponentQuery.query('#endpointPanel')[0].hide();
        
        // Re-enable the "Reload Table Entries" button.
        //reloadTableEntriesButton.setDisabled(false);
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
		this.port = '';
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
	loadSiteInterfaceGrid:function(record, port) {
		console.log("moid*** "+record);
		console.log("port*** "+port);
		var interfaceList='';
		Ext.Ajax.request({
			method:'GET',
			url:'../serviceui/resteasy/cpp-devices/'+record+'/Juniper/interfaces?page=1&start=0&limit=100',
			//params:{"vendorType":record.get('vendorType')},
			success:function(r) {				
				var result = Ext.decode(r.responseText);
				
				//console.log("result  :"+result.peDeviceInterfaceBeanList[0].deviceId);
				//console.log("result  :"+result.peDeviceInterfaceBeanList.length);
				
				if (result.success && result.success == 'false') { //exception at the backend
					 Ext.Msg.alert(result.title,result.message);
				} else {
					var records = [];
					for (var i=0; i<result.peDeviceInterfaceBeanList.length; i++) {
						if(port  == ''){
							records.push(result.peDeviceInterfaceBeanList[i]);
						}else if(port !='' && port == result.peDeviceInterfaceBeanList[i].portName){
							records.push(result.peDeviceInterfaceBeanList[i]);
						}
					}
					//var storeData={'totalCount':records.length,'interfaceList':records};
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
		

        //var form = this.getComponent(0);
        //form.getForm().reset();
		Ext.getCmp("endpointPanel").hide();
		
    },
	cancelFields: function() {
		Ext.getCmp("updateBtn").hide();
		Ext.getCmp("deleteBtn").hide();
		Ext.getCmp("stageBtn").show();
		Ext.getCmp("endpointPanel").hide();
		
		//this.getComponent(0).getForm().reset();
		
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
       
		customerArray.push({
			 "name": cdata.customerName,
            "ossCustomerId": cdata.customerId,
            "email": cdata.email,
            "description": cdata.customerDescription
		});
		console.log("customer service order name: " + cdata.name);
		var vpnName = Ext.getCmp("vpnName").getValue().trim();
		var topology = Ext.getCmp("topology").getValue();
		if(topology == 'Mesh')
			topology = 'MSH';
		if(topology == 'Hub')
			topology = 'HUB';
		if(topology == 'Spoke')
			topology = 'SPK';
			
		common.name = vpnName + "." + topology + "_MOD_" + (new Date()).getTime();
		console.log("service id** "+Ext.getCmp("serviceId").getValue());
		common.externalId = Ext.getCmp('customerId').getValue();
		common.serviceTag = "L3VPN";
        
		console.log("qos type:: "+cdata.qosType);
		var vpnName = Ext.getCmp("vpnName").getValue().trim();
        // Add service common attributes ...
		var commonAttributesArray = [];
		if(cdata.qosType == null){
			cdata.qosType='';
			console.log("qos type after null :: "+cdata.qosType);
		}
		//cdata.serviceOrderName	
		commonAttributesArray.push({
			 "serviceOrderId": cdata.serviceId,
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
			"adminState" : Ext.getCmp("adminState").getValue(),
			"accounting" : Ext.getCmp("accounting").getValue(),
			"flowSampling" : Ext.getCmp("flowSampling").getValue(),
			"architecture" :"JCE",
			"topology" : Ext.getCmp("topology").getValue(),
			"vrfName" : vpnName,
			"spkVrfName" : Ext.getCmp("spkVrfName").getValue(),
			"spkVrfId" : Ext.getCmp("spkVrfId").getValue(),
			"rd" : Ext.getCmp("rd").getValue(),
			"spkRd" : Ext.getCmp("spkRd").getValue(),
			"redistConnRoutes" : Ext.getCmp("redistConnRoutes").getValue(),
			//"redistConnRoutes" : cdata.redistConnRoutes,
			
			"customer": customerArray
		});
		
		console.log("form data commonAttributesArray* ': " + JSON.stringify(commonAttributesArray));
		
		common[Jx.ProvConstants.SERVICE_COMMON_ATTRIBUTES] = Ext.encode(commonAttributesArray);
	
		formDataArray = [];
		
		
				
	    var siteName = this.scriptUtils.getFieldByName('siteName');
				console.log( "moid "+siteName.getValue());
				console.log( "getRawValue "+siteName.getRawValue());
				 
		var stagedInterfacesStore = Ext.getCmp("stagedInterfacesGrid").getStore();
		//var stagedInterfacesStoreQoS = Ext.getCmp("stagedInterfacesGrid1").getStore();
		//var stagedInterfacesStoreNID = Ext.getCmp("stagedInterfacesGrid2").getStore();
		
		var stagedInterfacesStore_RowCount = stagedInterfacesStore.count();
		console.log("stagedInterfacesStore_RowCount : " + stagedInterfacesStore_RowCount);
		if(stagedInterfacesStore_RowCount==0){
			 Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please add at least one interface to the Staged Area");
			 return;
		}
		console.log("Value of 'stagedInterfacesStore_RowCount': " + stagedInterfacesStore_RowCount);
		for(var i=0; i < stagedInterfacesStore_RowCount; i++) {
    		var row = stagedInterfacesStore.getAt(i);
			
			console.log("seid**********************: "+row.data.seId);
			console.log("recordOPType**********************: "+row.data.recordOPType);
			//var efRate_BWLimit_BurstSize = row.data.efRate.split("|");
			
			
			var efRate = row.data.efRate;
			
			if(efRate != null && efRate.split("|").length == 1){
				efRate = row.data.oldEFRate;
			}
			
			var efRate_BWLimit_BurstSize = [];
			var oldAccessDetail = [];
			var oldQoSOptionDetail = [];
			
			if(row.data.oldAccessDetail != null){
				oldAccessDetail = row.data.oldAccessDetail.split("|");
			}
			if(row.data.oldQoSOptionDetail != null){
				oldQoSOptionDetail = row.data.oldQoSOptionDetail.split("|");
			}
			if(efRate != null){
				 efRate_BWLimit_BurstSize = efRate.split("|");
				}else
				{
					efRate_BWLimit_BurstSize[0]=0;
					efRate_BWLimit_BurstSize[1]=0;
					efRate_BWLimit_BurstSize[2]=0;
					efRate_BWLimit_BurstSize[3]=0;
				}
			
			console.log("pedeviceId : " + row.data.moid);
			var portSpeed = row.data.portSpeed;
			if(portSpeed != null){
				portSpeed = portSpeed.toLowerCase();
				
			}
			//console.log("pedeviceId : " + row.data.site2);
			
			/*var multiVRFArray = [];	
			multiVRFArray.push({
				"ossCustomerId": Ext.getCmp("customerId").getValue(),
				"qosType": row.data.qosType,
				"efRate": row.data.efRate,
				"efService": row.data.efService,
				"accessRate": row.data.accessRate,
				"isAllAFSelected": row.data.isAllAFSelected,
				"isAF1Selected": row.data.isAF1Selected,
				"isAF2Selected": row.data.isAF2Selected,
				"isAF3Selected": row.data.isAF3Selected,
				"af1": row.data.af1,
				"af2": row.data.af2,
				"af3": row.data.af3,
				"ciuLoopback": row.data.ciuLoopback,
				"ciuName": row.data.ciuName,
				"ciuAlias": row.data.ciuAlias,
				"vlanId": row.data.vlanId
			});*/
			
			var multiVRFArray = {
			"ossCustomerId": Ext.getCmp("customerId").getValue(),
				"qosType": row.data.qosType,
				"efRate": row.data.efRate,
				"efService": row.data.efService,
				"accessRate": row.data.accessRate,
				"isAllAFSelected": row.data.isAllAFSelected,
				"isAF1Selected": row.data.isAF1Selected,
				"isAF2Selected": row.data.isAF2Selected,
				"isAF3Selected": row.data.isAF3Selected,
				"af1": row.data.af1,
				"af2": row.data.af2,
				"af3": row.data.af3,
				"ciuLoopback": row.data.ciuLoopback,
				"ciuName": row.data.ciuName,
				"ciuAlias": row.data.ciuAlias,
				"vlanId": row.data.vlanId
			};
			
			var dataForDisplay = row.data.dataForDisplay+"|"+row.data.csId + "."+row.data.ciuName + "."+ row.data.accessRate;	
			var prefix_list =  {
				"prefixList": row.data.prefixList
			};
			
			//var prefixListBeforeUpdateArr = [];

			//Ext.Array.push(prefixListBeforeUpdateArr,row.data.prefixListBeforeUpdate);


			var prefix_list_beforeModify =  {
				"prefixListBeforeUpdate": row.data.prefixListBeforeUpdate
			};
			try{
			formDataArray.push({
				"Interface": row.data.port,
				"pedeviceId": row.data.moid, 
				"site": row.data.site, 
				"vlanId": row.data.vlanId,
				"oldVlanId": row.data.oldVlanId,
				"endPointServiceType": row.data.endPointServiceType,
				"oldEndPointServiceType": row.data.oldEndPointServiceType,
				"ciuLoopback": row.data.ciuLoopback,
				"oldCiuLoopback": row.data.oldCiuLoopback,
				"ciuName": row.data.ciuName,
				"ciuAlias": row.data.ciuAlias,//.trim()
				"management": row.data.management,
				"accessType": row.data.accessType,
				"portSpeed": portSpeed,
				"connectionType": row.data.connectionType,
				"pathPreferences": row.data.pathPreferences,
				"csId": row.data.csId,
				"ipAddress": row.data.ipAddress,
				"subnetMask": row.data.subnetMask,
				"oldIPV4AddressAndMask": row.data.oldIPV4AddressAndMask,
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
				//"ASMesh": row.data.AsRd,
				//"ASHub": row.data.AsRd,
				//"ASSpoke": row.data.AsRdSpk,
				
				"rd": row.data.rd,
				"neighbourAddress": row.data.neighbourAddress,
				
				"oldNeighbourAddress": row.data.oldNeighbourAddress,
				"localPref": row.data.localPref,
				"med": row.data.med,
				"peerAS": row.data.peerAS,
				//"rt": row.data.rt,
				//"rtHub": row.data.rtHub,
				//"rtSpoke": row.data.rtSpoke,
				
				"vrfName": row.data.vpnName,
				"spkVrfName": row.data.spkVrfName,
				"spkVrfId": row.data.spkVrfId,
				
				"oldRT": row.data.oldRT,
				//"rtHub": row.data.rtHub,
				//"rtSpoke": row.data.rtSpoke,
				"accessRate": row.data.accessRate,
				"vpnAlias": row.data.vpnAlias,
				"policyGroup": row.data.policyGroup,
				"vpnRate": row.data.vpnRate,
				//"efRate": row.data.efRate,
				"efRate": efRate_BWLimit_BurstSize[0],
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
				"seId": row.data.seId, //3440644
				"outerEncap":row.data.vlanId,
				"innerEncap":1,
				"operation": row.data.recordOPType,
				"recordOPType": row.data.recordOPType,
				"vendorType": Jx.ProvConstants.JUNIPER,
				"topology": row.data.topology,
				"autonegotiate": row.data.autonegotiate,
				"adminState": row.data.adminState,
				"operationalMode": row.data.operationalMode,
				
				"nextHOP": row.data.nextHOP,
				"multiVRF": row.data.multiVRF,
				"firstUnitForVRF": row.data.firstUnitForVRF,
				"traficControlProfile": row.data.traficControlProfile,
				"qosType": row.data.qosType,
				"oldQosType": row.data.oldQosType,
				"advanced": multiVRFArray,
				"oldAdminState": oldAccessDetail[0],
				"oldAutoNegotiate": oldAccessDetail[1],
				"oldAccessRate": oldQoSOptionDetail[0],
				"oldVpnSpeed": oldQoSOptionDetail[1],
				"oldEFService": oldQoSOptionDetail[2],
				"oldEFRate": oldQoSOptionDetail[3],
				"oldClasifier": oldQoSOptionDetail[4],
				"oldAF3": oldQoSOptionDetail[5],
				"oldAF2": oldQoSOptionDetail[6],
				"oldAF1": oldQoSOptionDetail[7],
				"oldClassifier": oldQoSOptionDetail[8],
				"dataForDisplay" : dataForDisplay,
				"prefixList": prefix_list,
				"prefixListBeforeUpdate": prefix_list_beforeModify
				
				
			});
			}catch(e){
			console.log("e>       > "+e);
			}
		}
				
				console.log("form data formDataArray* ': " + JSON.stringify(formDataArray));
				
				
		common[Jx.ProvConstants.SERVICE_ENDPOINT_ATTRIBUTES] = Ext.encode(formDataArray);
		console.log("form data': " + common);
		
		return common;
    },
	validateForm:function(cdata) {
	
	var vpnName = Ext.getCmp("vpnName").getValue();
	var serviceId = Ext.getCmp("serviceId").getValue();
	var topology = Ext.getCmp("topology").getValue();
	//var vpnAlias = Ext.getCmp("vpnAlias").getValue();
	
	if(serviceId == null || serviceId == ''){
	Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please enter the valid Service Id");
            return true;
	}
	if(vpnName == null || vpnName == '' || vpnName.indexOf("_") == 0 || vpnName.indexOf("-") == 0 || vpnName.lastIndexOf("_") == 	vpnName.length-1 || vpnName.lastIndexOf("-") == vpnName.length-1){
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please enter the valid VRF Name");
            return true;
	}
	if(topology == null || topology == ''){
	Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please enter the valid Topology");
            return true;
	}
	if(rd == null || rd == ''){
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
                {valueText: 'DSCP', displayText: 'DSCP'},
				{valueText: '802.1p', displayText: '802.1p'},
				{valueText: '802.1ad', displayText: '802.1ad'}/*,
				{valueText: 'v1-IP Prec', displayText: 'v1-IP Prec'}*/
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
	var endPointServiceType = Ext.getCmp("endPointServiceType").getValue();
	console.log(" endPointServiceType: "+endPointServiceType);
	var ciuLoopback = Ext.getCmp("ciuLoopback").getValue();
	var vpnName = Ext.getCmp("vpnName").getValue();
	var neighbourAddress = Ext.getCmp("neighbourAddress").getValue();
	
	var ciuName = Ext.getCmp("ciuName").getValue();
	var ciuAlias = Ext.getCmp("ciuAlias").getValue();
	//var accessType = Ext.getCmp("accessType").getValue();
	//var portSpeed = Ext.getCmp("portSpeed").getValue();
	var connectionType = Ext.getCmp("connectionType").getValue();
	var csId = Ext.getCmp("csId").getValue();
	
	//var rt = Ext.getCmp("rt").getValue();
	
	//var rtHub = Ext.getCmp("rtHub").getValue();
	
	//var rtSpoke = Ext.getCmp("rtSpoke").getValue();
	
	var pathPreferences = Ext.getCmp("pathPreferences").getValue();
	//var vlanId = Ext.getCmp("vlanId").getValue();
	var ipAddress = Ext.getCmp("ipAddress").getValue();
	var subnetMask = Ext.getCmp("subnetMask").getValue();
	console.log("subnetMask : "+subnetMask);

	//var loopbackSubnetMask = Ext.getCmp("loopbackSubnetMask").getValue();
	//var ipMTU = Ext.getCmp("ipMTU").getValue();
	//var ipv6Peer =  Ext.getCmp('ipv6Peer').getValue();
	//var ipv6Address = Ext.getCmp("ipv6Address").getValue();
	var localPref = Ext.getCmp("localPref").getValue();
	var med = Ext.getCmp("med").getValue();
	var peerAS = Ext.getCmp("peerAS").getValue();
	//var rd = Ext.getCmp("rd").getValue();
	
	var accessRate = Ext.getCmp("accessRate").getValue();
	var efService = Ext.getCmp("efService").getValue();
	var efRate = Ext.getCmp("efRate").getValue();
	var classifier = Ext.getCmp("classifier").getValue();
	var vpnSpeed = Ext.getCmp("vpnSpeed").getValue();
	var qosType = Ext.getCmp("qosType").getValue();
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
		}else if(qosType == 'QoS per VPN' && (vpnSpeed == '' || vpnSpeed == null)){
			isValid = true;
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the valid VPN Speed");
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
console.log("is port valid: "+this.isPortValid);

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


var autonegotiate = this.scriptUtils.getFieldByName("autonegotiate").getValue();
var adminState = this.scriptUtils.getFieldByName("adminState").getValue();
var operationalMode = this.scriptUtils.getFieldByName("operationalMode").getValue();

var nextHOP = this.scriptUtils.getFieldByName("nextHOP").getValue();

var oldAccessDetail = this.scriptUtils.getFieldByName("oldAccessDetail").getValue();

var oldQoSOptionDetail = this.scriptUtils.getFieldByName("oldQoSOptionDetail").getValue();


console.log("device id: "+this.moid);
	console.log("port id: "+this.port);
	var vlan = Ext.getCmp("vlanId").getValue();
	console.log("vlanId: "+vlan);
	var stagedInterfacesStore = Ext.getCmp("stagedInterfacesGrid").getStore();
	
	console.log("stages no ** : "+stagedInterfacesStore.count());
	
	var numberOfDuplicateVLAN = 0;
		if(stagedInterfacesStore.count() > 0){
			for(var i=0; i < stagedInterfacesStore.count(); i++) {
				var row = stagedInterfacesStore.getAt(i);
				//console.log("moid>>>>>"+ row.data.moid);
				//console.log("port2>>>>>"+ row.data.port);
				//console.log("vlanId1>>>>>"+ row.data.vlanId);
				
				if((this.moid == row.data.moid) && (this.port == row.data.port) && (vlan == row.data.vlanId) ){
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
	var oldEndPointServiceType = this.scriptUtils.getFieldByName("oldEndPointServiceType").getValue();
	console.log(" endPointServiceType: "+endPointServiceType);
	var ciuLoopback = this.scriptUtils.getFieldByName("ciuLoopback").getValue();
	console.log("ciuLoopback : "+ciuLoopback);
	var oldCiuLoopback = this.scriptUtils.getFieldByName("oldCiuLoopback").getValue();
	
	var ciuName = this.scriptUtils.getFieldByName("ciuName").getValue();
	console.log("ciuName : "+ciuName);

	var ciuAlias = this.scriptUtils.getFieldByName("ciuAlias").getValue();
	console.log("ciuAlias : "+ciuAlias);
	
	/*if(ciuName.contains("!") || ciuName.contains("&") || ciuAlias.contains("!") || ciuAlias.contains("&")){
	Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "special character !/& not allowed in CIU Name/Alias!");
	return;
}*/

	var accessType = this.scriptUtils.getFieldByName("accessType").getValue();
	var portSpeed = this.scriptUtils.getFieldByName("portSpeed").getValue();
	var connectionType = this.scriptUtils.getFieldByName("connectionType").getValue();
	var csId = this.scriptUtils.getFieldByName("csId").getValue();
	var pathPreferences = this.scriptUtils.getFieldByName("pathPreferences").getValue();
	var vlanId = this.scriptUtils.getFieldByName("vlanId").getValue();
	var ipAddress = this.scriptUtils.getFieldByName("ipAddress").getValue();
	var subnetMask = this.scriptUtils.getFieldByName("subnetMask").getValue();
	var oldIPV4AddressAndMask = this.scriptUtils.getFieldByName("oldIPV4AddressAndMask").getValue();
	var loopbackSubnetMask = this.scriptUtils.getFieldByName("loopbackSubnetMask").getValue();
	var ipMTU = this.scriptUtils.getFieldByName("ipMTU").getValue();
	//var ipv6Peer = this.scriptUtils.getFieldByName("ipv6Peer").getValue();

	var ipv6Peer =  Ext.getCmp('ipv6Peer').getValue();
	var ipv6Address = this.scriptUtils.getFieldByName("ipv6Address").getValue();
	console.log("ipv6Address : "+ipv6Address);

	var rd = this.scriptUtils.getFieldByName("rd").getValue();
	var vpnName = this.scriptUtils.getFieldByName("vpnName").getValue(); //Mesh vrf
	
	var spkVrfName = this.scriptUtils.getFieldByName("spkVrfName").getValue(); 
	var spkRd = this.scriptUtils.getFieldByName("spkRd").getValue(); 
	var spkVrfId = this.scriptUtils.getFieldByName("spkVrfId").getValue();

	var management = this.scriptUtils.getFieldByName("management").getValue(); 
	
	var neighbourAddress = this.scriptUtils.getFieldByName("neighbourAddress").getValue();
	var localPref = this.scriptUtils.getFieldByName("localPref").getValue();
	var med = this.scriptUtils.getFieldByName("med").getValue();
	var peerAS = this.scriptUtils.getFieldByName("peerAS").getValue();

	var accessRate = this.scriptUtils.getFieldByName("accessRate").getValue();
	var vpnAlias = Ext.getCmp("vpnAlias").getValue();
	var policyGroup = Ext.getCmp("policyGroup").getValue();
	var vpnRate = Ext.getCmp("vpnSpeed").getValue();
	var efRate = this.scriptUtils.getFieldByName("efRate").getValue();


	var efService =  Ext.getCmp('efService').getValue();
	var isAllAFSelected =  Ext.getCmp('isAllAFSelected').getValue();
	var isAF1Selected =  Ext.getCmp('isAF1Selected').getValue();
	var isAF2Selected =  Ext.getCmp('isAF2Selected').getValue();
	var isAF3Selected =  Ext.getCmp('isAF3Selected').getValue();

	var beService =  Ext.getCmp('beService').getValue();

	var classifier =  Ext.getCmp('classifier').getValue();


	var af1 = this.scriptUtils.getFieldByName("af1").getValue();
	var af2 = this.scriptUtils.getFieldByName("af2").getValue();
	var af3 = this.scriptUtils.getFieldByName("af3").getValue();

	var mvpn =  Ext.getCmp('mvpn').checkboxCmp.getValue();
	//var mvpn = this.scriptUtils.getFieldByName("mvpn").getValue();
	var senderSite = this.scriptUtils.getFieldByName("senderSite").getValue();
	var ssmIP = this.scriptUtils.getFieldByName("ssmIP").getValue();
	var ssmIpMask = this.scriptUtils.getFieldByName("ssmIpMask").getValue();

	 if(ssmIpMask == null){
						ssmIpMask=30;
						console.log("ssmIpMask after null :: "+ssmIpMask);
					}
	var rpType = this.scriptUtils.getFieldByName("rpType").getValue();
	var rpAddress = this.scriptUtils.getFieldByName("rpAddress").getValue();
	var rpGprRange = this.scriptUtils.getFieldByName("rpGprRange").getValue();
	var topology = this.scriptUtils.getFieldByName("topology").getValue();
	var qosType = Ext.getCmp("qosType").getValue();
	
	//var AsRd = this.scriptUtils.getFieldByName("AsRd").getValue();
	//var AsRdSpk = this.scriptUtils.getFieldByName("AsRdSpk").getValue();


	//var rt = this.scriptUtils.getFieldByName("rt").getValue();
	//var rtHub = this.scriptUtils.getFieldByName("rtHub").getValue();

	//var rtSpoke = this.scriptUtils.getFieldByName("rtSpoke").getValue();
	var oldRT = this.scriptUtils.getFieldByName("oldRT").getValue();
	//console.log(" rt: "+rt);

	console.log("******************");


	var softwareVersion =  Ext.getCmp("softwareVersion").getValue();
	var nodeType = Ext.getCmp("nodeType").getValue();
	var siteName = this.site;

	var dataForDisplay = softwareVersion + "|"+ nodeType + "|" + siteName;	

	
	if(!this.validateAF()){
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please enter the valid AF1%AF2%AF3%");
	return;
	}
	if(af1+af2+af3> 100){
	 Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "AF1% AF2% AF3% can not over 100!");
            return true;
	}
	
	if((this.site == null) && (this.port == null) || (this.site == '') && (this.port == '')) {
            Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please select the Site and Site Interface in order to add to the staging area!!");
            return true;
        }
		
		
		//var doesIpDuplicationExistInStagedInterfacesStore = false;
        //var doesPeSubinterfaceExistInStagedInterfacesStore = false;
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
	
	var ipv4PrefixListArr = [];
	var prefixListGrid = Ext.getCmp("prefixListGrid1").getStore();
	    var prefixListGrid_RowCount = prefixListGrid.count();
        		
			for(var i=0; i < prefixListGrid_RowCount; i++) {
				if(prefixListGrid.getAt(i).data.prefixList == ''){
						Ext.MessageBox.alert('Validation Error','PrefixList can not be empty');
					return;
				}
				Ext.Array.push(ipv4PrefixListArr,prefixListGrid.getAt(i).data);
			}
		
	var endpointPanel = Ext.ComponentQuery.query('#endpointPanel')[0];
	endpointPanel.hide();
	
	stagedInterfacesStore.add({
		moid: this.moid,
		site: this.site,
		port: this.port,
		endPointServiceType: endPointServiceType,
		oldEndPointServiceType: oldEndPointServiceType,  
		ciuLoopback: ciuLoopback,
		oldCiuLoopback: oldCiuLoopback,
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
		ipAddressAndMask: ipAddress+"/"+subnetMask,
		oldIPV4AddressAndMask: oldIPV4AddressAndMask,
		loopbackSubnetMask: loopbackSubnetMask,
		ipMTU: ipMTU,
		ipv6Peer: ipv6Peer,
		ipv6Address: ipv6Address,
		vpnName: vpnName,
		//AsRd: AsRd,
		//AsRdSpk: AsRdSpk,
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
		seId:0,
		recordOPType: 'ADD',
		autonegotiate: autonegotiate,
		adminState: adminState,
		operationalMode : operationalMode,
		nextHOP: nextHOP,
		mvpn: mvpn,
		senderSite: senderSite,
		ssmIP: ssmIP,
		ssmIpMask: ssmIpMask,
		rpType: rpType,
		rpAddress: rpAddress,
		rpGprRange: rpGprRange,
		topology: topology,
		qosType: qosType,
		//rt: rt,
		//rtHub: rtHub,
		//rtSpoke: rtSpoke,
		oldRT: oldRT,
		oldAccessDetail: oldAccessDetail,
		oldQoSOptionDetail: oldQoSOptionDetail,
		dataForDisplay: dataForDisplay,
		prefixList: ipv4PrefixListArr,
		management: management
		
	}); 	
	Ext.getCmp("stagedInterfacesGrid").getView().refresh();
	//Ext.getCmp("topologyFieldset").setDisabled(true);
	Ext.getCmp("rd").setDisabled(true);
},

handleUpdateStagedInterface:function() {
	Ext.getCmp("siteName").show();
	Ext.getCmp("siteNameRO").hide();
	Ext.getCmp("portSpeed").setDisabled(false);
	Ext.getCmp("portSpeed").setDisabled(false);
	Ext.getCmp("ciuLoopback").setDisabled(false);
	Ext.getCmp("ciuName").setDisabled(false);
	Ext.getCmp("ciuAlias").setDisabled(false);
	Ext.getCmp("vlanId").setDisabled(false);
	Ext.getCmp("ipAddress").setDisabled(false);
	Ext.getCmp("subnetMask").setDisabled(false);
	var isDeployedUpdated = Ext.getCmp("isDeployedUpdated").getValue();
	console.log("handleUpdateStagedInterface");
	var endPointServiceType = Ext.getCmp("endPointServiceType").getValue();
	var oldEndPointServiceType = Ext.getCmp("oldEndPointServiceType").getValue();
	var ciuLoopback = Ext.getCmp("ciuLoopback").getValue();
	var oldCiuLoopback = Ext.getCmp("oldCiuLoopback").getValue();
	var ciuName = Ext.getCmp("ciuName").getValue();
	var ciuAlias = Ext.getCmp("ciuAlias").getValue();
	/*if(ciuName.contains("!") || ciuName.contains("&") || ciuAlias.contains("!") || ciuAlias.contains("&")){
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "special character !/& not allowed in CIU Name/Alias!");
		return;
	}*/
	
	 // Perform a check on the IP address entered. We need to make sure that the IP, in combination with the mask, is valid.
	 // ie. we cannot have an IP that is the broadcast or network address of the subnet.
	 if(this.validateIpAddress()){
			return;
	 };

	 if(!this.validateAF()){
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please enter the valid AF1%AF2%AF3%");
	return;
	}
	
	var accessType = Ext.getCmp("accessType").getValue();
	var portSpeed = Ext.getCmp("portSpeed").getValue();
	var multiVRF = Ext.getCmp("multiVRF").getValue();
	var firstUnitForVRF = Ext.getCmp("firstUnitForVRF").getValue();
	var traficControlProfile = Ext.getCmp("traficControlProfile").getValue();
	var qosType = Ext.getCmp("qosType").getValue();
	var connectionType = Ext.getCmp("connectionType").getValue();
	
	var csId = Ext.getCmp("csId").getValue();
    
	var pathPreferences = Ext.getCmp("pathPreferences").getValue();
	var vlanId = Ext.getCmp("vlanId").getValue();
	var oldVlanId = Ext.getCmp("oldVlanId").getValue();
	var oldNeighbourAddress = Ext.getCmp("oldNeighbourAddress").getValue();
	
	var ipAddress = Ext.getCmp("ipAddress").getValue();
	var subnetMask = Ext.getCmp("subnetMask").getValue();
	var oldIPV4AddressAndMask = Ext.getCmp("oldIPV4AddressAndMask").getValue();
	//var loopbackSubnetMask = Ext.getCmp("loopbackSubnetMask").getValue();
	var ipMTU = Ext.getCmp("ipMTU").getValue();
	var ipv6Peer =Ext.getCmp("ipv6Peer").getValue();
	var ipv6Address =Ext.getCmp("ipv6Address").getValue();
	var rd = Ext.getCmp("rd").getValue();
	var vpnName = Ext.getCmp("vpnName").getValue(); 
	var spkVrfName = Ext.getCmp("spkVrfName").getValue(); 
	var spkRd = Ext.getCmp("spkRd").getValue(); 
	var spkVrfId = Ext.getCmp("spkVrfId").getValue();
	var management =Ext.getCmp("management").getValue();
	//var AsRd = Ext.getCmp("AsRd").getValue();
	//var AsRdSpk = Ext.getCmp("AsRdSpk").getValue();
	
	var neighbourAddress = Ext.getCmp("neighbourAddress").getValue();
	var localPref = Ext.getCmp("localPref").getValue();
	var med = Ext.getCmp("med").getValue();
	var peerAS = Ext.getCmp("peerAS").getValue();
	//var rt = Ext.getCmp("rt").getValue();
	//var rtHub = Ext.getCmp("rtHub").getValue();
	//var rtSpoke = Ext.getCmp("rtSpoke").getValue();
	var oldRT = Ext.getCmp("oldRT").getValue();	
	var accessRate = Ext.getCmp("accessRate").getValue();
	var vpnAlias = Ext.getCmp("vpnAlias").getValue();
	var policyGroup = Ext.getCmp("policyGroup").getValue();
	//var autonegotiate = Ext.getCmp("autonegotiate").getValue();
	var vpnRate = Ext.getCmp("vpnSpeed").getValue();
	
	var oldAccessDetail = Ext.getCmp("oldAccessDetail").getValue();
	var oldQoSOptionDetail = Ext.getCmp("oldQoSOptionDetail").getValue();
	
	var efRate = Ext.getCmp("efRate").getValue();
	var oldEFRate = Ext.getCmp("oldEFRate").getValue();
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
	
	var mvpn =Ext.getCmp("mvpn").checkboxCmp.getValue();
	var senderSite =Ext.getCmp("senderSite").getValue();
	var ssmIP =Ext.getCmp("ssmIP").getValue();
	var ssmIpMask =Ext.getCmp("ssmIpMask").getValue();
	var autonegotiate = this.scriptUtils.getFieldByName("autonegotiate").getValue();
	var adminState = this.scriptUtils.getFieldByName("adminState").getValue();
	var operationalMode = this.scriptUtils.getFieldByName("operationalMode").getValue();
	
	var nextHOP = this.scriptUtils.getFieldByName("nextHOP").getValue();
	
	 if(ssmIpMask == null){
		ssmIpMask=30;
		console.log("ssmIpMask after null :: "+ssmIpMask);
	}
	var rpType =Ext.getCmp("rpType").getValue();
	var rpAddress =Ext.getCmp("rpAddress").getValue();
	var rpGprRange =Ext.getCmp("rpGprRange").getValue();
	
	console.log("rpGprRange': " +rpGprRange);

	var index = Ext.getCmp("index").getValue();
	console.log('index to update: '+index);


	console.log("******************");
	console.log("ipAddress': " + ipAddress);
	console.log("******************");


	if(af1+af2+af3> 100){
	 Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "AF1% AF2% AF3% can not over 100!");
            return true;
	}
	
	console.log(" isDeployedUpdated " +isDeployedUpdated);
	var ipv4PrefixListArr = [];
	var prefixListGrid = Ext.getCmp("prefixListGrid1").getStore();
	var prefixListGrid_RowCount = prefixListGrid.count();
        		
	for(var i=0; i < prefixListGrid_RowCount; i++) {
		if(prefixListGrid.getAt(i).data.prefixList == ''){
				Ext.MessageBox.alert('Validation Error','PrefixList can not be empty');
			return;
		}
		Ext.Array.push(ipv4PrefixListArr,prefixListGrid.getAt(i).data);
	}
			
	
	var row;
	//var rowUpdate;
	var deployedInterfacesGrid = Ext.getCmp("deployedInterfacesGrid").getStore();
	var stagedInterfacesStore = Ext.getCmp("stagedInterfacesGrid").getStore();
				
	if(isDeployedUpdated == 'true'){
			console.log("deployed");
			
			try{
			row = deployedInterfacesGrid.getAt(index);
			
			deployedInterfacesGrid.getAt(index).data.recordOPType="MODIFY";
			deployedInterfacesGrid.getAt(index).data.vlanId=vlanId;
			
			stagedInterfacesStore.add(row);
			var stageCount = stagedInterfacesStore.count();
			stagedInterfacesStore.getAt(stageCount-1).data.prefixList=ipv4PrefixListArr;
			stagedInterfacesStore.getAt(stageCount-1).data.prefixListBeforeUpdate=row.data.prefixListBeforeUpdate;
			stagedInterfacesStore.getAt(stageCount-1).data.ipAddressAndMask=row.data.ipAddress+"/"+row.data.subnetMask;
			stagedInterfacesStore.getAt(stageCount-1).data.oldQoSType=row.data.oldQosType;
			stagedInterfacesStore.getAt(stageCount-1).data.recordOPType="MODIFY";
			stagedInterfacesStore.getAt(stageCount-1).data.ipMTU=ipMTU;
			stagedInterfacesStore.getAt(stageCount-1).data.csId=csId;
			stagedInterfacesStore.getAt(stageCount-1).data.ciuLoopback=ciuLoopback;
			stagedInterfacesStore.getAt(stageCount-1).data.oldVlanId=oldVlanId;
			stagedInterfacesStore.getAt(stageCount-1).data.oldRT=oldRT;
			stagedInterfacesStore.getAt(stageCount-1).data.autonegotiate=autonegotiate;
			stagedInterfacesStore.getAt(stageCount-1).data.adminState=adminState;
			stagedInterfacesStore.getAt(stageCount-1).data.operationalMode = operationalMode;
			stagedInterfacesStore.getAt(stageCount-1).data.nextHOP=nextHOP;
			//stagedInterfacesStore.getAt(stageCount-1).data.rt=rt;
			//stagedInterfacesStore.getAt(stageCount-1).data.rtHub=rtHub;
			//stagedInterfacesStore.getAt(stageCount-1).data.rtSpoke=rtSpoke;
			stagedInterfacesStore.getAt(stageCount-1).data.oldCiuLoopback=oldCiuLoopback;
			stagedInterfacesStore.getAt(stageCount-1).data.oldNeighbourAddress=oldNeighbourAddress;
			
			stagedInterfacesStore.getAt(stageCount-1).data.neighbourAddress=neighbourAddress;
			stagedInterfacesStore.getAt(stageCount-1).data.oldIPV4AddressAndMask=oldIPV4AddressAndMask;
			
			stagedInterfacesStore.getAt(stageCount-1).data.ipAddress=ipAddress;
			
			stagedInterfacesStore.getAt(stageCount-1).data.ipv6Peer=ipv6Peer;
			stagedInterfacesStore.getAt(stageCount-1).data.ipv6Address=ipv6Address;
			
			stagedInterfacesStore.getAt(stageCount-1).data.af1=af1;
			stagedInterfacesStore.getAt(stageCount-1).data.af2=af2;
			stagedInterfacesStore.getAt(stageCount-1).data.af3=af3;
			
			stagedInterfacesStore.getAt(stageCount-1).data.accessRate=accessRate;
			stagedInterfacesStore.getAt(stageCount-1).data.vpnRate=vpnRate;
			stagedInterfacesStore.getAt(stageCount-1).data.oldAccessDetail=oldAccessDetail;
			stagedInterfacesStore.getAt(stageCount-1).data.oldQoSOptionDetail=oldQoSOptionDetail;
			stagedInterfacesStore.getAt(stageCount-1).data.efRate=efRate;
			stagedInterfacesStore.getAt(stageCount-1).data.oldEFRate=oldEFRate;
			stagedInterfacesStore.getAt(stageCount-1).data.policyGroup=policyGroup;
			stagedInterfacesStore.getAt(stageCount-1).data.autonegotiate=autonegotiate;
			stagedInterfacesStore.getAt(stageCount-1).data.classifier=classifier;
			stagedInterfacesStore.getAt(stageCount-1).data.isAllAFSelected=isAllAFSelected;
			stagedInterfacesStore.getAt(stageCount-1).data.isAF1Selected=isAF1Selected;
			stagedInterfacesStore.getAt(stageCount-1).data.isAF2Selected=isAF2Selected;
			stagedInterfacesStore.getAt(stageCount-1).data.isAF3Selected=isAF3Selected;
			stagedInterfacesStore.getAt(stageCount-1).data.endPointServiceType=endPointServiceType;
			stagedInterfacesStore.getAt(stageCount-1).data.oldEndPointServiceType=oldEndPointServiceType;
			stagedInterfacesStore.getAt(stageCount-1).data.portSpeed=portSpeed;
			stagedInterfacesStore.getAt(stageCount-1).data.qosType=qosType;
			stagedInterfacesStore.getAt(stageCount-1).data.efService=efService;
			stagedInterfacesStore.getAt(stageCount-1).data.pathPreferences=pathPreferences;
			stagedInterfacesStore.getAt(stageCount-1).data.management=management;
			
			}catch(e){
				console.log("error on addding** "+e);
			}
			
			//stagedInterfacesStore.add(row);
			//stagedInterfacesStore.getView().refresh();	
			//stagedInterfacesStore.getAt(stagedInterfacesStore.count()-1).data.recordOPType="DELETE";
			//me.setFieldDisabled('topology',true);
			Ext.getCmp('topology').setDisabled(true);
			Ext.getCmp("stagedInterfacesGrid").getView().refresh();	
			Ext.getCmp("isDeployedUpdated").setValue("false");
			
			/*Ext.getCmp('csId').setDisabled(false);
			Ext.getCmp('localPref').setDisabled(false);
			Ext.getCmp('med').setDisabled(false);
			Ext.getCmp('ciuName').setDisabled(false);
			Ext.getCmp('ciuAlias').setDisabled(false);
			Ext.getCmp('af1').setDisabled(false);
			Ext.getCmp('af2').setDisabled(false);
			Ext.getCmp('af3').setDisabled(false);
			Ext.getCmp('qosType').setDisabled(false);
			Ext.getCmp('isAF1Selected').setDisabled(false);
			Ext.getCmp('isAF2Selected').setDisabled(false);
			Ext.getCmp('isAF3Selected').setDisabled(false);
			Ext.getCmp('isAllAFSelected').setDisabled(false);*/
			//row=rowUpdate;
			//row.data.recordOPType='ADD';
			//console.log(" row " +row);
	
	}else{
		 row = stagedInterfacesStore.getAt(index);
	}
		console.log("adding and removing** ");
		
		var endpointPanel = Ext.ComponentQuery.query('#endpointPanel')[0];
	endpointPanel.hide();
	
	var clearInactiveEntriesFromListButton = Ext.getCmp('clearInactiveEntriesFromListButton');
	clearInactiveEntriesFromListButton.show();
	
	var updateBtn = Ext.getCmp('updateBtn');
	updateBtn.hide();
	Ext.getCmp('deleteBtn').hide();
	var stageBtn = Ext.getCmp('stageBtn');
	stageBtn.show();
	
	var interfacegrid = Ext.ComponentQuery.query('gridpanel[name=siteInterfaceGrid]')[0];
	interfacegrid.setDisabled(false);
	
	
	Ext.getCmp('siteName').setDisabled(false);
	Ext.getCmp('ipAddress').setDisabled(false);
	Ext.getCmp('subnetMask').setDisabled(false);
	Ext.getCmp('vlanId').setDisabled(false);
	Ext.getCmp('neighbourAddress').setDisabled(false);
	
	Ext.getCmp('ciuLoopback').setDisabled(false);
	Ext.getCmp('loopbackSubnetMask').setDisabled(false);
															
	//var topology = Ext.getCmp('topology').setDisabled(false);
		if(isDeployedUpdated == 'true'){
		console.log("***** index * "+index);
		//try{
		
		deployedInterfacesGrid.removeAt(index);
		
	Ext.getCmp("deployedInterfacesGrid").getView().refresh();	
	console.log("vlanId ******* : "+vlanId);

}
if(isDeployedUpdated == 'false'){
		row.data.endPointServiceType= endPointServiceType;   
		row.data.oldEndPointServiceType= oldEndPointServiceType;   
		row.data.ciuLoopback= ciuLoopback;
		row.data.oldCiuLoopback= oldCiuLoopback;
		row.data.ciuName= ciuName;
		row.data.ciuAlias= ciuAlias;
		row.data.accessType= accessType;
		row.data.portSpeed= portSpeed;
		row.data.connectionType= connectionType;
		row.data.csId= csId,
		row.data.pathPreferences= pathPreferences,
		row.data.vlanId= vlanId;
		row.data.ipAddress= ipAddress;
		row.data.subnetMask= subnetMask;
		row.data.ipAddressAndMask= ipAddress+"/"+subnetMask;
		row.data.oldIPV4AddressAndMask= oldIPV4AddressAndMask;
		row.data.ipMTU= ipMTU;
		row.data.ipv6Peer= ipv6Peer;
		row.data.ipv6Address= ipv6Address;//+"."+ipv6Address1+"."+ipv6Address2+"."+ipv6Address3;;
		row.data.rd= rd;
		row.data.spkVrfName = spkVrfName,
		row.data.vpnName = vpnName,
		row.data.spkRd = spkRd,
		row.data.spkVrfId = spkVrfId,
		row.data.neighbourAddress= neighbourAddress;
		row.data.oldNeighbourAddress= oldNeighbourAddress;
		//row.data.neighbourSubnetMask= neighbourSubnetMask;
		row.data.localPref= localPref;
		row.data.med= med;
		row.data.peerAS= peerAS;
		row.data.accessRate= accessRate;
		
		row.data.multiVRF= multiVRF;
		row.data.firstUnitForVRF= firstUnitForVRF;
		row.data.traficControlProfile= traficControlProfile;
		
		row.data.vpnRate= vpnRate;
		row.data.vpnAlias= vpnAlias;
		row.data.policyGroup= policyGroup;
		row.data.qosType= qosType;
		row.data.vpnRate= vpnRate;
		row.data.oldAccessDetail= oldAccessDetail;
		row.data.oldQoSOptionDetail= oldQoSOptionDetail;
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
		//row.data.rt=rt;
		//row.data.rtHub=rtHub;
		//row.data.rtSpoke=rtSpoke;
		//row.data.AsRd=AsRd;
		//row.data.AsRdSpk=AsRdSpk;
		
		row.data.oldRT=oldRT;
		row.data.autonegotiate=autonegotiate;
		row.data.adminState=adminState;
		row.data.operationalMode =operationalMode;
		row.data.nextHOP=nextHOP;
		row.data.prefixList= ipv4PrefixListArr;
		row.data.management= management;
	}
	
	Ext.getCmp("stagedInterfacesGrid").getView().refresh();	
},

handleDeleteStagedInterface:function() {
	Ext.getCmp("siteName").show();
	Ext.getCmp("siteNameRO").hide();
	var oldVlanId = Ext.getCmp("oldVlanId").getValue();
	
	var oldNeighbourAddress = Ext.getCmp("oldNeighbourAddress").getValue();
	
	
	var isDeployedUpdated = Ext.getCmp("isDeployedUpdated").getValue();
	var index = Ext.getCmp("index").getValue();
	console.log('index to update: '+index);

	console.log(" isDeployedUpdated " +isDeployedUpdated);
	
	var row='';
	var deployedInterfacesGrid = Ext.getCmp("deployedInterfacesGrid").getStore();

	if(isDeployedUpdated == 'true'){ 
			console.log("deployed");
			row = deployedInterfacesGrid.getAt(index);
	}
	var stagedInterfacesStore = Ext.getCmp("stagedInterfacesGrid").getStore();
	//row = stagedInterfacesStore.getAt(index);
	
	row.data.recordOPType='DELETE';
	row.data.oldVlanId=oldVlanId;
	row.data.oldNeighbourAddress=oldNeighbourAddress;
	
	stagedInterfacesStore.add(row);
	deployedInterfacesGrid.removeAt(index);
	
		
	var endpointPanel = Ext.ComponentQuery.query('#endpointPanel')[0];
	endpointPanel.hide();
	
	var clearInactiveEntriesFromListButton = Ext.getCmp('clearInactiveEntriesFromListButton');
	clearInactiveEntriesFromListButton.show();
	
	var updateBtn = Ext.getCmp('updateBtn');
	updateBtn.hide();
	Ext.getCmp('deleteBtn').hide();
	var stageBtn = Ext.getCmp('stageBtn');
	stageBtn.show();
	
	var interfacegrid = Ext.ComponentQuery.query('gridpanel[name=siteInterfaceGrid]')[0];
	interfacegrid.setDisabled(false);
	
	Ext.getCmp('siteName').setDisabled(false);
	Ext.getCmp('topology').setDisabled(false);
	Ext.getCmp('ipAddress').setDisabled(false);
	Ext.getCmp('subnetMask').setDisabled(false);
	Ext.getCmp('vlanId').setDisabled(false);
	Ext.getCmp('neighbourAddress').setDisabled(false);
	Ext.getCmp('ciuLoopback').setDisabled(false);
	Ext.getCmp('loopbackSubnetMask').setDisabled(false);
	//me.setFieldDisabled('siteInterface',true);
	Ext.getCmp("stagedInterfacesGrid").getView().refresh();	
	Ext.getCmp("deployedInterfacesGrid").getView().refresh();	
	//Ext.getCmp('topology').setValue("");
},

handleClearAddSiteInterfacePanelButton:function() {
        Ext.getCmp("endPointServiceType").reset();
		Ext.getCmp("ciuLoopback").reset();
		Ext.getCmp("ciuName").reset();
		Ext.getCmp("ciuAlias").reset();
		Ext.getCmp("accessType").reset();
		Ext.getCmp("portSpeed").reset();
		Ext.getCmp("connectionType").reset();
		Ext.getCmp("vlanId").reset();
		Ext.getCmp("ipAddress").reset();
		Ext.getCmp("subnetMask").reset();
		Ext.getCmp("loopbackSubnetMask").reset();
		Ext.getCmp("ipMTU").reset();
		Ext.getCmp("csId").reset();

		Ext.getCmp("rd").reset();
		Ext.getCmp("neighbourAddress").reset();
		Ext.getCmp("localPref").reset();
		Ext.getCmp("med").reset();
		Ext.getCmp("peerAS").reset();
		
		Ext.getCmp("accessRate").reset();
		Ext.getCmp("efRate").reset();
		Ext.getCmp("af1").reset();
		Ext.getCmp("af2").reset();
		Ext.getCmp("af3").reset();
    },
  handleClearInactiveEntriesFromList:function() {
        // Get a count of the number of entries currently in grid 'stagedInterfacesGrid'.
		var records = Ext.getCmp("stagedInterfacesGrid").selModel.getSelection();
		console.log("opt type: "+records.recordOPType);
		
		var deployedInterface = Ext.getCmp("stagedInterfacesGrid").selModel.getSelection()[0].data.deployedInterface;
		if(deployedInterface == 'true'){
		console.log("deployedInterface 21> >  : "+deployedInterface);
		var row = Ext.getCmp("stagedInterfacesGrid").selModel.getSelection()[0].data;
		console.log("ipAddressAndMask > > : "+row.ipAddressAndMask);
		
		Ext.getCmp("deployedInterfacesGrid").getStore().add(row);
		Ext.getCmp("deployedInterfacesGrid").getStore().getAt(0).data.ipAddressAndMask = row.ipAddressAndMask;
		 Ext.getCmp("deployedInterfacesGrid").getView().refresh();
		}
		Ext.getCmp("stagedInterfacesGrid").getStore().remove(records);

	    Ext.getCmp("stagedInterfacesGrid").getView().refresh();
    },
validateVLAN:function() {
	//deviceId,port,vlan
	console.log("device id: "+this.moid);
	console.log("port id: "+this.port);
	var vlan = Ext.getCmp("vlanId").getValue();
	console.log("vlanId: "+vlan);
	var stagedInterfacesStore = Ext.getCmp("stagedInterfacesGrid").getStore();
	
	console.log("stages no : "+stagedInterfacesStore.count());
	var msg = '';
	var numberOfDuplicateVLAN = 0;
		if(stagedInterfacesStore.count() > 0){
			for(var i=0; i < stagedInterfacesStore.count(); i++) {
				var row = stagedInterfacesStore.getAt(i);
				console.log("moid>>>>>"+ row.data.moid);
				console.log("port2>>>>>"+ row.data.port);
				console.log("vlanId1>>>>>"+ row.data.vlanId);
				
				if((this.moid == row.data.moid) && (this.port == row.data.port) && (vlan == row.data.vlanId) ){
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
        // First we need to get the network address ...
        var networkAddress = this.getNetworkAddress(ipAddress, subnetMask_DecimalNotation);
        //console.log("Value of 'networkAddress': " + networkAddress);
        
        var broadcastAddress;
        var broadcastAddress_FourthOctet='';
        
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
    }
	,
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
	getInterfaceDescription: function(interfaceName, siteName) {
		console.log("getting interface description*****************");
		console.log("getting interface description siteName*****************"+siteName);
		console.log("getting interface description*******interfaceName********** "+interfaceName);
		var selectedPort=  Ext.getCmp("siteInterfaceGrid").getSelectionModel().getSelection()[0];
		console.log("selectedPort********** "+selectedPort);
		if(selectedPort != undefined){
			this.getMultiVRFDetails(interfaceName);
		}
		console.log("selectedPort1********** "+selectedPort);
		var vendor = 'Juniper';
		var inventoryType = 'device';
		var device_IntferfaceDesc_XPath = "/device/configuration/interfaces/interface[name='" + interfaceName + "']";
		//var formData = this.scriptUtils.getFormValues(this);
		if(siteName == null || '')
			siteName = Ext.getCmp('siteName').getValue();
			
			console.log("siteNamesiteName********** "+siteName);
		this.getNodeList(siteName, vendor, inventoryType, device_IntferfaceDesc_XPath, function(results){ 
			
			
			try{
				var interfaceDescription = results["interface"].description;
				
				//var unit = results["interface"]["unit"].length;
			
			console.log("no of unit "+results["interface"]["unit"].length);
			
			if(results["interface"]["unit"] != undefined && results["interface"]["unit"].length == undefined){
				Ext.getCmp("qosType").setDisabled(false);
				Ext.getCmp("classifier").setDisabled(false);	
			}
				
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
					Ext.getCmp("lblInterfaceDescription").setValue(results["interface"]["description"]["#text"]);
				}
			}
			catch(e){
				console.log("error:   "+e);
				Ext.getCmp("lblInterfaceDescription").setValue("");
			}
		}
		);
	},
	getUnitDescription: function(interfaceName, unit, siteName) {
	console.log("unit desc********* " +interfaceName);
	console.log("unit desc****unit***** "+unit);
	console.log("unit desc****siteName***** "+siteName);
		var vendor = 'Juniper';
		var inventoryType = 'device';
		//var device_IntferfaceDesc_XPath = "/device/configuration/interfaces/interface[name='" + interfaceName + "']/unit[name='" + unit + "']";
		var device_IntferfaceDesc_XPath = "/device/configuration/interfaces/interface[name='" + interfaceName + "']/unit";
		//var formData = this.scriptUtils.getFormValues(this);
		//var siteName = Ext.getCmp('siteName').getValue();
		this.getNodeList(siteName, vendor, inventoryType, device_IntferfaceDesc_XPath, function(results){ 
			
			
			try{
				var unitDescription = results["unit"].description;
				console.log("unit length: "+ results["unit"].length);
				
				if(results["unit"].length ==undefined){
					Ext.getCmp("qosType").setDisabled(false);
					Ext.getCmp("af1").setDisabled(false);
					Ext.getCmp("af2").setDisabled(false);
					Ext.getCmp("af3").setDisabled(false);
					Ext.getCmp("classifier").setDisabled(false);
				}else{
						console.log("more than 1 interfaces deployed**");
						Ext.getCmp('af1').setDisabled(true);
						Ext.getCmp('af2').setDisabled(true);
						Ext.getCmp('af3').setDisabled(true);
				}
				console.log("unit length"+unitDescription);
				
				//Ext.getCmp("lblIUnitDescription").setValue(unitDescription);
				
			}
			catch(e){
				console.log("error:>   "+e);
				//Ext.getCmp("lblIUnitDescription").setValue("");
			}
		}
		);
	},
	getMultiVRFDetails:function(id) {
		//var interfaceList='';
		//serviceui/resteasy/cpp-service/advance-details/7634997?portName=ge-0/2/3&customerName=customer1
		var selectedPort=  Ext.getCmp("siteInterfaceGrid").getSelectionModel().getSelection()[0].data.portName;
		var deviceId = Ext.getCmp("siteName").getValue();
		var ossCustomerId = Ext.getCmp("customerId").getValue();
		Ext.Ajax.request({
			method:'GET',
			url:'../serviceui/resteasy/cpp-service/advance-details/'+deviceId+'?Interface='+selectedPort+'&ossCustomerId='+ossCustomerId,
			success:function(r) {				
				var result = Ext.decode(r.responseText);
				try{
				if(result.advanced != undefined || result.advanced != ''){
				console.log("ciu name >> ..   :"+result.advanced[0].ciuName);
				if(result.advanced[0].qosType.trim() == "QoS per Access"){
						var af1 = result.advanced[0].af1;
						var af2 = result.advanced[0].af2;
						var af3 = result.advanced[0].af3;
						var ciuName = result.advanced[0].ciuName;
						console.log("ciuName<< "+ciuName);
						var ciuAlias = result.advanced[0].ciuAlias;
						var ciuLoopback = result.advanced[0].ciuLoopback;
						
						//var customerId = result.advanced[0].ossCustomerId;
						var accessRate = result.advanced[0].accessRate;
						console.log("accessRAte<< "+accessRate);
						
						var efRate = result.advanced[0].efRate;
						
						var efService = result.advanced[0].efService;
						var isAF1Selected = result.advanced[0].isAF1Selected;
						var isAF2Selected = result.advanced[0].isAF2Selected;
						var isAF3Selected = result.advanced[0].isAF3Selected;
						var isAllAFSelected = result.advanced[0].isAllAFSelected;
						var qosType = result.advanced[0].qosType;
						//var unit = result.advanced[0].vlanId;
						
						Ext.getCmp("endPointServiceType").setValue("TML3A");
						Ext.getCmp('accessRate').setDisabled(true);
						Ext.getCmp('endPointServiceType').setDisabled(true);
						Ext.getCmp('efRate').setDisabled(true);
						Ext.getCmp('qosType').setDisabled(true);
						Ext.getCmp("isAF1Selected").setDisabled(true);
						Ext.getCmp("isAF2Selected").setDisabled(true);
						Ext.getCmp("isAF3Selected").setDisabled(true);
						Ext.getCmp("isAllAFSelected").setDisabled(true);
						
						Ext.getCmp('ciuName').setDisabled(true);
						Ext.getCmp('ciuAlias').setDisabled(true);
						Ext.getCmp('ciuLoopback').setDisabled(true);
						//Ext.getCmp('efService').setDisabled(true);
						if(efService == 'true'){
						//console.log("efrate>.... "+efRate.split("|")[0]);
						//Ext.getCmp("efRate").setValue(efRate.split("|")[0]);
						
						//TODO: check value properly - for Phase 2
						//Ext.getCmp('efRate').setValue(efRate);
						
						}
						
						console.log("efrate1.>...");
						Ext.getCmp("isAF1Selected").setValue(isAF1Selected);
						Ext.getCmp("isAF2Selected").setValue(isAF2Selected);
						Ext.getCmp("isAF3Selected").setValue(isAF3Selected);
						Ext.getCmp("isAllAFSelected").setValue(isAllAFSelected);
						Ext.getCmp("qosType").setValue(qosType);
						Ext.getCmp("af1").setValue(af1);
						Ext.getCmp("af2").setValue(af2);
						Ext.getCmp("af3").setValue(af3);
						Ext.getCmp("efService").setValue(efService);
						Ext.getCmp("accessRate").setValue(accessRate);
						Ext.getCmp("ciuName").setValue(ciuName);
						Ext.getCmp("ciuAlias").setValue(ciuAlias);
						Ext.getCmp("ciuLoopback").setValue(ciuLoopback);
						Ext.getCmp("multiVRF").setValue(true);
						if(Ext.getCmp("qosType").disabled){
							Ext.getCmp('af1').setDisabled(true);
							Ext.getCmp('af2').setDisabled(true);
							Ext.getCmp('af3').setDisabled(true);
						}
					}
          	}else{
			console.log("accessRAte else<< ");
					Ext.getCmp("endPointServiceType").setValue("TML3");
					Ext.getCmp('endPointServiceType').setDisabled(false);
					Ext.getCmp("af1").setValue("");
					Ext.getCmp('af1').setDisabled(false);
					Ext.getCmp("af2").setValue("");
					Ext.getCmp('af2').setDisabled(false);
					Ext.getCmp("af3").setValue("");
					Ext.getCmp('af3').setDisabled(false);
					Ext.getCmp("isAF1Selected").setValue(false);
					Ext.getCmp("isAF2Selected").setValue(false);
					Ext.getCmp("isAF3Selected").setValue(false);
					Ext.getCmp("ciuName").setValue("");
					Ext.getCmp('ciuName').setDisabled(false);
					Ext.getCmp("efRate").setValue("");
					Ext.getCmp("efService").setValue(false);
					Ext.getCmp('efRate').setDisabled(false);
					Ext.getCmp("efService").setValue("");
					Ext.getCmp('efService').setDisabled(false);
					Ext.getCmp("ciuAlias").setValue("");
					Ext.getCmp('ciuAlias').setDisabled(false);
					Ext.getCmp("ciuLoopback").setValue("");
					Ext.getCmp('ciuLoopback').setDisabled(false);
					Ext.getCmp("accessRate").setValue("");
					Ext.getCmp('accessRate').setDisabled(false);
					Ext.getCmp("qosType").setValue("");
					Ext.getCmp('qosType').setDisabled(false);
					Ext.getCmp("isAF1Selected").setDisabled(false);
					Ext.getCmp("isAF2Selected").setDisabled(false);
					Ext.getCmp("isAF3Selected").setDisabled(false);
					Ext.getCmp("isAllAFSelected").setDisabled(false);
					Ext.getCmp("multiVRF").setValue(false);
				}
				}catch(e){
				console.log("error<<<<<<<<<<<<<<<<<< >>>>>> "+e);
					Ext.getCmp("endPointServiceType").setValue("TML3");
					Ext.getCmp('endPointServiceType').setDisabled(false);
					Ext.getCmp("af1").setValue("");
					Ext.getCmp('af1').setDisabled(false);
					Ext.getCmp("af2").setValue("");
					Ext.getCmp('af2').setDisabled(false);
					Ext.getCmp("af3").setValue("");
					Ext.getCmp('af3').setDisabled(false);
					Ext.getCmp("isAF1Selected").setValue(false);
					Ext.getCmp("isAF2Selected").setValue(false);
					Ext.getCmp("isAF3Selected").setValue(false);
					Ext.getCmp("ciuName").setValue("");
					Ext.getCmp('ciuName').setDisabled(false);
					Ext.getCmp("efRate").setValue("");
					Ext.getCmp("efService").setValue(false);
					Ext.getCmp('efRate').setDisabled(false);
					Ext.getCmp("efService").setValue("");
					Ext.getCmp('efService').setDisabled(false);
					Ext.getCmp("ciuAlias").setValue("");
					Ext.getCmp('ciuAlias').setDisabled(false);
					Ext.getCmp("ciuLoopback").setValue("");
					Ext.getCmp('ciuLoopback').setDisabled(false);
					Ext.getCmp("accessRate").setValue("");
					Ext.getCmp('accessRate').setDisabled(false);
					Ext.getCmp("qosType").setValue("");
					Ext.getCmp('qosType').setDisabled(false);
					Ext.getCmp("isAF1Selected").setDisabled(false);
					Ext.getCmp("isAF2Selected").setDisabled(false);
					Ext.getCmp("isAF3Selected").setDisabled(false);
					Ext.getCmp("isAllAFSelected").setDisabled(false);
					Ext.getCmp("multiVRF").setValue(false);
				}
				
			}
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
                
                {valueText: '10g', displayText: '10G'}
            ]
        });

        return portSpeed;
    },
	openPrefixListWindow:function() {//grid, rowIndex, colIndex
	var prefixListWindow = Ext.create('Ext.window.Window', {
			height:220,
			width:360,
			modal:true,
			autoScroll:true,
			name:'prefixListWindow',
			title:'Performance Test Prefixes',
			constrain:true,
			//constrainTo:mainWin.getEl(),
			items:[{
				
					xtype: 'fieldset',
					height: 180,
					width: 350,
					layout: 'column',
					//title: 'IPv4 Prefix List',
					id: 'prefixListFieldSet',
					itemId: 'prefixListFieldSet',
					//hidden: true,
					style: this.FIELDSET_BACKGROUND_COLOR,
				   items: [
						{
						  
									xtype: 'gridpanel',
									height: 170,
									margin: '0 0 0 0',
									id: 'prefixListGrid',
									//layout: 'fit',
									autoScroll: true,
									forceFit: true,
									width: 338,
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
											maxWidth: 310,
											width: 310,
											align: 'center',
											sortable: true,
											dataIndex: 'prefixList',
											text: 'Prefixes/Mask',
											editable: true,
											editor: {
												xtype: 'textfield',
												name:'prefixList',
												id:'prefixList'
										
										}
										}
									],
									
										dockedItems: [{
											xtype: 'toolbar',
											dock: 'bottom',
											style: this.FIELDSET_BACKGROUND_COLOR,
											 layout: {
												type: 'hbox',
												align: 'middle',
												pack: 'center'
											},
											items: [
												{
													xtype: 'button',
													text: '<font color="#FFFFFF">Add</font>',
													width: 60,
													margin: 5,
													//style: this.FIELDSET_BACKGROUND_COLOR,
													style: 'background-color:#476583;color:#FFFFFF',
													handler: function(button, event) {
													console.log("add");
													try{
														//me.handleAddPrefixList();
														var prefixListPanelStore = Ext.getCmp("prefixListGrid").getStore();
	
														prefixListPanelStore.add({
															prefixList: ""
															
														});
														}catch(e){
															console.log("error "+e);
														}
													}
												},  {
													xtype: 'button',
													text: '<font color="#FFFFFF">Delete</font>',
													//style: this.FIELDSET_BACKGROUND_COLOR,
													style: 'background-color:#476583;color:white',
													width: 60,
													handler: function(button, event) {
														var records = Ext.getCmp("prefixListGrid").selModel.getSelection();
														Ext.getCmp("prefixListGrid").getStore().remove(records);
														Ext.getCmp("prefixListGrid").getView().refresh();
													}
								
												},
												
												{
												xtype: 'button',
												text: '<font color="#FFFFFF">Save</font>',
												width: 60,
												margin: 5,
												//style: this.FIELDSET_BACKGROUND_COLOR,
												style: 'background-color:#476583;color:#FFFFFF',
												handler: function(button, event) {
												//var ipv4PrefixListArr = {};
												//ipv4PrefixListArr
												var prefixListGrid = Ext.getCmp("prefixListGrid").getStore();
												var prefixListGrid_RowCount = prefixListGrid.count();
												var mainWin = Ext.ComponentQuery.query('window[name=l3vpnModify]')[0];
												var staticRPGrid = mainWin.getCompByName('gridpanel','prefixListGrid1');
												//staticRPGrid.loadData([],false);
												staticRPGrid.getStore().removeAll();
												try	{		
												//console.log("prefixListGrid_RowCount : "+prefixListGrid_RowCount);												
													for(var i=0; i < prefixListGrid_RowCount; i++) {
													
														if(prefixListGrid.getAt(i).data.prefixList == ''){
																Ext.MessageBox.alert('Validation Error','PrefixList can not be empty');
															return;
														}
														
														staticRPGrid.getStore().add(prefixListGrid.getAt(i).data);
														
													}
													//console.log("777: "+staticRPGrid.getStore().count());
													}
													catch(e){
														console.log("eee> > "+e);
													}
			
													this.up('window').close();
													//me.handleAddPrefixList();
												}
											}
							
											]
										}]
										,
									
									plugins: [
										Ext.create('Ext.grid.plugin.RowEditing', {
											clicksToEdit: 1,
											 autoCancel: true,
											 //autoCancel: false
											//triggerEvent: 'cellclick',
											listeners:{
						'edit' : function( editor, e, eOpts ){
											try{
												var ip = Ext.getCmp("prefixList").getValue();
												console.log("ip >> "+ip);
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
													console.log("eeee> "+e);
														Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Error: valid value is xxx.xxx.xxx.xxx/xx");
													}				
										}					
									}
										})
									
								
							]
							
				}
				 ]
				}
			],
			listeners:{
				'afterrender':function(comp,e){
					//var selRecord = grid.getStore().getAt(rowIndex);
					//var key = selRecord.get('deviceName')+":"+selRecord.get('Interface');
					//var key = selRecord.get('key');
					
					console.log("loading**");
					var mainWin = Ext.ComponentQuery.query('window[name=l3vpnModify]')[0];
					var prefixListGrid = Ext.getCmp("prefixListGrid").getStore();
					console.log("prefixListGrid > > "+prefixListGrid.count());
					prefixListGrid.removeAll();
					console.log("prefixListGrid > > > "+prefixListGrid.count());
					//Ext.ComponentQuery.query('gridpanel[name=prefixListGrid]')[0].store.removeAll();
					//Ext.getCmp("prefixListGrid").store.removeAll();
					var staticRPGrid = mainWin.getCompByName('gridpanel','prefixListGrid1');
					console.log("staticRPGrid.getStore().count() > > > "+staticRPGrid.getStore().count());
					
					for(var i=0; i < staticRPGrid.getStore().count(); i++) {
						prefixListGrid.add(staticRPGrid.getStore().getAt(i).data);
					}
				}
			}
				
			
		});
		return prefixListWindow;
		},
handleAddPrefixList:function() {
console.log("prefixListPanelStore");
	var prefixListPanelStore = Ext.getCmp("prefixListGrid").getStore();
	
	prefixListPanelStore.add({
		prefixList: ""
		
	}); 	
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
	onRowEditingForIPv4Prefix: function(editor, e, eOpts) {
	var ip = Ext.getCmp("prefixList").getValue();
  this.validateIPAddressAndMask(ip);
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
	}
});