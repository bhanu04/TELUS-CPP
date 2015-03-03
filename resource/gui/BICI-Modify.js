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

    height: 750,
	maxHeight: 1800,
    hidden: false,
    width: 960,
    autoScroll: true,
	
	//manageHeight: true,
	//overflowX: 'auto',
	//overflowY: 'auto',
	//bodyStyle: 'Ext.getBody().setStyle("overflow", "auto")',
    title: 'BI/CI Service',
	FIELDSET_BACKGROUND_COLOR:'background-color:#F8F8F8',
	FIELDSET_WHITE_COLOR:'background-color:#FFFFFF',
	site: '', port: '', encapsulation: '',moid: '',
	////isCCI: false,
	MAX_SUBNET_MASK:32,
	MIN_SUBNET_MASK:24,
	l3vpnendpointDetails:null,
	DEFAULT_SUBNET_MASK:30,
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
					 //height: 1000,
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
                                            xtype: 'textfield',
                                            flex: 1,
                                            maxWidth: 255,
                                            width: 255,
											maxHeight: 25,
                                            fieldLabel: '<b>ID</b>',
											labelWidth: 60,
											margin: '5 0 0 0',
											name: 'customerId',
											id: 'customerId',
											disabled: true,
											allowBlank: false,
											listeners: {
											  specialkey: function(f,e){
												if (e.getKey() == e.ENTER) {
												var cust = Ext.getCmp('customerId').getValue();
													//me.searchCustomer(cust);
												}
											  }
											}
                                        },
										{
                                            xtype: 'textfield',
                                            flex: 1,
                                            fieldLabel: '<font color="#808080">Name</font>',
											fieldStyle: 'color:#808080',
											maxHeight: 25,
											maxWidth: 255,
											width: 255,
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
                                            fieldLabel: '<font color="#808080">Email</font>',
											fieldStyle: 'color:#808080',
											labelWidth: 60,
											maxHeight: 25,
											name: 'email',
											id: 'email',
											readOnly: true,
											//disabled: true,
											margin: '5 0 0 0'
                                        },
                                        {
                                            xtype: 'textareafield',
                                            flex: 1,
                                            height: 55,
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
                                            fieldLabel: '<b>Service ID</b>',
											name: 'serviceId',
											id: 'serviceId',
											allowBlank: false,
											margin: '0 100 0 0',
											labelWidth: 100,
                                            maxValue: 3097000,
                                            minValue: 3086023,
											height: 23,
											hideTrigger: true,
											keyNavEnabled: false,
											mouseWheelEnabled: false
                                        },
										{
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
										 },
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            fieldLabel: '<b>Service Name</b>',
											//value: 'VPRN',
											labelWidth: 100,
											maxHeight: 23,
											height: 23,
											allowBlank: false,
											margin: '5 40 0 0',
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
											value: 'Pending',
											store: this.getOperatioanlMode(),
											margin: '5 0 0 0',
											queryMode: 'local',
											editable: true,
											displayField: 'displayText',
											valueField: 'valueText'
										},
										{
											xtype: 'checkboxfield',
											fieldLabel: 'Accounting',
											boxLabel: '',
											name: 'accounting',
											margin: '8 300 0 0',
											id: 'accounting',
											labelWidth: 60,
										}
                                    ]
                                }
							]
                        },
                        {
                            xtype: 'fieldset',
                            height: 250,
                            maxHeight: 250,
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
                                    height: 250,
                                    maxHeight: 300,
                                    maxWidth: 260,
                                    width: 260,
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
													fieldLabel: '<font color="#808080">Software Version</font>',
													fieldStyle: 'color:#808080',
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
													fieldLabel: '<font color="#808080">Node Type</font>',
													fieldStyle: 'color:#808080',
													margin: '5 0 0 0',
													//maxHeight: 25,
													//maxWidth: 255,
													//width: 255,
													name: 'nodeType',
													id: 'nodeType',
													labelWidth: 100,
													readOnly: true,
													//disabled: true,
													allowBlank: true,
													minLength:1//,
													//margin: '5 0 0 0'
												}
												
                                            ]
									    }
									]
                                },
								{
                                    xtype: 'fieldset',
                                    flex: 1,
                                    margins: '0 5 0 0',
                                    height: 250,
                                    maxHeight: 300,
                                    maxWidth: 260,
                                    width: 260,
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
													//margin: '10 0 0 0',
													width: 230,
													labelWidth: 110,
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
													//margin: '10 0 0 0',
													width: 230,
													labelWidth: 110,
													fieldLabel: '<b>Access Type</b>',
													emptyText:'Pick an Option',
													name: 'accessType',
													id: 'accessType',
													//store: ['HS', 'DSL'] 
													value: 'HS',
													store: ['HS'] 
												},
												{
													xtype: 'combobox',
													//margin: '10 1 0 0',
													width: 230,
													labelWidth: 110,
													fieldLabel: '<b>Path Preference</b>',
													emptyText:'Pick an Option',
													//labelAlign: 'right',
													name: 'pathPreferences',
													id: 'pathPreferences',
													maxLength:15,
													value: 'Primary',
													store: ['Primary', 'Secondary'],
													listeners: {
																 change: function(field, newValue, oldValue) {
																 console.log("connection type********: "+newValue);
																 
																 var pathPreference = Ext.getCmp("pathPreferences");
																 var endPointServiceType = Ext.getCmp("endPointServiceType").getValue();
																 
																 
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
												},
												{
													xtype: 'combobox',
													//margin: '5 10 0 0',
													width: 160,
													labelWidth: 110,
													//labelAlign: 'right',
													emptyText:'Pick an Option',
													fieldLabel: '<b>Service Type</b>',
													name: 'endPointServiceType',
													id: 'endPointServiceType',
													value: 'BI',
													store: ['BI','CI'],
													listeners: {
																render: function (field) {
																console.log("render");
																	Ext.getCmp('endPointServiceType').setValue("BI");
																},
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
													emptyText: 'Pick an Option',
													width: 230,
													maxWidth: 230,
													labelWidth: 110,
													
													labelAlign: 'left',
													fieldLabel: '<b>Routing Protocol</b>',
													name: 'routingProtocol',
													id: 'routingProtocol',
													//store: this.getRoutingProtocol(),
													value: 'Static',
													store: [['Static','Static'],['Default','BGP-Default Route'], ['Full','BGP-Full Internet']],
													listeners: {
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
																  //Ext.getCmp("optionPanelGrid").reconfigure(me.getStaticRoutingOptions());
																 }else{
																	 bgpOptionPanel.show();
																	 staticOptionPanel.hide();
																	 Ext.getCmp("bgpOptionPanel").setDisabled(false);
																	 Ext.getCmp("staticOptionPanel").setDisabled(true);
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
														width: 230,
														maxWidth: 230,
														labelWidth: 110,
														//labelAlign: 'right',
														fieldLabel: '<b>Prefix Supplier</b>',
														name: 'addressPool',
														id: 'addressPool',
														value: 'Customer',
														store: ['Customer', 'TELUS']
																
													},
													{
                                                    xtype: 'combobox',
                                                    fieldLabel: 'Admin State',
                                                    boxLabel: '',
													name: 'adminState',
													id: 'adminState',
													value: 'Down',
													width: 180,
													labelWidth: 110,
													//margin: '10 0 0 0',
													store: [['Up','Up'],['Down','Down']],
													},
													{
														xtype: 'checkboxfield',
														fieldLabel: 'Auto Negotiate',
														boxLabel: '',
														name: 'autonegotiate',
														id: 'autonegotiate',
														labelWidth: 110,
													}
                                            ]
											
                                        }
										 
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    margins: '0 5 0 0',
                                    height: 250,
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
                                                            maxWidth: 80,
                                                            sortable: true,
                                                            dataIndex: 'status',
                                                            text: 'Op Status'
                                                        },
														/*{
                                                            xtype: 'gridcolumn',
                                                            maxWidth: 80,
                                                            sortable: true,
                                                            dataIndex: 'mtu',
                                                            text: 'MTU'
                                                        },*/
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 60,
                                                            sortable: true,
                                                            dataIndex: 'speed',
                                                            text: 'Speed'
                                                        }
                                                    ],
													listeners: {
															itemclick: function(dv, record, item, index, e) {
															console.log("item****************  "+item.cells[0]);
															    var routingProtocol = Ext.getCmp("routingProtocol").getValue();
																me.getSelectedSite(record);
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
                                                }
                                            ]
                                        }
                                    ]
                                },
								
								

								
                            ]
                        },
						{
                            xtype: 'panel',
                            dock: 'top',
                            height: 510,
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
									height: 510,
									width: 900,
                                    flex: 1,
                                    items: [
									{
                                    xtype: 'panel',
									animCollapse: true,
									collapsed: false,
									collapsible: true,
									//layout: 'column',
									layout: {
										type: 'table',
										columns: 7
									},
                                    height: 100,
                                    title: 'Access Options',
									id: 'accessOptionGrid',
                                    itemId: 'accessOptionGrid',
									//hidden: true,
									style: this.FIELDSET_BACKGROUND_COLOR,
                                    items: [
										
										{
                                            xtype: 'numberfield',
                                            margin: '5 10 0 10',
                                            width: 90,
											labelWidth: 30,
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
                                             margin: '5 5 0 0',
                                            width: 105,
											labelWidth: 40,
                                            fieldLabel: '<b>VLAN</b>',
											name: 'vlanId',
											id: 'vlanId',
											hideTrigger: true,
											keyNavEnabled: false,
											mouseWheelEnabled: false,
                                            labelAlign: 'left',
											value: '1500',
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
                                            name: 'ipAddress',
											id: 'ipAddress',
											labelAlign: 'left',
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
                                            width: 142,
											margin: '5 0 0 0',
                                            fieldLabel: 'IP MTU',
                                            labelWidth: 43,
											colspan:1,
											labelAlign: 'left',
											name: 'ipMTU',
											id: 'ipMTU',
											store: ['1500', '3000'] 
                                        },
										 
										{
											xtype: 'checkboxfield',
											fieldLabel: 'IPv6 Peer',
											margin: '10 0 0 10',
											labelWidth: 60,
											width: 90,
											labelAlign: 'right',
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
											id: 'index'				
										}
										]
                                },
								
								{
                                    xtype: 'panel',
									animCollapse: true,
									collapsed: false,
									collapsible: true,
									//layout: 'column',
                                    
                                    title: 'BGP Options',
									id: 'bgpOptionPanel',
                                    itemId: 'bgpOptionPanel',
									//hidden: true,
									style: this.FIELDSET_BACKGROUND_COLOR,
                                    items: [
								{
                                    xtype: 'container',
									id: 'ipv4PrefixOptioncontainer',
									width: 900,
                                    //height: 290,
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                {
                                    xtype: 'fieldset',
									//animCollapse: true,
									//collapsed: false,
									//collapsible: true,
                                    height: 180,
                                    width: 400,
                                    layout: 'column',
                                    title: 'BGP Options',
									id: 'bgpOptionGrid',
                                    itemId: 'bgpOptionGrid',
									//hidden: true,
									style: this.FIELDSET_BACKGROUND_COLOR,
                                    items: [
										{
                                            xtype: 'numberfield',
                                             margin: '0 20 0 5',
                                            width: 130,
                                            fieldLabel: '<b>Peer AS</b>',
                                            labelAlign: 'left',
                                            labelWidth: 65,
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
                                            margin: '0 0 0 0',
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
                                            margin: '10 20 0 5',
                                            width: 130,
                                            fieldLabel: '<b>MED</b>',
                                            labelAlign: 'left',
                                            labelWidth: 65,
											value: '80',
											name: 'med',
											id: 'med',
											hideTrigger: true,
											keyNavEnabled: false,
											mouseWheelEnabled: false
                                        },
										{
                                            xtype: 'textfield',
                                            margin: '10 0 0 5',
                                            width: 210,
											maxWidth: 210,
                                            fieldLabel: '<b>IPv4 Neighbour</b>',
											labelWidth: 100,
                                            name: 'neighbourAddress',
											id: 'neighbourAddress',
											allowBlank: false,
											vtype:'IPAddress'
                                        }
                                        
                                    ]
                                },
								{
                                    xtype: 'fieldset',
									height: 180,
                                    width: 250,
                                    layout: 'column',
                                    title: 'IPv4 PrefixList',
									id: 'prefixListGrid',
                                    itemId: 'prefixListGrid',
									//hidden: true,
									style: this.FIELDSET_BACKGROUND_COLOR,
                                   items: [
                                        {
                                          
                                                    xtype: 'gridpanel',
                                                    height: 180,
													margin: '0 0 0 0',
                                                    id: 'prefixListPanel',
                                                    layout: 'fit',
                                                    width: 250,
                                                    title: '',
													columnLines: true,
													hideHeaders: false,
                                                    forceFit: true,
                                                    store: this.getPrefixListStore(),
													style: this.FIELDSET_BACKGROUND_COLOR,
													
													columns: [
														{
															xtype: 'gridcolumn',
															maxWidth: 250,
															align: 'center',
															sortable: true,
															dataIndex: 'prefixList',
															text: 'Prefix',
															editable: true,
															renderTo: Ext.getBody(),
															//align: 'left',

															//hidden: false,
															editor: {
                                                                xtype: 'textfield',
																name:'prefixList',
																validator: function(ip){
																console.log("ip>>> >: >> : "+ip);
																var subnetMask = ip.substring(ip.lastIndexOf('/')+1,ip.length);
																console.log("subnetMask > "+subnetMask);
																	if(ip !='' && ip != null && ip.split(".").length == 4 && (parseInt(ip.split(".")[0]) > 0 && parseInt(ip.split(".")[0]) < 256 && parseInt(ip.split(".")[1]) >= 0 && parseInt(ip.split(".")[1]) < 256 && parseInt(ip.split(".")[2]) >= 0 && parseInt(ip.split(".")[2]) < 256 && parseInt(ip.split(".")[3]) >= 0 && parseInt(ip.split(".")[3]) < 256) && ip.contains('/') && parseInt(subnetMask) > 0 && parseInt(subnetMask) < 33){
																		return  true;
																	} else {
																		return 'Error! valid value is xxx.xxx.xxx.xxx/xx';
																	}
																}
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
															 autoCancel: true
															 //autoCancel: false
															//triggerEvent: 'cellclick',
                                                           /* listeners: {
                                                                edit: {
                                                                 fn: me.onRowEditingEdit,
																	scope: me
                                                                }
                                                            }*/
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
                                    width: 300,
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
                                                    layout: 'fit',
                                                    width: 300,
                                                    title: '',
													columnLines: true,
													hideHeaders: false,
                                                    forceFit: true,
                                                    store: this.getIPv6PrefixListStore(),
													style: this.FIELDSET_BACKGROUND_COLOR,
													
													columns: [
														{
															xtype: 'gridcolumn',
															maxWidth: 130,
															align: 'center',
															sortable: true,
															dataIndex: 'prefixList',
															text: 'IPv4',
															editable: true,
															renderTo: Ext.getBody(),

															//hidden: false,
															editor: {
                                                                xtype: 'textfield',
																name:'prefixList',
																validator: function(ip){
																console.log("ip>>> >: >> : "+ip);
																var subnetMask = ip.substring(ip.lastIndexOf('/')+1,ip.length);
																console.log("subnetMask > "+subnetMask);
																	if(ip !='' && ip != null && ip.split(".").length == 4 && (parseInt(ip.split(".")[0]) > 0 && parseInt(ip.split(".")[0]) < 256 && parseInt(ip.split(".")[1]) >= 0 && parseInt(ip.split(".")[1]) < 256 && parseInt(ip.split(".")[2]) >= 0 && parseInt(ip.split(".")[2]) < 256 && parseInt(ip.split(".")[3]) >= 0 && parseInt(ip.split(".")[3]) < 256) && ip.contains('/') && parseInt(subnetMask) > 0 && parseInt(subnetMask) < 33){
																		return  true;
																	} else {
																		return 'Error! valid value is xxx.xxx.xxx.xxx/xx';
																	}
																}
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
															renderTo: Ext.getBody(),

															//hidden: false,
															editor: {
                                                                xtype: 'textfield',
																name:'ipv6PrefixList'
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
																	me.handleAddIPv6PrefixListBGPRouting();
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
															 autoCancel: true
															 //autoCancel: false
															//triggerEvent: 'cellclick',
                                                           /* listeners: {
                                                                edit: {
                                                                 fn: me.onRowEditingEdit,
																	scope: me
                                                                }
                                                            }*/
                                                        })
                                                    ]
                                                }
                                            ]
                                
                                }
								]}]},
								 
								 
								 {
								xtype: 'panel',
								//height: 200,
								//width: 900,
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
									//hidden: true,
                                   // height: 290,
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
                                    width: 400,
                                    layout: 'column',
                                    title: 'IPv4 Routing Options',
									id: 'staticOptionGrid',
                                    itemId: 'staticOptionGrid',
									//hidden: true,
									style: this.FIELDSET_BACKGROUND_COLOR,
                                   items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    height: 180,
                                                    id: 'staticRoutingOption',
                                                    layout: 'fit',
                                                    width: 400,
                                                    title: '',
													columnLines: true,
													hideHeaders: false,
                                                    forceFit: true,
                                                    store: this.getStaticGridStore(),
													style: this.FIELDSET_BACKGROUND_COLOR,
													columns: [
														{
															xtype: 'gridcolumn',
															maxWidth: 300,
															align: 'center',
															sortable: true,
															dataIndex: 'destinationPrefix',
															text: 'Destination Prefix',
															editable: true,
															renderTo: Ext.getBody(),

															//hidden: false,
															editor: {
                                                                xtype: 'textfield',
																name:'destPrefixVal',
																validator: function(ip){
																console.log("ip>>> >: >> : "+ip);
																var subnetMask = ip.substring(ip.lastIndexOf('/')+1,ip.length);
																console.log("subnetMask > "+subnetMask);
																
																	if(ip !='' && ip != null && ip.split(".").length == 4 && (parseInt(ip.split(".")[0]) > 0 && parseInt(ip.split(".")[0]) < 256 && parseInt(ip.split(".")[1]) >= 0 && parseInt(ip.split(".")[1]) < 256 && parseInt(ip.split(".")[2]) >= 0 && parseInt(ip.split(".")[2]) < 256 && parseInt(ip.split(".")[3]) >= 0 && parseInt(ip.split(".")[3]) < 256) && ip.contains('/') && parseInt(subnetMask) > 0 && parseInt(subnetMask) < 33){
																		return  true;
																	} else {
																		return 'Error! valid value is xxx.xxx.xxx.xxx/xx';
																	}
																}
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
																name:'nextHopVal',
																vtype:'IPAddress'
																}
														}
													],
													dockedItems: [{
															xtype: 'toolbar',
															dock: 'top',
															 layout: {
																type: 'hbox',
																align: 'middle',
																pack: 'center'
															},
															items: [{
																xtype: 'button',
																text: 'Add',
																//style: this.FIELDSET_BACKGROUND_COLOR,
																style: 'background-color:#476583',
																width: 100,
																margin: 5,
																handler: function(button, event) {
																	me.handleAddStaticRouting();
																}
															},  {
																xtype: 'button',
																text: 'Delete',
																//style: this.FIELDSET_BACKGROUND_COLOR,
																style: 'background-color:#476583',
																width: 120,
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
															 //autoCancel: false
															//triggerEvent: 'cellclick',
                                                           /* listeners: {
                                                                edit: {
                                                                 fn: me.onRowEditingEdit,
																	scope: me
                                                                }
                                                            }*/
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
                                            xtype: 'fieldcontainer',
                                            layout: 'fit',
											minHeight: 90,
											/*tabConfig: {
                                                xtype: 'tab',
                                                width: 70
                                            },*/
											style: this.FIELDSET_BACKGROUND_COLOR,
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    height: 180,
                                                    id: 'staticRoutingOptionForIPv6',
                                                    layout: 'fit',
                                                    width: 400,
                                                    title: '',
													columnLines: true,
													hideHeaders: false,
                                                    forceFit: true,
                                                    store: this.getStaticGridStore(),
													style: this.FIELDSET_BACKGROUND_COLOR,
													columns: [
														{
															xtype: 'gridcolumn',
															maxWidth: 300,
															align: 'center',
															sortable: true,
															dataIndex: 'destinationPrefix',
															text: 'Destination Prefix',
															editable: true,
															renderTo: Ext.getBody(),

															//hidden: false,
															editor: {
                                                                xtype: 'textfield',
																name:'destPrefixVal',
																validator: function(ip){
																console.log("ip>>> >: >> : "+ip);
																var subnetMask = ip.substring(ip.lastIndexOf('/')+1,ip.length);
																console.log("subnetMask > "+subnetMask);
																
																	if(ip !='' && ip != null && ip.split(".").length == 4 && (parseInt(ip.split(".")[0]) > 0 && parseInt(ip.split(".")[0]) < 256 && parseInt(ip.split(".")[1]) >= 0 && parseInt(ip.split(".")[1]) < 256 && parseInt(ip.split(".")[2]) >= 0 && parseInt(ip.split(".")[2]) < 256 && parseInt(ip.split(".")[3]) >= 0 && parseInt(ip.split(".")[3]) < 256) && ip.contains('/') && parseInt(subnetMask) > 0 && parseInt(subnetMask) < 33){
																		return  true;
																	} else {
																		return 'Error! valid value is xxx.xxx.xxx.xxx/xx';
																	}
																}
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
																name:'nextHopVal',
																vtype:'IPAddress'
																}
														}
													],
													dockedItems: [{
															xtype: 'toolbar',
															dock: 'top',
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
																	me.handleAddStaticRoutingForIPv6();
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
															 //autoCancel: false
															//triggerEvent: 'cellclick',
                                                           /* listeners: {
                                                                edit: {
                                                                 fn: me.onRowEditingEdit,
																	scope: me
                                                                }
                                                            }*/
                                                        })
                                                    ]
                                                }
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
                                            margin: '5 10 0 10',
                                            width: 250,
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
                                            margin: '5 0 0 0',
                                            width: 250,
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
											xtype: 'numberfield',
                                            flex: 1,
                                            fieldLabel: 'Ingress Override Rate (kbps)',
											name: 'ingressRate',
											id: 'ingressRate',
											allowBlank: true,
											margin: '10 10 0 10',
											labelWidth: 170,
                                            maxValue: 10000000,
                                            minValue: 1,
											//height: 23,
											hideTrigger: true,
											keyNavEnabled: false,
											mouseWheelEnabled: false
											},
										
											{
											xtype: 'numberfield',
                                            flex: 1,
                                            fieldLabel: '<b>Egress Override Rate (kbps)</b>',
											name: 'egressRate',
											id: 'egressRate',
											margin: '10 0 0 0',
											allowBlank: false,
											labelWidth: 165,
                                            maxValue: 10000000,
                                            minValue: 1,
											//height: 23,
											hideTrigger: true,
											keyNavEnabled: false,
											mouseWheelEnabled: false
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
                                    text: 'Delete',
									name: 'deleteBtn',
									id: 'deleteBtn',
									hidden: true,
									width: 100,
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
                                                            dataIndex: 'recordOPType'//,
                                                            //hidden: true
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
															dataIndex: 'ipv6PrefixList'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'oldStaticRoutes'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'oldStaticRoutesForIPv6'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'oldPrefixList'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'oldIPv6PrefixList'
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
														}
													],
													listeners: {
															itemdblclick: function(dv, record, item, index, e) {
															if(record.get('recordOPType') != 'DELETE'){
																Ext.getCmp("isDeployedUpdated").setValue("false");
																var endpointPanel = Ext.ComponentQuery.query('#endpointPanel')[0];
																endpointPanel.show();
																//this.isCCI=true;
																var updateBtn = Ext.getCmp('updateBtn');
																updateBtn.show();//// uncommnet this line later during modify implementation
																//Ext.getCmp('deleteBtn').show();
																
																var interfacegrid = Ext.ComponentQuery.query('gridpanel[name=siteInterfaceGrid]')[0];
																interfacegrid.setDisabled(true);
																var stageBtn = Ext.getCmp('stageBtn');
																
																
																var clearInactiveEntriesFromListButton = Ext.getCmp('clearInactiveEntriesFromListButton');
																clearInactiveEntriesFromListButton.hide();
																var endPointServiceType =Ext.getCmp("endPointServiceType").setValue(record.get('endPointServiceType'));
																var autonegotiate =Ext.getCmp("autonegotiate").setValue(record.get('autonegotiate'));	
																var adminState =Ext.getCmp("adminState").setValue(record.get('adminState'));
															
																var ciuName =Ext.getCmp("ciuName").setValue(record.get('ciuName'));
																var ciuAlias =Ext.getCmp("ciuAlias").setValue(record.get('ciuAlias'));
																var accessType =Ext.getCmp("accessType").setValue(record.get('accessType'));
																var connectionType =Ext.getCmp("connectionType").setValue(record.get('connectionType'));
																var csId =Ext.getCmp("csId").setValue(record.get('csId'));
																var pathPreferences =Ext.getCmp("pathPreferences").setValue(record.get('pathPreferences'));
																var vlanId =Ext.getCmp("vlanId").setValue(record.get('vlanId'));
																Ext.getCmp("oldVlanId").setValue(record.get('vlanId'));
															    console.log(">>> oldVlanId >> "+Ext.getCmp("oldVlanId").getValue());
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
																var addressPool =Ext.getCmp("addressPool").setValue(record.get('addressPool'));
																var ingressRate =Ext.getCmp("ingressRate").setValue(record.get('ingressRate'));
																var egressRate =Ext.getCmp("egressRate").setValue(record.get('egressRate'));
																
																Ext.getCmp("prefixListPanel").getStore().removeAll();
															    Ext.getCmp("ipv6PrefixListPanel").getStore().removeAll();
															
																if(record.get('routingProtocol') != 'Static'){
															console.log("1");
															if(Ext.getCmp("ipv6Peer").getValue() ==false && (record.get('prefixList').length == undefined || record.get('ipv6PrefixList').length == 'undefined')){ //this block will trigger for when pull the failed order for ipv4.
															console.log("2");
															console.log("pref list : "+record.get('prefixList').prefixList);
																Ext.getCmp("prefixListPanel").getStore().add({
																			prefixList: record.get('prefixList').prefixList
																		
																		}); 
															}else if(Ext.getCmp("ipv6Peer").getValue() ==false ){ //this block will trigger for the new end point for ipv4 only
															
															console.log("3");
															
															for (var i=0; i< record.get('prefixList').length; i++) {
																	console.log("prefixList "+ record.get('prefixList')[i].prefixList);
																		Ext.getCmp("prefixListPanel").getStore().add({
																			prefixList: record.get('prefixList')[i].prefixList
																		
																		}); 
																	}
															}
															else if(record.get("ipv6Peer").getValue() ==true){ //this block will execute for ipv4 and ipv6
															console.log("4");
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
															console.log("staticroutes length: "+record.get('staticRoutes').length);
															console.log("destinationPrefix "+ record.get('staticRoutes').destinationPrefix);
															if(record.get('staticRoutes').length == undefined ){ //this block will trigger for when pull the failed order for ipv4.
																	console.log("pref list : "+record.get('staticRoutes').prefixList);
																		Ext.getCmp("staticRoutingOption").getStore().add({
																			destinationPrefix: record.get('staticRoutes').destinationPrefix,
																			nextHop: record.get('staticRoutes').nextHop
																				
																				}); 
																	}
																	else if(record.get('staticRoutes').length != undefined){ //this block will trigger for the new end point for ipv4 only
																	console.log("test>> : "+record.get('staticRoutes'));
																	for (var i=0; i< record.get('staticRoutes').length; i++) {
																			console.log("staticRoutes "+ record.get('staticRoutes')[i].nextHop);
																				Ext.getCmp("staticRoutingOption").getStore().add({
																					destinationPrefix: record.get('staticRoutes')[i].destinationPrefix,
																					nextHop: record.get('staticRoutes')[i].nextHop
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
                        },{
                            xtype: 'fieldset',
                            height: 155,
                            width: 900,
                            title: 'Deployed Interface Details',
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
                                                    id: 'deployedInterfacesGrid',
													name: 'deployedInterfacesGrid',
                                                    //maxHeight: 180,
													layout: 'fit',
                                                    maxWidth: 875,
                                                    width: 875,
                                                    title: '',
													columnLines: true,
													hideHeaders: false,
                                                    forceFit: true,
                                                    store: this.provisionedInterfacesGridStore(),
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
															dataIndex: 'ipv6PrefixList'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'oldStaticRoutes'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'oldStaticRoutesForIPv6'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'oldPrefixList'
														},
														{
															xtype: 'gridcolumn',
															sortable: true,
															hidden: true,
															style: this.FIELDSET_WHITE_COLOR,
															dataIndex: 'oldIPv6PrefixList'
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
														}
													],
													listeners: {
															itemdblclick: function(dv, record, item, index, e) {
															Ext.getCmp("isDeployedUpdated").setValue("true");
															var endpointPanel = Ext.ComponentQuery.query('#endpointPanel')[0];
															endpointPanel.show();
															////this.isCCI=true;
															var updateBtn = Ext.getCmp('updateBtn');
															updateBtn.show(); ////uncommnet this line later during modify implementation
															Ext.getCmp('deleteBtn').show();
															
															var interfacegrid = Ext.ComponentQuery.query('gridpanel[name=siteInterfaceGrid]')[0];
															interfacegrid.setDisabled(true);
															var stageBtn = Ext.getCmp('stageBtn');
															
															console.log("1");
															
															var clearInactiveEntriesFromListButton = Ext.getCmp('clearInactiveEntriesFromListButton');
															clearInactiveEntriesFromListButton.hide();
															var endPointServiceType =Ext.getCmp("endPointServiceType").setValue(record.get('endPointServiceType'));
															var autonegotiate =Ext.getCmp("autonegotiate").setValue(record.get('autonegotiate'));	
															var adminState =Ext.getCmp("adminState").setValue(record.get('adminState'));
															
															var ciuName =Ext.getCmp("ciuName").setValue(record.get('ciuName'));
															console.log("4");
															var ciuAlias =Ext.getCmp("ciuAlias").setValue(record.get('ciuAlias'));
															console.log("5");
															var accessType =Ext.getCmp("accessType").setValue(record.get('accessType'));
															var connectionType =Ext.getCmp("connectionType").setValue(record.get('connectionType'));
															var csId =Ext.getCmp("csId").setValue(record.get('csId'));
															var pathPreferences =Ext.getCmp("pathPreferences").setValue(record.get('pathPreferences'));
															console.log("6");
															var vlanId =Ext.getCmp("vlanId").setValue(record.get('vlanId'));
															Ext.getCmp("oldVlanId").setValue(record.get('vlanId'));
															console.log(">>> oldVlanId >> "+Ext.getCmp("oldVlanId").getValue());
															console.log("7");
															var ipAddress =Ext.getCmp("ipAddress").setValue(record.get('ipAddress'));
															var subnetMask =Ext.getCmp("subnetMask").setValue(record.get('subnetMask'));
															
															console.log("8");
															var ipMTU =Ext.getCmp("ipMTU").setValue(record.get('ipMTU'));
															console.log("9");
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
															console.log("routing protocol: "+record.get('routingProtocol'));
															routingProtocol.setDisabled(true);
															
															var addressPool =Ext.getCmp("addressPool").setValue(record.get('addressPool'));
															var ingressRate =Ext.getCmp("ingressRate").setValue(record.get('ingressRate'));
															var egressRate =Ext.getCmp("egressRate").setValue(record.get('egressRate'));
															
															Ext.getCmp("prefixListPanel").getStore().removeAll();
															    Ext.getCmp("ipv6PrefixListPanel").getStore().removeAll();
																
															if(record.get('routingProtocol') != 'Static'){
																	
																	if(Ext.getCmp("ipv6Peer").getValue() ==false && (record.get('prefixList').length == undefined || record.get('ipv6PrefixList').length == 'undefined')){ //this block will trigger for when pull the failed order for ipv4.
																	console.log("pref list : "+record.get('prefixList').prefixList);
																		Ext.getCmp("prefixListPanel").getStore().add({
																					prefixList: record.get('prefixList').prefixList
																				
																				}); 
																	}else if(Ext.getCmp("ipv6Peer").getValue() =='false' || Ext.getCmp("ipv6Peer").getValue() ==false){ //this block will trigger for the new end point for ipv4 only
																	console.log("test>> : "+record.get('prefixList'));
																	for (var i=0; i< record.get('prefixList').length; i++) {
																			console.log("prefixList "+ record.get('prefixList')[i].prefixList);
																				Ext.getCmp("prefixListPanel").getStore().add({
																					prefixList: record.get('prefixList')[i].prefixList
																				
																				}); 
																			}
																	}
																	else if(Ext.getCmp("ipv6Peer").getValue() ==true){ //this block will execute for ipv4 and ipv6
																	console.log("ipv6PrefixList :: >> "+ record.get('ipv6PrefixList').prefixList);
																	Ext.getCmp("ipv6PrefixListPanel").getStore().removeAll();
																			
																		if(record.get('ipv6PrefixList') != undefined && record.get('ipv6PrefixList').length > 0){
																		console.log("ipv6PrefixList :: >> "+ record.get('ipv6PrefixList')[0].prefixList);
																			Ext.getCmp("ipv6PrefixListPanel").getStore().removeAll();
																				
																				for (var i=0; i< record.get('ipv6PrefixList').length; i++) {
																			console.log("prefixList "+ record.get('ipv6PrefixList')[i].prefixList);
																				Ext.getCmp("ipv6PrefixListPanel").getStore().add({
																					prefixList: record.get('ipv6PrefixList')[i].prefixList,
																					ipv6PrefixList: record.get('ipv6PrefixList')[i].ipv6PrefixList
																				
																				}); 
																			}
																			}else{
																				
																				
																			console.log("prefixList "+ record.get('ipv6PrefixList').prefixList);
																			if(record.get('ipv6PrefixList').prefixList != undefined){
																				Ext.getCmp("ipv6PrefixListPanel").getStore().add({
																					prefixList: record.get('ipv6PrefixList').prefixList,
																					ipv6PrefixList: record.get('ipv6PrefixList').ipv6PrefixList
																				
																				}); 
																				}
																			
																		}
																		}
																	}
																	
															if(record.get('routingProtocol') == 'Static'){
															console.log("staticroutes length: "+record.get('staticRoutes').length);
															
															if(record.get('staticRoutes').length == undefined ){ //this block will trigger for when pull the failed order for ipv4.
																	console.log("pref list : "+record.get('staticRoutes').prefixList);
																		Ext.getCmp("staticRoutingOption").getStore().add({
																			destinationPrefix: record.get('staticRoutes').destinationPrefix,
																			nextHop: record.get('staticRoutes').nextHop
																				
																				}); 
																	}
																	else if(record.get('staticRoutes').length != undefined){ //this block will trigger for the new end point for ipv4 only
																	console.log("test>> : "+record.get('staticRoutes'));
																	for (var i=0; i< record.get('staticRoutes').length; i++) {
																			console.log("staticRoutes "+ record.get('staticRoutes')[i].nextHop);
																				Ext.getCmp("staticRoutingOption").getStore().add({
																					destinationPrefix: record.get('staticRoutes')[i].destinationPrefix,
																					nextHop: record.get('staticRoutes')[i].nextHop
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
																
																
															//}
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
    
    setFieldVisible:function(comp,show){
        this.scriptUtils.getFieldByName(comp).setVisible(show);
    },
    
    setFieldDisabled:function(comp,flag){
        this.scriptUtils.getFieldByName(comp).setDisabled(flag);
    },
    
    setFieldReadOnly:function(comp,flag){
        this.scriptUtils.getFieldByName(comp).setReadOnly(flag);
    },
	
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
				{name: 'connectionType'},
				{name: 'csId'},
				{name: 'pathPreferences'},
                {name: 'vlanId'},
				{name: 'oldVlanId'},
                {name: 'ipAddress'},
				{name: 'subnetMask'},
				{name: 'ipMTU'},
				{name: 'ipv6Peer'},
				{name: 'ipv6Address'},
				{name: 'recordOPType'},
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
				{name: 'staticRoutesForIPv6'},
				{name: 'prefixList'},
				{name: 'ipv6PrefixList'},
				{name: 'oldStaticRoutes'},
				{name: 'oldStaticRoutesForIPv6'},
				{name: 'oldPrefixList'},
				{name: 'oldIPv6PrefixList'},
				{name: 'autonegotiate'},
				{name: 'adminState'}
				
				 
            ], groupField: 'site', 
            data: [
              		
            ]
        });
    
        return stagedInterfacesStore;
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
	getStaticGridStore: function() {
        var staticGridStore = Ext.create('Ext.data.Store',{
            storeId: 'staticGridStore',
            fields: [
                {name: 'destinationPrefix'},
                {name: 'nextHop'}               
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
					//Ext.getCmp("customerName").setDisabled(false);
					//Ext.getCmp("email").setDisabled(false);
					//Ext.getCmp("customerDescription").setDisabled(false);
					
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
		provisionedInterfacesGridStore:function() {
		var piGridStore = Ext.create('Ext.data.Store', {
			fields:['moid','site','port','endPointServiceType','ciuName','ciuAlias','accessType','connectionType','csId','pathPreferences','vlanId','csId','ipAddress','subnetMask','ipMTU','ipv6Peer','ipv6Address','neighbourAddress', 'localPref','med','peerAS','enforceRoute','maxRoute','multipath','accessRate','senderSite','endPointType','autonegotiate','adminState','seId','endPointsData','staticRoutes','staticRoutesForIPv6','prefixList','ipv6PrefixList','oldStaticRoutes','oldStaticRoutesForIPv6','oldPrefixList','oldIPv6PrefixList'],
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
			
			var advanced, mvpn;
			
			for (var i=0; i<records.length; i++) {
				var rec = store.getAt(i);
				console.log("tec: "+rec);
				console.log("seId: "+rec.get("seId"));
				
				var endPointsData = Ext.decode(rec.get('endPointsData'));
				var endPointRecord = endPointsData[0];
				console.log("csID*****: "+endPointRecord.csId);
				console.log("port: "+endPointRecord.Interface);
				console.log("site: "+endPointRecord.site);
				console.log("seId: "+rec.get("seId"));
				//rec.set('recordOPType','MODIFY');
				rec.set('Interface',endPointRecord.Interface);
				rec.set('pedeviceId',endPointRecord.pedeviceId);
				rec.set('site',endPointRecord.site);
				rec.set('vlanId',endPointRecord.vlanId);
				rec.set('oldVlanId',endPointRecord.vlanId);
				
				rec.set('endPointServiceType',endPointRecord.endPointServiceType);
				rec.set('routingProtocol',endPointRecord.routingProtocol);
				if(endPointRecord.routingProtocol == 'Static'){
					Ext.getCmp("bgpOptionPanel").setDisabled(true);
					Ext.getCmp("bgpOptionPanel").hide();
					Ext.getCmp("staticOptionPanel").show();
					Ext.getCmp("staticOptionPanel").setDisabled(false);
				}else{
					Ext.getCmp("bgpOptionPanel").setDisabled(false);
					Ext.getCmp("staticOptionPanel").setDisabled(true);
					Ext.getCmp("bgpOptionPanel").show();
					Ext.getCmp("staticOptionPanel").hide();
				}
				var ipv6Peer =endPointRecord.ipv6Peer;
				
				var ipv4StaticPrefixListArr = [];
				var ipv6StaticPrefixListArr = [];
				
				if(endPointRecord.routingProtocol == 'Static' && endPointRecord.staticRoutes != undefined ){//&& endPointRecord.staticRoutes.e != undefined
					//console.log("staticRoutes:111 "+endPointRecord.staticRoutes.e);
					//console.log("staticRoutes:222 "+endPointRecord.staticRoutes);
					//console.log("staticRoutes: nextHop "+endPointRecord.staticRoutes.e.nextHop);
					//console.log("staticRoutes: destinationPrefix "+endPointRecord.staticRoutes.e.destinationPrefix);
					//console.log("staticRoutesForIPv6: nextHop "+endPointRecord.staticRoutes.e.nextHop);
					//console.log("staticRoutesForIPv6: destinationPrefix "+endPointRecord.staticRoutes.e.destinationPrefix);
				    
					if(endPointRecord.staticRoutes.e != undefined){
						//endPointRecord.staticRoutes.nextHop=endPointRecord.staticRoutes.e.nextHop;
						//endPointRecord.staticRoutes.destinationPrefix=endPointRecord.staticRoutes.e.destinationPrefix;
						endPointRecord.staticRoutes=endPointRecord.staticRoutes.e;
						Ext.Array.push(ipv4StaticPrefixListArr,endPointRecord.staticRoutes);
						
						////endPointRecord.staticRoutes.destinationPrefix=endPointRecord.staticRoutes.e;
					}
				   rec.set('staticRoutes',endPointRecord.staticRoutes);
				   rec.set('oldStaticRoutes',ipv4StaticPrefixListArr);
				   
				}
				if(endPointRecord.routingProtocol == 'Static' && ipv6Peer == 'true' && endPointRecord.staticRoutesForIPv6 != undefined ){// && endPointRecord.staticRoutesForIPv6.e != undefined
					//endPointRecord.staticRoutesForIPv6.nextHop=endPointRecord.staticRoutesForIPv6.e.nextHop;
					//endPointRecord.staticRoutesForIPv6.destinationPrefix=endPointRecord.staticRoutesForIPv6.e.destinationPrefix;
					
					if(endPointRecord.staticRoutes.e != undefined){
						//endPointRecord.staticRoutes.nextHop=endPointRecord.staticRoutes.e.nextHop;
						//endPointRecord.staticRoutes.destinationPrefix=endPointRecord.staticRoutes.e.destinationPrefix;
						endPointRecord.staticRoutesForIPv6=endPointRecord.staticRoutesForIPv6.e;
						////endPointRecord.staticRoutesForIPv6.staticRoutesForIPv6=endPointRecord.staticRoutesForIPv6.e;
						Ext.Array.push(ipv4StaticPrefixListArr,endPointRecord.staticRoutesForIPv6);
					}
					rec.set('ipv6StaticPrefixListArr',endPointRecord.staticRoutesForIPv6);
					rec.set('oldStaticRoutesForIPv6',ipv6StaticPrefixListArr);
					
					
				}
				var ipv4PrefixListArr = [];
				var ipv6PrefixListArr = [];
				console.log("1: "+endPointRecord.prefixList);
				//console.log("2"+endPointRecord.prefixList[0].prefixList);
				//console.log("2"+endPointRecord.prefixList[1].prefixList);
				//console.log("3"+endPointRecord.prefixList.e.length);
				if(ipv6Peer == 'false' && endPointRecord.prefixList != undefined ){//&& endPointRecord.prefixList.e != undefined
					console.log("prefixList:111 "+endPointRecord.prefixList);
					//endPointRecord.prefixList=endPointRecord.prefixList;
					if(endPointRecord.prefixList.e != undefined)
						endPointRecord.prefixList=endPointRecord.prefixList.e;
						
					rec.set('prefixList',endPointRecord.prefixList);
					rec.set('oldPrefixList',endPointRecord.prefixList);
				}
				if(ipv6Peer == 'true' && endPointRecord.ipv6PrefixList != undefined ){//&& endPointRecord.ipv6PrefixList.e != undefined
				//console.log("ipv6PrefixList:111 "+endPointRecord.ipv6PrefixList);
				//console.log("ipv6PrefixList:222 "+endPointRecord.ipv6PrefixList.e);
				//console.log("ipv6PrefixList:333> "+endPointRecord.ipv6PrefixList[0].e.prefixList);
				//console.log("ipv6PrefixList:444> "+endPointRecord.ipv6PrefixList[0].e.ipv6PrefixList);
				//console.log("ipv6PrefixList:333> "+endPointRecord.ipv6PrefixList.e.prefixList);
				//console.log("ipv6PrefixList:444> "+endPointRecord.ipv6PrefixList.e.ipv6PrefixList);
					if(endPointRecord.ipv6PrefixList.e != undefined)
						endPointRecord.ipv6PrefixList=endPointRecord.ipv6PrefixList.e;
					
					rec.set('ipv6PrefixList',endPointRecord.ipv6PrefixList);
					rec.set('oldIPv6PrefixList',endPointRecord.ipv6PrefixList);
				}
				
				
				rec.set('ciuName',endPointRecord.ciuName);
				rec.set('ciuAlias',endPointRecord.ciuAlias);
				rec.set('csId',endPointRecord.csId);
				rec.set('accessType',endPointRecord.accessType);
				
				console.log("connection Type: "+endPointRecord.connectionType);
				 
				 /*if(endPointRecord.connectionType == 'REDI'){
					rec.set('connectionType','RE Direct');
				}else{
					rec.set('connectionType','RE Dual');
					}*/
				rec.set('connectionType',endPointRecord.connectionType);
				console.log("pathPreferences: "+endPointRecord.pathPreferences);
				rec.set('pathPreferences',endPointRecord.pathPreferences);
				rec.set('ipAddress',endPointRecord.ipAddress);
				rec.set('subnetMask',endPointRecord.subnetMask);
				
				//console.log("static routers e:>> "+endPointRecord.staticRoutes.e);
				//console.log("static routers:>> "+endPointRecord.staticRoutes.e);
				if(endPointRecord.staticRoutes != undefined && endPointRecord.staticRoutes.e != undefined){
					rec.set('staticRoutes',endPointRecord.staticRoutes.e);
					rec.set('staticRoutesForIPv6',endPointRecord.staticRoutesForIPv6.e);
				}
				rec.set('ipMTU',endPointRecord.ipMTU);
				
				console.log("ipv6Peer ::::: "+ipv6Peer);
				rec.set('ipv6Peer',ipv6Peer);
				
				rec.set('ipv6Address',endPointRecord.ipv6Address);
				rec.set('neighbourAddress',endPointRecord.neighbourAddress);
				rec.set('addressPool',endPointRecord.addressPool);
				rec.set('localPref',endPointRecord.localPref);
				rec.set('med',endPointRecord.med);
				rec.set('peerAS',endPointRecord.peerAS);
				rec.set('ingressRate',endPointRecord.ingressRate);
				rec.set('egressRate',endPointRecord.egressRate);
				//rec.set('recordOPType','MODIFY');
			}

		}	
	},
	populateData:function(){
        
        if(this.commonData != null) {

             this.scriptUtils.setFieldValues(this,this.commonData);
			  
			  var attribs = Ext.JSON.decode(this.commonData.attribs);
			  
			  
			  console.log("accounting : "+attribs[0].accounting);
			  
			  var accounting = Ext.getCmp("accounting");
			  
			
			if(attribs[0].accounting=='true'){
				Ext.getCmp("accounting").setValue(true);
			}
			
			Ext.getCmp("operationalMode").setValue(attribs[0].operationalMode);
			Ext.getCmp("customerName").setValue(attribs[0].customer.e.name);
			Ext.getCmp("customerId").setValue(attribs[0].customer.e.id);
			Ext.getCmp("email").setValue(attribs[0].customer.e.email);
			Ext.getCmp("customerDescription").setValue(attribs[0].customer.e.description);
			
			console.log("cust info > "+attribs[0].customer.e.description);
			console.log("seID******************* > "+attribs[0].seId);
			console.log("service id:  "+attribs[0].serviceOrderId);
			Ext.getCmp("serviceId").setValue(attribs[0].serviceOrderId);
			Ext.getCmp("serviceName").setValue(attribs[0].serviceName);
			
			console.log("service instance id > "+this.commonData.serviceInstanceId);
			
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
		common.name=Ext.getCmp("serviceId").getValue() + "_MOD_" + (new Date()).getTime()
		//common.externalId = cdata.serviceId;
		common.externalId = Ext.getCmp("customerId").getValue();
		
		common.serviceTag = "TELUS_BICI";
        
        // Add service common attributes ...
		var commonAttributesArray = [];

		//cdata.serviceOrderName		
		commonAttributesArray.push({
			 "serviceOrderId": Ext.getCmp("serviceId").getValue(),
            "serviceName": Ext.getCmp("serviceName").getValue(),
           "operationalMode": Ext.getCmp("operationalMode").getValue(),
			//"serviceType" : Ext.getCmp("serviceType").getValue(),
			"accounting" : Ext.getCmp("accounting").getValue(),
			"architecture" :"JCE",
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
		console.log("Value of 'stagedInterfacesStore_RowCount': " + stagedInterfacesStore_RowCount);
		for(var i=0; i < stagedInterfacesStore_RowCount; i++) {
    		var row = stagedInterfacesStore.getAt(i);
			var deviceName = row.data.site;
		console.log("pedeviceId : " + row.data.pedeviceId);
		console.log("pedeviceId : " + row.data.site2);
		var egressRate = row.data.egressRate;
		/*if(egressRate.contains("k") || egressRate.contains("K") || egressRate.contains("m") || egressRate.contains("M")){
			egressRate = row.data.egressRate;
		}else{
			egressRate = egressRate+"k";
		}*/
		//var ipv4PrefixListArr = row.data.oldPrefixList;
		//var oldPrefixList = row.data.oldPrefixList;
		//if(oldPrefixList.length == undefined || oldPrefixList.length == 'undefined'){
			//Ext.Array.push(ipv4PrefixListArr,oldPrefixList);
		//}
		
		var ip4NetworkAddress = this.getNetworkAddress(row.data.ipAddress, row.data.subnetMask);
			formDataArray.push({
				"Interface": row.data.Interface,
				"pedeviceId": row.data.pedeviceId, //siteName.getValue(),//
				"site": row.data.site, //siteName.getRawValue(),//
				"deviceName": deviceName.split("-")[0]+"-"+deviceName.split("-")[1]+"-"+deviceName.split("-")[2],
				//"ethernateOption": row.data.ethernateOption,
				"vlanId": row.data.vlanId,
				"oldVlanId": row.data.oldVlanId,
				"endPointServiceType": row.data.endPointServiceType, //row.data.validateVlan1
				"ciuName": row.data.ciuName,
				"ciuAlias": row.data.ciuAlias,
				"csId": row.data.csId,
				"pathPreferences": row.data.pathPreferences,
				"accessType": row.data.accessType,
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
				"ingressRate": row.data.ingressRate,
				"egressRate": egressRate,
				"localPref": row.data.localPref,
				"med": row.data.med,
				"peerAS": row.data.peerAS,
				"seId": row.data.seId,
				"outerEncap":row.data.vlanId,
				"innerEncap":1,
				"operation": row.data.recordOPType,
				"recordOPType": row.data.recordOPType,
				"vendorType": Jx.ProvConstants.JUNIPER,
				"staticRoutes": row.data.staticRoutes,
				"oldStaticRoutes": row.data.oldStaticRoutes,
				"staticRoutesForIPv6": row.data.staticRoutesForIPv6,
				"oldStaticRoutesForIPv6": row.data.oldStaticRoutesForIPv6,
				"prefixList": row.data.prefixList,
				"oldPrefixList": row.data.oldPrefixList,
				"ipv6PrefixList": row.data.ipv6PrefixList,
				"oldIPv6PrefixList": row.data.oldIPv6PrefixList
				//"endPointType": row.data.endPointType
			});
		}
				//console.log("from data aray: "+JSON.stringify(formDataArray));
				//console.log("from data aray11: "+formDataArray);
				//console.log("from data aray22: "+formDataArray.toString());
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
                {valueText: 'TST', displayText: 'Test'}//,
				//{valueText: 'OPR', displayText: 'Operational'}
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
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please select the Routing Protocol!");
		//return;
	}else if(csId == null || csId == '' ){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please enter the valid CSID!");
		//return;
	}
	//else if(connectionType != null && connectionType == 'RE Dual' && (vlan == null || vlan == "")){
	else if(vlan == null || vlan == ""){
			isValid = true;
			Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the valid vlan!");
			return isValid;
		}
	else if(endPointServiceType == null || endPointServiceType == '' ){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please select a valid service Type!");
		//return;
	}
else if(connectionType == null || connectionType == '' ){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please select a valid connection type!");
		//return;
	}
	else if(pathPreferences == null || pathPreferences == '' ){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please select a Path Preference!");
		//return;
	}
	else if(ipAddress == null || ipAddress == '' ){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please enter a valid IP Address!");
		//return;
	}
	else if(subnetMask == null || subnetMask == '' ){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please enter a valid Subnet Mask!");
		//return;
	}
	else if(addressPool == null || addressPool == '' ){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please select the Prefix Supplier!");
		//return;
	}
	else if(connectionType != null && connectionType == 'RE Dual' && (vlan == null || vlan == "")){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the valid vlan!");
		//return;
	}
	else if(routingProtocol !='Static' && (peerAS == null || peerAS =="" )){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the PEER AS !!");
		//return isValid;
	}
	else if(routingProtocol !='Static' && ( neighbourAddress == null || neighbourAddress == "" )){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the Neighbour Address!!");
		//return isValid;
	}
	else if(routingProtocol !='Static' && ( med == null || med == "" )){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the MED!!");
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
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the Prefix/hops in order to add to the staging area!!");
		//return isValid;
	}
	else if(routingProtocol =='Static' && ipv6Peer == true && Ext.getCmp("staticRoutingOptionForIPv6").getStore().count() == 0){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please Enter the Prefix/hops ipv6 in order to add to the staging area!!");
		//return isValid;
	}else if(egressRate == null || egressRate == '' ){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please enter a valid Egress Rate!");
		//return;
	}else if(ciuName == null || ciuName == '' ){
		isValid = true;
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please enter a valid CIU Name!");
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

var selection = Ext.getCmp("siteInterfaceGrid").getSelectionModel().hasSelection();

	if(!selection){
		Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "Please select one of the site interface in the grid in order process!");
		return;

	}
	console.log("device id: "+this.moid);
	console.log("port id: "+this.port);
	var vlan = Ext.getCmp("vlanId").getValue();
	console.log("vlanId: "+vlan);
	var stagedInterfacesStore = Ext.getCmp("stagedInterfacesGrid").getStore();
	
	console.log("stages no ** : "+stagedInterfacesStore.count());
	var routingProtocol = Ext.getCmp("routingProtocol").getValue();
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
				if(numberOfDuplicateVLAN > 0 && routingProtocol != 'Static' && connectionType == 'RE Dual'){
					Ext.MessageBox.alert(Jx.ProvConstants.VALIDATION_ERROR, "VLAN ID cant be the same for selected Site and Port, Please change the VLAN ID.!");
					return;
					}
				}
			}
		}
	var endPointServiceType = this.scriptUtils.getFieldByName("endPointServiceType").getValue();
	console.log(" endPointServiceType: "+endPointServiceType);
	
	var ciuName = this.scriptUtils.getFieldByName("ciuName").getValue();
	console.log("ciuName : "+ciuName);

	var ciuAlias = this.scriptUtils.getFieldByName("ciuAlias").getValue();
	console.log("ciuAlias : "+ciuAlias);

	var accessType = this.scriptUtils.getFieldByName("accessType").getValue();
	console.log("accessType : "+accessType);
	var connectionType = this.scriptUtils.getFieldByName("connectionType").getValue();
	console.log(" connectionType: "+connectionType);

	var csId = this.scriptUtils.getFieldByName("csId").getValue();
	console.log(" csId: "+csId);

	var pathPreferences = this.scriptUtils.getFieldByName("pathPreferences").getValue();
	console.log(" pathPreferences: "+pathPreferences);
	var autonegotiate = this.scriptUtils.getFieldByName("autonegotiate").getValue();
	var adminState = this.scriptUtils.getFieldByName("adminState").getValue();

	var vlanId = this.scriptUtils.getFieldByName("vlanId").getValue();
	console.log("vlanId : "+vlanId);
	var ipAddress = this.scriptUtils.getFieldByName("ipAddress").getValue();
	console.log(" ipAddress: "+ipAddress);

	var subnetMask = this.scriptUtils.getFieldByName("subnetMask").getValue();
	console.log("subnetMask : "+subnetMask);

	var ipMTU = this.scriptUtils.getFieldByName("ipMTU").getValue();
	console.log(" ipMTU: "+ipMTU);
	var ipv6Peer =  Ext.getCmp('ipv6Peer').getValue();
	console.log("ipv6Peer ::>>> "+ipv6Peer);
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
	console.log("******************");
	var interfaceSelected = Ext.getCmp("siteInterfaceGrid").getSelectionModel().getSelection()[0];
	var siteName = Ext.getCmp('siteName').getValue();

	console.log("site': " + this.site);
	console.log("port': " + this.port);
	console.log("moid  : " + this.moid);

	if(siteName == null || interfaceSelected == undefined || interfaceSelected == 'undefined') {
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
		Ext.MessageBox.alert('Validation Error','Please fill IPV6 <b>Destination Prefix/ Next Hop</b> values for the record(s) added to the <b>Static Grid</b>');
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
			
			
	
	var ipv6PrefixListPanel = Ext.getCmp("ipv6PrefixListPanel").getStore();
	    var ipv6PrefixListPanel_RowCount = ipv6PrefixListPanel.count();
        		
			for(var i=0; i < ipv6PrefixListPanel_RowCount; i++) {
				if(ipv6PrefixListPanel.getAt(i).data.prefixList == '' || ipv6PrefixListPanel.getAt(i).data.ipv6PrefixList == ''){
						Ext.MessageBox.alert('Validation Error','PrefixList can not be empty');
					return;
				}
				Ext.Array.push(ipv6PrefixListArr,ipv6PrefixListPanel.getAt(i).data);
			}
			
	endpointPanel.hide();
	stagedInterfacesStore.add({
		pedeviceId: this.moid,
		site: this.site,
		Interface: this.port,
		endPointServiceType: endPointServiceType,   
		ciuName: ciuName,
		ciuAlias: ciuAlias,
		accessType: accessType,
		connectionType: connectionType,
		csId: csId,
		pathPreferences: pathPreferences,
		vlanId: vlanId,
		ipAddress: ipAddress,
		subnetMask: subnetMask,
		ipMTU: ipMTU,
		ipv6Peer: ipv6Peer,
		ipv6Address: ipv6Address,
		neighbourAddress: neighbourAddress,
		routingProtocol: routingProtocol,
		autonegotiate: autonegotiate,
		adminState: adminState,
		addressPool: addressPool,
		ingressRate: ingressRate,
		egressRate: egressRate,
		localPref: localPref,
		med: med,
		peerAS: peerAS,
		recordOPType: 'ADD',
		staticRoutes: staticRoutesArr,
		staticRoutesForIPv6: staticRoutesArrForIPv6,
		prefixList: ipv4PrefixListArr,
		ipv6PrefixList: ipv6PrefixListArr
	}); 	
	//Ext.getCmp("stagedInterfacesGrid").getView().refresh();	
	Ext.getCmp("staticRoutingOption").getStore().removeAll();
	Ext.getCmp("staticRoutingOptionForIPv6").getStore().removeAll();
	Ext.getCmp("prefixListPanel").getStore().removeAll();
	Ext.getCmp("ipv6PrefixListPanel").getStore().removeAll();
},
handleUpdateStagedInterface:function() {
	console.log("handleUpdateStagedInterface");
	var isDataValid = this.validateEndpointDetails();
	console.log("isDataValid > > > > : > "+isDataValid);
	if(isDataValid)
		return;
	if(this.validateIpAddress()){
		return;
		};
	var isDeployedUpdated = Ext.getCmp("isDeployedUpdated").getValue();
	var endPointServiceType = Ext.getCmp("endPointServiceType").getValue();
	
	var ciuName = Ext.getCmp("ciuName").getValue();
	var ciuAlias = Ext.getCmp("ciuAlias").getValue();
	var accessType = Ext.getCmp("accessType").getValue();
	var connectionType = Ext.getCmp("connectionType").getValue();
	
	var csId = this.scriptUtils.getFieldByName("csId").getValue();
	console.log(" csId: "+csId);

	var pathPreferences = this.scriptUtils.getFieldByName("pathPreferences").getValue();
	console.log(" pathPreferences: "+pathPreferences);

	var vlanId = Ext.getCmp("vlanId").getValue();
	var oldVlanId = Ext.getCmp("oldVlanId").getValue();
	console.log(" oldVlanId: "+oldVlanId);
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

	console.log("******************");
	console.log("ipAddress': " + ipAddress);
	console.log("******************");
	////var isCCI = Ext.getCmp('isCCI');
	////isCCI.setValue(false);
	
	var row;
	var rowUpdate;
	var deployedInterfacesGrid = Ext.getCmp("deployedInterfacesGrid").getStore();
	var stagedInterfacesStore = Ext.getCmp("stagedInterfacesGrid").getStore();
	
	var staticRoutesArr = [];
	if(routingProtocol != 'Static'){
		Ext.getCmp("staticRoutingOption").getStore().removeAll();
		Ext.getCmp("staticRoutingOptionForIPv6").getStore().removeAll();
	}else if(routingProtocol == 'Static'){
		Ext.getCmp("prefixListPanel").getStore().removeAll();
		Ext.getCmp("ipv6PrefixListPanel").getStore().removeAll();
	}
	
	var staticRoutingOption = Ext.getCmp("staticRoutingOption").getStore();
	    var staticRoutingOption_RowCount = staticRoutingOption.count();
        		
			for(var i=0; i < staticRoutingOption_RowCount; i++) {
				if(staticRoutingOption.getAt(i).data.destinationPrefix == '' || staticRoutingOption.getAt(i).data.nextHop == ''){
						Ext.MessageBox.alert('Validation Error','PrefixList/Next Hop can not be empty');
					return;
				}
				Ext.Array.push(staticRoutesArr,staticRoutingOption.getAt(i).data);
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
		Ext.MessageBox.alert('Validation Error','Please fill IPV6 <b>Destination Prefix/ Next Hop</b> values for the record(s) added to the <b>Static Grid</b>');
					return;
	}
	
	var ipv4PrefixListArr = [];
	var ipv6PrefixListArr = [];
	
	var oldIPv4PrefixListArr = [];
	var oldIPv6PrefixListArr = [];
	
	var oldStaticvPrefixListArr = [];
	var oldStaticIPv6PrefixListArr = [];
	
	var prefixListPanel = Ext.getCmp("prefixListPanel").getStore();
	    var prefixListPanel_RowCount = prefixListPanel.count();
        		
			for(var i=0; i < prefixListPanel_RowCount; i++) {
				if(prefixListPanel.getAt(i).data.prefixList == ''){
						Ext.MessageBox.alert('Validation Error','PrefixList can not be empty');
					return;
				}
				Ext.Array.push(ipv4PrefixListArr,prefixListPanel.getAt(i).data);
			}
			
	//Ext.getCmp("prefixListPanel").getStore().removeAll();
	if(ipv6Peer == false){
		Ext.getCmp("ipv6PrefixListPanel").getStore().removeAll();	
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
	
	console.log("ipv4PrefixListArr >  : > "+ipv4PrefixListArr);
	console.log("ipv6PrefixListArr >  : > "+ipv6PrefixListArr);
	
	
				
	if(isDeployedUpdated == 'true'){
			console.log("deployed");
			
			row = deployedInterfacesGrid.getAt(index);
			
			console.log("1*********** ** "+index);
			
			deployedInterfacesGrid.getAt(index).data.recordOPType="MODIFY";
			deployedInterfacesGrid.getAt(index).data.vlanId=vlanId;
			
			stagedInterfacesStore.add(row);
			console.log("3************ ** ");
			var stageCount = stagedInterfacesStore.count();
			console.log("4************ ** "+stageCount);
			//stagedInterfacesStore.getAt(stageCount-1).data.recordOPType="MODIFY";
			//stagedInterfacesStore.getAt(stageCount-1).data.csId=csId;
			//stagedInterfacesStore.getAt(stageCount-1).data.connectionType=connectionType;
			//stagedInterfacesStore.getAt(stageCount-1).data.neighbourAddress=neighbourAddress;
			//stagedInterfacesStore.getAt(stageCount-1).data.ipAddress=ipAddress;
			
			stagedInterfacesStore.getAt(stageCount-1).data.oldVlanId=oldVlanId;
			stagedInterfacesStore.getAt(stageCount-1).data.prefixList = ipv4PrefixListArr;
			Ext.Array.push(oldIPv4PrefixListArr,row.data.oldPrefixList);
			Ext.Array.push(oldIPv6PrefixListArr,row.data.oldIPv6PrefixList);
			Ext.Array.push(oldStaticvPrefixListArr,row.data.oldStaticRoutes);
			Ext.Array.push(oldStaticIPv6PrefixListArr,row.data.oldStaticRoutesForIPv6);
		
	
			stagedInterfacesStore.getAt(stageCount-1).data.oldPrefixList = oldIPv4PrefixListArr;
			
			stagedInterfacesStore.getAt(stageCount-1).data.ipv6PrefixList = ipv6PrefixListArr;
			stagedInterfacesStore.getAt(stageCount-1).data.oldIPv6PrefixList = oldIPv6PrefixListArr;
			stagedInterfacesStore.getAt(stageCount-1).data.staticRoutes = staticRoutesArr;
			stagedInterfacesStore.getAt(stageCount-1).data.oldStaticRoutes = oldStaticvPrefixListArr;
			stagedInterfacesStore.getAt(stageCount-1).data.staticRoutesForIPv6 = staticRoutesArrForIPv6;
			stagedInterfacesStore.getAt(stageCount-1).data.oldStaticRoutesForIPv6 = oldStaticIPv6PrefixListArr;
			stagedInterfacesStore.getAt(stageCount-1).data.autonegotiate=autonegotiate;
			stagedInterfacesStore.getAt(stageCount-1).data.adminState=adminState;
			stagedInterfacesStore.getAt(stageCount-1).data.ipv6Peer=ipv6Peer;
			stagedInterfacesStore.getAt(stageCount-1).data.ipv6Address=ipv6Address;
			stagedInterfacesStore.getAt(stageCount-1).data.addressPool=addressPool;
			//stagedInterfacesStore.getAt(stageCount-1).data.ipv6Address=ipv6Address;//+"."+ipv6Address1+"."+ipv6Address2+"."+ipv6Address3;
			//stagedInterfacesStore.getAt(stageCount-1).data.endPointServiceType=endPointServiceType;
			Ext.getCmp("stagedInterfacesGrid").getView().refresh();	
			Ext.getCmp("isDeployedUpdated").setValue("false");
			
	}else{
		 row = stagedInterfacesStore.getAt(index);
	}
	deployedInterfacesGrid.removeAt(index);
		
	Ext.getCmp("deployedInterfacesGrid").getView().refresh();
	

	console.log("isDeployedUpdated >  : > "+isDeployedUpdated);
	var stagedInterfacesStore = Ext.getCmp("stagedInterfacesGrid").getStore();
	var row = stagedInterfacesStore.getAt(index);
	
	if(isDeployedUpdated == 'false'){
		row.data.endPointServiceType= endPointServiceType;   
		row.data.ciuName= ciuName;
		row.data.ciuAlias= ciuAlias;
		row.data.accessType= accessType;
		row.data.connectionType= connectionType;
		row.data.csId= csId,
		row.data.pathPreferences= pathPreferences,
		row.data.vlanId= vlanId;
		row.data.ipAddress= ipAddress;
		row.data.subnetMask= subnetMask;
		row.data.ipMTU= ipMTU;
		row.data.ipv6Peer= ipv6Peer;
		row.data.ipv6Address= ipv6Address;
		row.data.neighbourAddress= neighbourAddress;
		row.data.localPref= localPref;
		row.data.med= med;
		row.data.peerAS= peerAS;
		row.data.routingProtocol = routingProtocol;
		row.data.autonegotiate = autonegotiate;
		row.data.adminState = adminState;
		row.data.addressPool = addressPool;
		row.data.ingressRate = ingressRate;
		row.data.egressRate = egressRate;
		row.data.staticRoutes = staticRoutesArr;
		row.data.staticRoutesForIPv6 = staticRoutesArrForIPv6;
		row.data.prefixList = ipv4PrefixListArr;
		row.data.ipv6PrefixList = ipv6PrefixListArr;
		
	}
	var endpointPanel = Ext.ComponentQuery.query('#endpointPanel')[0];
	endpointPanel.hide();
	
	var clearInactiveEntriesFromListButton = Ext.getCmp('clearInactiveEntriesFromListButton');
	clearInactiveEntriesFromListButton.show();
	////this.isCCI=false;
	var updateBtn = Ext.getCmp('updateBtn');
	updateBtn.hide();
	Ext.getCmp('deleteBtn').hide();
	var stageBtn = Ext.getCmp('stageBtn');
	stageBtn.show();
	
	var interfacegrid = Ext.ComponentQuery.query('gridpanel[name=siteInterfaceGrid]')[0];
	interfacegrid.setDisabled(false);
	
	Ext.getCmp("routingProtocol").setDisabled(false);
	
	Ext.getCmp("staticRoutingOption").getStore().removeAll();
	Ext.getCmp("staticRoutingOptionForIPv6").getStore().removeAll();
	Ext.getCmp("prefixListPanel").getStore().removeAll();
	Ext.getCmp("ipv6PrefixListPanel").getStore().removeAll();
	
	var siteName = Ext.getCmp('siteName').setDisabled(false);
	Ext.getCmp("stagedInterfacesGrid").getView().refresh();	
},
handleDeleteStagedInterface:function() {
	var isDeployedUpdated = Ext.getCmp("isDeployedUpdated").getValue();
	console.log("`");
	var endPointServiceType = Ext.getCmp("endPointServiceType").getValue();
	var ciuName = Ext.getCmp("ciuName").getValue();
	var ciuAlias = Ext.getCmp("ciuAlias").getValue();
	var accessType = Ext.getCmp("accessType").getValue();
	var connectionType = Ext.getCmp("connectionType").getValue();
	
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
	console.log("peerAS': " +peerAS);
	
	var index = Ext.getCmp("index").getValue();
	console.log('index to update: '+index);
	console.log("******************");
	console.log("ipAddress': " + ipAddress);
	console.log("******************");
	console.log("site': " + this.site);
	console.log("port': " + this.port);
	console.log("moid  : " + this.moid);
	
	////var isCCI = Ext.getCmp('isCCI');
	////isCCI.setValue(false);
	console.log(" isDeployedUpdated " +isDeployedUpdated);
	
	var row='';
	if(isDeployedUpdated == 'true'){ 
		console.log("deployed");
		var cciInterfacesDeployedGrid = Ext.getCmp("deployedInterfacesGrid").getStore();
		row = cciInterfacesDeployedGrid.getAt(index);
		}
		var stagedInterfacesStore = Ext.getCmp("stagedInterfacesGrid").getStore();
	
	row.data.recordOPType='DELETE';
	stagedInterfacesStore.add(row);
	cciInterfacesDeployedGrid.removeAt(index);
	
		
	var endpointPanel = Ext.ComponentQuery.query('#endpointPanel')[0];
	endpointPanel.hide();
	
	var clearInactiveEntriesFromListButton = Ext.getCmp('clearInactiveEntriesFromListButton');
	clearInactiveEntriesFromListButton.show();
	
	this.isCCI=false;
	var updateBtn = Ext.getCmp('updateBtn');
	updateBtn.hide();
	Ext.getCmp('deleteBtn').hide();
	var stageBtn = Ext.getCmp('stageBtn');
	stageBtn.show();
	
	var interfacegrid = Ext.ComponentQuery.query('gridpanel[name=siteInterfaceGrid]')[0];
	interfacegrid.setDisabled(false);
	var siteName = Ext.getCmp('siteName').setDisabled(false);
	Ext.getCmp('ipAddress').setDisabled(false);
	Ext.getCmp('subnetMask').setDisabled(false);
	Ext.getCmp('vlanId').setDisabled(false);
	Ext.getCmp('neighbourAddress').setDisabled(false);
	Ext.getCmp("routingProtocol").setDisabled(false);
	Ext.getCmp("stagedInterfacesGrid").getView().refresh();	
	Ext.getCmp("deployedInterfacesGrid").getView().refresh();
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
		destinationPrefix: "",
		nextHop: ""
		
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
onRowEditingEdit: function(editor, e, eOpts) {
	//Ext.getCmp("staticRoutingOption").getView().refresh();
},
getDeletedPrefixList: function(listBeforeChange, listAfterChange) {
	var lookup = {};
	var deletedList= new Array();

	for (var j in listAfterChange) {
		  lookup[listAfterChange[j]] = listAfterChange[j];
	  }
	  
	  for (var i in listBeforeChange) {
		  if (typeof lookup[listBeforeChange[i]] == 'undefined') {
			deletedList.push(listBeforeChange[i])
		} 
	}
	console.log("deletedList "+deletedList);
	return deletedList;
}
	
});