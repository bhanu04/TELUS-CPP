<?xml version='1.0' ?>
<!-- 
***********************************************************
   JNPR RE Device Turnup XSLT TRANSFORMATION SCRIPT
   
      > Support: Bhanu Singh
      > Company: Juniper Networks
      > Contact: bhanus@juniper.net    
      > Version: 0.1           
      > Revision Date: 2014-09-19
      
      [Copyright 2009-2014 Juniper Networks, Inc.]
      [All rights reserved.]
      
***********************************************************
-->

<!--
BELOW IS A SAMPLE 'SERVICEREQUEST.XML' ASSOCIATED WITH THIS XSLT SCRIPT:

<?xml version="1.0"?>
<ns2:ServiceRequest xmlns:ns2="http://provisioning.jmp.juniper.net/servicerequest/dto">
  <ID>12615901</ID>
  <Name>380008_MOD_1424448430177</Name>
  <TypeOfRequest>Modification</TypeOfRequest>
  <ServiceType>FLEX</ServiceType>
  <RecoveryState>Default</RecoveryState>
  <OpType>MODIFY</OpType>
  <ServiceID>12615896</ServiceID>
  <Createdby>bhanus</Createdby>
  <CreatedDate>2015-02-20T16:07:12Z</CreatedDate>
  <LastModifiedDate>2015-02-20T16:07:12Z</LastModifiedDate>
  <State>Scheduled</State>
  <Customer/>
  <ServiceCommonAttributes>
    <e>
      <accounting>false</accounting>
      <application>GEN</application>
      <architecture>JCE</architecture>
      <customer>
        <e>
          <description>scenario2</description>
          <email>N/A</email>
          <id>12</id>
          <name>Altech</name>
        </e>
      </customer>
      <enforceRoute>false</enforceRoute>
      <flowSampling>false</flowSampling>
      <maxRoute null="true"/>
      <operationalMode>Pending</operationalMode>
      <qosType>QoS per Access</qosType>
      <redistConnRoutes>false</redistConnRoutes>
      <serviceOrderId>380008</serviceOrderId>
      <vpnName>telus_test</vpnName>
    </e>
  </ServiceCommonAttributes>
  <Policy>
    <ID>12615887</ID>
    <Name>L3VPN_FOA_DEV</Name>
  </Policy>
  <ExtRef>12</ExtRef>
  <serviceElementList>
    <serviceElement>
      <deviceID>12550149</deviceID>
      <deviceName>EDTN-LAB-CG01-RE1</deviceName>
      <vendorType>Juniper</vendorType>
      <operation>MODIFY</operation>
      <entityID>12615902</entityID>
      <seID>0</seID>
      <elementState>0</elementState>
      <elementRecoveryState>Default</elementRecoveryState>
      <ServiceEndpointAttributes>
        <Interface>ge-0/3/5</Interface>
        <accessRate>1200K</accessRate>
        <accessType>HS</accessType>
        <adminState>Up</adminState>
        <af1>0</af1>
        <af2>0</af2>
        <af3>100</af3>
        <autonegotiate>false</autonegotiate>
        <beService>false</beService>
        <burstSize>0</burstSize>
        <bwLimit>0</bwLimit>
        <ciuAlias>TELUS-WEST WEST</ciuAlias>
        <ciuLoopback>10.12.0.3</ciuLoopback>
        <ciuName>TELUS-WEST WEST</ciuName>
        <classifier>v2-DSCP(default)</classifier>
        <connectionType>RE Dual</connectionType>
        <csId>567</csId>
        <efRate>0</efRate>
        <efService>false</efService>
        <endPointServiceType>TML3</endPointServiceType>
        <endPointType>Full Mesh</endPointType>
        <innerEncap>1</innerEncap>
        <ipAddress>10.12.0.1</ipAddress>
        <ipMTU null="true"/>
        <ipv6Address/>
        <ipv6Peer>false</ipv6Peer>
        <isAF1Selected>false</isAF1Selected>
        <isAF2Selected>false</isAF2Selected>
        <isAF3Selected>true</isAF3Selected>
        <isAllAFSelected>false</isAllAFSelected>
        <localPref>120</localPref>
        <loopbackSubnetMask>32</loopbackSubnetMask>
        <med>70</med>
        <mvpn>false</mvpn>
        <neighbourAddress>10.12.0.2</neighbourAddress>
        <nextHOP/>
        <oldAF1>0</oldAF1>
        <oldAF2>0</oldAF2>
        <oldAF3>100</oldAF3>
        <oldAccessRate>1200K</oldAccessRate>
        <oldAdminState>Up</oldAdminState>
        <oldAutoNegotiate>false</oldAutoNegotiate>
        <oldCiuLoopback>10.12.0.3/32</oldCiuLoopback>
        <oldClasifier>v2-DSCP(default)</oldClasifier>
        <oldEFRate>"null"</oldEFRate>
        <oldEFService>false</oldEFService>
        <oldEndPointServiceType>TML3</oldEndPointServiceType>
        <oldIPV4AddressAndMask>10.12.0.1/30</oldIPV4AddressAndMask>
        <oldNeighbourAddress>10.12.0.2</oldNeighbourAddress>
        <oldRT>88</oldRT>
        <oldVlanId>92</oldVlanId>
        <oldVpnSpeed>undefined</oldVpnSpeed>
        <operation>MODIFY</operation>
        <outerEncap>92</outerEncap>
        <pathPreferences>Primary</pathPreferences>
        <pedeviceId>12550149</pedeviceId>
        <peerAS>65001</peerAS>
        <policyGroup/>
        <qosType/>
        <rd>83</rd>
        <recordOPType>MODIFY</recordOPType>
        <rpAddress/>
        <rpGprRange/>
        <rpType null="true"/>
        <rt>88</rt>
        <rtHub/>
        <rtSpoke/>
        <seId>12615897</seId>
        <senderSite null="true"/>
        <site>EDTN-LAB-CG01-RE1</site>
        <ssmIP/>
        <ssmIpMask null="true"/>
        <subnetMask>30</subnetMask>
        <topology>Full Mesh</topology>
        <typeOfService>0</typeOfService>
        <vendorType>Juniper</vendorType>
        <vlanId>92</vlanId>
        <vpnAlias/>
        <vpnRate null="true"/>
      </ServiceEndpointAttributes>
    </serviceElement>
  </serviceElementList>
</ns2:ServiceRequest>



-->
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:ns2="http://provisioning.jmp.juniper.net/servicerequest/dto"
                xmlns:ResourceMap="java:net.juniper.jmp.provisioning.scriptUtil.ResourceMap"
                xmlns:ServiceActivationUtils="java:net.juniper.jmp.provisioning.scriptUtil.ServiceActivationUtils"
                exclude-result-prefixes="ServiceActivationUtils ResourceMap">
   <xsl:output method="xml" indent="yes" encoding="UTF-8"/>
   
   <xsl:param name="resourceMap"/> <!-- Global Parameter -->
   
   <xsl:template match="/">
      
      <!-- TOP-LEVEL DERIVATIONS - BEGIN --> 
      
      <!-- PARAMS EXTRACTED DIRECTLY FROM 'ServiceRequest.xml' ... --> 
      <xsl:variable name="customer" select="/ns2:ServiceRequest/Customer"/>
	   <xsl:variable name="customerName" select="/*/ServiceCommonAttributes/e/customer/e/name"/>
      <xsl:variable name="customerNumber" select="/*/ServiceCommonAttributes/e/customer/e/id"/>
      <xsl:variable name="description" select="/*/ExtRef"/>
      <xsl:variable name="mtu" select="/*/ServiceCommonAttributes/e/mtu"/>
	   <xsl:variable name="SERVICE_ID" select="/*/ServiceCommonAttributes/e/serviceOrderId"/>
      <xsl:variable name="vpnName" select="/*/ServiceCommonAttributes/e/vpnName"/>
     <!-- <xsl:variable name="topology" select="/*/ServiceCommonAttributes/e/topology"/>-->
      <xsl:variable name="qosType" select="/*/ServiceCommonAttributes/e/qosType"/>
      <xsl:variable name="application" select="/*/ServiceCommonAttributes/e/application"/>
      <xsl:variable name="flowSampling" select="/*/ServiceCommonAttributes/e/flowSampling"/>
      <xsl:variable name="operationalMode" select="/*/ServiceCommonAttributes/e/operationalMode"/>
      <xsl:variable name="architecture" select="/*/ServiceCommonAttributes/e/architecture"/>
      <xsl:variable name="redistConnRoutes" select="/*/ServiceCommonAttributes/e/redistConnRoutes"/>
      <xsl:variable name="opType" select="/ns2:ServiceRequest/OpType"/>
      <xsl:variable name="pathId" select="/*/ServiceCommonAttributes/e/pathId"/>
      <xsl:variable name="serviceDefinitionName" select="/ns2:ServiceRequest/Policy/Name"/>
      <xsl:variable name="serviceOrderName" select="/ns2:ServiceRequest/Name"/>
      <xsl:variable name="serviceOrderDescription" select="/ns2:ServiceRequest/Description"/>
      <xsl:variable name="speed" select="/*/ServiceCommonAttributes/e/speed"/>
      <xsl:variable name="userId" select="/ns2:ServiceRequest/Createdby"/>
      <xsl:variable name="maxRoute" select="maxRoute"/>
      <xsl:variable name="enforceRoute" select="enforceRoute"/>
      
      
  <!-- TOP-LEVEL DERIVATIONS - END -->
      
      
      <!-- CONSTANT PARAMS ... -->
      <xsl:variable name="smallcase" select="'abcdefghijklmnopqrstuvwxyz'" />
      <xsl:variable name="uppercase" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'" />
      <xsl:variable name="INVENTORY_TYPE_CONFIGURATION" select="'configuration'"/>
      <xsl:variable name="AS_NUMBER" select="'852'"/>  <!-- 852 -->
      <xsl:variable name="RT_SCHEDULER_BUFFER_SIZE" select="'10k'"/>
      <xsl:variable name="RT_SCHEDULER_PRIORITY_HIGH" select="'strict-high'"/>
      <xsl:variable name="RT_SCHEDULER_PRIORITY" select="'strict-high'"/>
      <xsl:variable name="LOW" select="'low'"/>
      <xsl:variable name="LOSS_PRIORITY_MEDIUM_HIGH" select="'medium-high'"/>
      <xsl:variable name="DROP_PROFILE_PROTOCOL" select="'any'"/>
      <xsl:variable name="DROP_PROFILE_YELLOW_WRED" select="'YELLOW-WRED'"/>
      <xsl:variable name="DROP_PROFILE_GREEN_WRED" select="'GREEN-WRED'"/>
      <xsl:variable name="FC_HIGH_PRIORITY_DATA" select="'FC_HIGH_PRIORITY_DATA'"/>
      <xsl:variable name="FC_LOW_PRIORITY_DATA_GREEN" select="'FC_LOW_PRIORITY_DATA_GREEN'"/>
      <xsl:variable name="FC_BEST_EFFORT_DATA_GREEN" select="'FC_BEST_EFFORT_DATA_GREEN'"/>
      <xsl:variable name="FC_LOW_LATENCY_DATA_GREEN" select="'FC_LOW_LATENCY_DATA_GREEN'"/>
      <xsl:variable name="CLASSIFIER_NAME" select="'CLASS_8021AD'"/>
      <xsl:variable name="REWRITE_RULE_NAME" select="'REWRITE_8021AD'"/>
      <xsl:variable name="SCH_RT" select="'SCH-RT'"/>
      <xsl:variable name="SCHEDULER_MAP" select="'SM'"/>
      <xsl:variable name="SCH_RT" select="'SCH-RT'"/>
      <xsl:variable name="SCH_ST" select="'SCH-ST'"/>
      <xsl:variable name="SCH_BE" select="'SCH-BE'"/>
      <xsl:variable name="SCH_PR" select="'SCH-PR'"/>
      <xsl:variable name="TCP" select="'TCP'"/>
      
      <xsl:variable name="SCH_RT" select="'SCH-RT'"/>
      <xsl:variable name="SCHEDULER_MAP" select="'SM'"/>
      <xsl:variable name="SCH_RT" select="'SCH-RT'"/>
      <xsl:variable name="SCH_ST" select="'SCH-ST'"/>
      <xsl:variable name="SCH_BE" select="'SCH-BE'"/>
      <xsl:variable name="SCH_PR" select="'SCH-PR'"/>
      <xsl:variable name="TCP" select="'TCP'"/>
      <xsl:variable name="FILLER" select="'FILTER'"/>
      <xsl:variable name="SOO" select="'SOO'"/>
      <xsl:variable name="SET" select="'SET'"/>
      <xsl:variable name="LP" select="'LP'"/>
      <xsl:variable name="RT" select="'RT'"/>
      <xsl:variable name="VPRN" select="'VPRN'"/>
      <xsl:variable name="MSH" select="'MSH'"/>
      <xsl:variable name="HUB" select="'HUB'"/>
      <xsl:variable name="SPK" select="'SPK'"/>
      <xsl:variable name="LB" select="'LB'"/>
      <xsl:variable name="MGMT" select="'MGMT'"/>
      <xsl:variable name="PERF" select="'PERF'"/>
      <xsl:variable name="IMP" select="'IMP'"/>
      <xsl:variable name="NMC" select="'NMC'"/>
      <xsl:variable name="BRIX" select="'BRIX'"/>
      <xsl:variable name="PROTOCOL-BGP" select="'bgp'"/>
      <xsl:variable name="PROTOCOL-DIRECT" select="'direct'"/>
      <xsl:variable name="EXP" select="'EXP'"/>
      <xsl:variable name="CPE" select="'CPE'"/>
      <xsl:variable name="TMP" select="'TMP'"/>
      <xsl:variable name="DIRECT" select="'direct'"/>
      
      <xsl:variable name="TARGET" select="'target'"/>
      <xsl:variable name="ORIGIN" select="'origin'"/>
      <xsl:variable name="LB-MGMT" select="'LB_MGMT'"/>
      <xsl:variable name="NMC-MGMT-770" select="'NMC_MGMT_770'"/>
      <xsl:variable name="BRIX-import" select="'BRIX_import'"/>
      <xsl:variable name="RT-BRIX" select="'RT_BRIX'"/>
      <xsl:variable name="PERF-HUB" select="'PERF_HUB'"/>
      <xsl:variable name="RT-PERF-HUB" select="'RT_PERF_HUB'"/>
      <xsl:variable name="RT-CPE-MGMT-771" select="'RT_CPE_MGMT_771'"/>
      
      <xsl:variable name="QoSEnable" select="'true'"/>
   
      <!-- CONFIGLET ASSEMBLY - BEGIN -->
      <xsl:choose>
         <!-- IF OPTYPE == "ADD" -->
         <xsl:when test="$opType = 'MODIFY'">
            <serviceRequestConfig>   <!-- Insert document root element (<serviceRequestConfig>) here -->
            
               <!-- JNPR PE ENDPOINT CONFIG -->
               <xsl:for-each select="/ns2:ServiceRequest/serviceElementList/serviceElement/ServiceEndpointAttributes[vendorType = 'Juniper']">
               
                 <!-- <xsl:variable name="recordOPType" select="/*/serviceElementList/serviceElement/operation"/>-->
                  <xsl:variable name="recordOPType" select="../operation" />
                  
                  <!-- DEVICE-LEVEL DERIVATIONS - BEGIN -->
			         <xsl:variable name="CARRIER-FACING-VLAN-ID" select="outerEncap"/><!--vlan id 200 bps -->
 			         <xsl:variable name="VLAN_ID" select="outerEncap"/>
                  <xsl:variable name="OLD_VLAN_ID" select="oldVlanId"/>
                  <xsl:variable name="MTU" select="ipMTU"/>
                  <xsl:variable name="IP-V4-ADDRESS" select="ipAddress"/>
                  <xsl:variable name="IP-V4-MASK" select="subnetMask"/>
                  <xsl:variable name="isIPv6Selected" select="ipv6Peer"/>
                  <xsl:variable name="ipv6Address" select="ipv6Address"/>
                  <xsl:variable name="peerAS" select="peerAS"/>
                  <xsl:variable name="RD_ID" select="rd"/>
                  <xsl:variable name="IS_MVPN" select="mvpn"/>
                  <xsl:variable name="ssmIP" select="ssmIP"/>
                  <xsl:variable name="ssmIpMask" select="ssmIpMask"/>
                  <xsl:variable name="bgpNeighbourAddress" select="neighbourAddress"/>
                  <xsl:variable name="oldBGPNeighbourAddress" select="oldNeighbourAddress"/>
                  <xsl:variable name="neighbourSubnetMask" select="neighbourSubnetMask"/>
                  <xsl:variable name="med" select="med"/>
                  <xsl:variable name="localPref" select="localPref"/>
                  <xsl:variable name="bgpIPv6NeighAddress" select="ipv6NeighAddress"/>
                  <xsl:variable name="rpType" select="rpType"/>
                  <xsl:variable name="rpAddress" select="rpAddress"/>
                  <xsl:variable name="vendorType" select="vendorType"/>
                  <xsl:variable name="entityID" select="../entityID"/>
                  <xsl:variable name="deviceID" select="pedeviceId"/>
                  <xsl:variable name="port" select="Interface"/>
                  <!-- <xsl:variable name="port" select="'ge-0/3/4'"/>-->
   				   <xsl:variable name="speed" select="speed"/>
   				   <xsl:variable name="siteDesc" select="site"/>
                  <xsl:variable name="efRate" select="efRate"/>
                  <xsl:variable name="typeOfService" select="typeOfService"/>
                  <xsl:variable name="bwLimit" select="bwLimit"/>
                  <xsl:variable name="burstSize" select="burstSize"/>
                  <xsl:variable name="efService" select="efService"/>
                  <xsl:variable name="beService" select="beService"/>
                  <xsl:variable name="classifier" select="classifier"/>
                  <xsl:variable name="accessRate" select="accessRate"/>
                  <xsl:variable name="vpnRate" select="vpnRate"/>
                  <xsl:variable name="isAllAFSelected" select="isAllAFSelected"/>
                  <xsl:variable name="isAF1Selected" select="isAF1Selected"/>
                  <xsl:variable name="isAF2Selected" select="isAF2Selected"/>
                  <xsl:variable name="isAF3Selected" select="isAF3Selected"/>
                  
                  <xsl:variable name="AF1" select="af1"/>
                  <xsl:variable name="AF2" select="af2"/>
                  <xsl:variable name="AF3" select="af3"/>
                  <xsl:variable name="ipv6Peer" select="ipv6Peer"/>
                  <xsl:variable name="csId" select="csId"/>
                  <xsl:variable name="ciuName" select="ciuName"/>
                  <xsl:variable name="pathPreferences" select="pathPreferences"/>
                  <xsl:variable name="accessType" select="accessType"/>
                 
                  <xsl:variable name="serviceType" select="serviceType"/>
                  
                  <xsl:variable name="connectionType" select="connectionType"/>
                  <xsl:variable name="policyGroup" select="policyGroup"/>
                  <xsl:variable name="ciuLoopback" select="ciuLoopback"/>
                  <xsl:variable name="loopbackSubnetMask" select="'32'"/>
                  <xsl:variable name="ciuName" select="ciuName"/>
                  <xsl:variable name="ciuAlias" select="ciuAlias"/>
                  
                  <xsl:variable name="topology" select="topology"/>
                  <xsl:variable name="endPointType" select="endPointType"/>
                  <xsl:variable name="rtMesh" select="rtMesh"/>
                  <xsl:variable name="rtHub" select="rtHub"/>
                  <xsl:variable name="rtSpoke" select="rtSpoke"/>
                  <xsl:variable name="siteName" select="site"/>
                  <xsl:variable name="endPointServiceType" select="endPointServiceType"/>
                  <xsl:variable name="oldEndPointServiceType" select="oldEndPointServiceType"/>
                  <xsl:variable name="ipv6NextHOP" select="nextHOP"/>
                  
                  <xsl:variable name="oldAF1" select="oldAF1"/>
                  <xsl:variable name="oldAF2" select="oldAF2"/>
                  <xsl:variable name="oldAF3" select="oldAF3"/>
                  <xsl:variable name="oldAccessRate" select="oldAccessRate"/>
                  <xsl:variable name="oldAdminState" select="oldAdminState"/>
                  <xsl:variable name="oldAutoNegotiate" select="oldAutoNegotiate"/>
                  <xsl:variable name="oldClasifier" select="oldClasifier"/>
                  <xsl:variable name="oldEFRate" select="oldEFRate"/>
                  <xsl:variable name="oldEFService" select="oldEFService"/>
                  <xsl:variable name="oldVpnSpeed" select="oldVpnSpeed"/>
                  
                  
                  <xsl:variable name="ciuLoopbackAndSubnetMask">
                     <xsl:value-of select="concat($ciuLoopback, '/', $loopbackSubnetMask)"/>
                  </xsl:variable>
                  
                  <xsl:variable name="oldCiuLoopbackAddress" select="oldCiuLoopback"/>
                  <xsl:variable name="oldRT" select="oldRT"/>
                  <xsl:variable name="oldIPV4AddressAndMask" select="oldIPV4AddressAndMask"/>
                  <xsl:variable name="oldEndpointType" select="oldEndpointType"/>
                  
                  
                  <xsl:variable name="prefixListName">
                     <xsl:value-of select="concat($ciuLoopback, '/', $loopbackSubnetMask)"/>
                  </xsl:variable>
                  
                  <xsl:variable name="protocol">
                     <xsl:choose>
                        <xsl:when test="$IS_MVPN = 'true' and $isIPv6Selected = 'true'">
                           <xsl:value-of select="'MV6'"/>
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="'MV4'"/>
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                  <xsl:variable name="accessOptionConnectionType">
                     <xsl:choose>
                        <xsl:when test="$connectionType = 'RE Direct'">
                           <xsl:value-of select="'REDI'"/>
                        </xsl:when>
                        <xsl:when test="$connectionType = 'RE Dual'">
                           <xsl:value-of select="'REDU'"/>
                        </xsl:when>
                       
                        <xsl:otherwise>
                           
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                  <xsl:variable name="PEER_AS_RD">
                     <xsl:value-of select="concat($peerAS, ':', $RD_ID)"/>
                  </xsl:variable>
                  <xsl:variable name="RD_TYPE">
                     <xsl:value-of select="concat($AS_NUMBER, ':', $RD_ID)"/>
                  </xsl:variable>
                  
                  <xsl:variable name="IPv4AddressMask">
                     <xsl:value-of select="concat($IP-V4-ADDRESS, '/', $IP-V4-MASK)"/>
                  </xsl:variable>
                  <xsl:variable name="vrfCommunity">
                     <xsl:value-of select="concat('target:', $AS_NUMBER,':', $peerAS)"/> <!--peer As -->
                  </xsl:variable>
                  <xsl:variable name="ssmGroupRangeAndMask">
                     <xsl:value-of select="concat($ssmIP, '/', $ssmIpMask)"/>
                  </xsl:variable>
                  
                  <xsl:variable name="efRateUpperCase">
                     <xsl:value-of select="translate($efRate, $smallcase, $uppercase)" />
                  </xsl:variable>
                
                  <xsl:variable name="interfaceName">
                     <xsl:value-of select="concat($port, '.', $VLAN_ID)" />
                  </xsl:variable>  
                  
                 <xsl:variable name="routingInstanceBGPDescription">
                     <xsl:value-of select="concat($csId, '.', $ciuName, '.', $vpnName, '.', $pathPreferences)" />
                  </xsl:variable>
                  <!--
                  <xsl:variable name="accessRateDescription">
                     <xsl:value-of select="concat('[',$accessRate,']', 'M')" />
                  </xsl:variable>
                  -->
                  <xsl:variable name="vpnSpeed">
                     <xsl:value-of select="concat('V', $vpnRate)" />
                  </xsl:variable>
                                  
                  <xsl:variable name="interfaceUnitDescription">
                     <xsl:value-of select="concat($csId,  '.', $ciuName, '.', $accessRate)" />
                  </xsl:variable>
                  
                  <xsl:variable name="trafic-control-profile-name">
                     <xsl:choose>
                        <xsl:when test="$efService = 'true'">
                           <xsl:value-of select="concat('L3VPN','_',  $accessRate,'_', 'EF', '_', $AF3,'_',  $AF2,'_',  $AF1)" />
                        </xsl:when>
                        <xsl:when test="$efService = 'false'">
                           <xsl:value-of select="concat('L3VPN','_',  $accessRate,'_', 'NOEF', '_', $AF3,'_',  $AF2,'_',  $AF1)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('L3VPN','_',  $accessRate,'_', 'NOEF', '_', $AF3,'_',  $AF2,'_',  $AF1)" />
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                  <xsl:variable name="trafic-control-profile-name-rem">
                     <xsl:choose>
                        <xsl:when test="$efService = 'true'">
                           <xsl:value-of select="concat('L3VPN','_',  $accessRate,'_', 'EF', '_', $AF3,'_',  $AF2,'_',  $AF1,'_',  'REM')" />
                        </xsl:when>
                        <xsl:when test="$efService = 'false'">
                           <xsl:value-of select="concat('L3VPN','_',  $accessRate,'_', 'NOEF', '_', $AF3,'_',  $AF2,'_',  $AF1,'_',  'REM')" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('L3VPN','_',  $accessRate,'_', 'NOEF', '_', $AF3,'_',  $AF2,'_',  $AF1,'_',  'REM')" />
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                  <xsl:variable name="interface-description">
                     <xsl:choose>
                        <xsl:when test="$efService = 'true'">
                           <xsl:value-of select="concat($accessType, '.', $accessRate, '.', $endPointServiceType, '.', $application, '.', $protocol, '.', $vpnName, '.', $pathPreferences, '.', $vpnSpeed, '.', $architecture, '.', $accessOptionConnectionType, '.', $policyGroup, '.', $operationalMode, '.', $ciuAlias)" />
                        </xsl:when>
                        <xsl:when test="$efService = 'false'">
                           <xsl:value-of select="concat($accessType, '.', $accessRate, '.', $endPointServiceType, '.', $application, '.', $protocol, '.', $vpnName, '.', $pathPreferences, '.', $vpnSpeed, '.', $architecture, '.', $accessOptionConnectionType, '.', $policyGroup, '.', $operationalMode, '.', $ciuAlias)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat($accessType, '.', $accessRate, '.', $endPointServiceType, '.', $application, '.', $protocol, '.', $vpnName, '.', $pathPreferences, '.', $vpnSpeed, '.', $architecture, '.', $accessOptionConnectionType, '.', $policyGroup, '.', $operationalMode, '.', $ciuAlias)" />
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                  <xsl:variable name="sooExportPolicyName">
                     <xsl:value-of select="concat($FILLER, '_',$SOO, '_',  $ciuName, '_', $vpnName)" />
                  </xsl:variable>
                  
                  <xsl:variable name="sooImportPolicyCommunityName">
                     <xsl:value-of select="concat($SOO, '_',  $ciuName, '_', $vpnName)" />
                  </xsl:variable>
                  
                  <xsl:variable name="sooImportPolicyName">
                     <xsl:value-of select="concat($SET, '_', $LP, '_', $SOO, '_',  $ciuName, '_', $vpnName)" />
                  </xsl:variable>
                  
                  <xsl:variable name="sooExportPolicyCommunityName">
                     <xsl:value-of select="concat($SOO,'_',  $ciuName, '_', $vpnName)" />
                  </xsl:variable>
                
                  <xsl:variable name="schedularNameAF1">
                     <xsl:value-of select="concat('AF','_',  $AF1)" />
                  </xsl:variable>
                  
                  <xsl:variable name="schedularNameAF2">
                     <xsl:value-of select="concat('AF','_',  $AF2)" />
                  </xsl:variable>
                  
                  <xsl:variable name="schedularNameAF3">
                     <xsl:value-of select="concat('AF','_',  $AF3)" />
                  </xsl:variable>
                  
                  <xsl:variable name="schedularMapNameEF">
                     <xsl:value-of select="concat('SM','_',  'EF','_',  $AF3,'_',  $AF2,'_',  $AF1)" />
                  </xsl:variable>
                  
                  <xsl:variable name="schedularMapNameNOEF">
                     <xsl:value-of select="concat('SM','_',  'NOEF','_',  $AF3,'_',  $AF2,'_',  $AF1)" />
                  </xsl:variable>
                  
                  <xsl:variable name="schedularMapNameEF-REM">
                     <xsl:value-of select="concat('SM','_',  'EF','_',  $AF3,'_',  $AF2,'_',  $AF1,'_',  'REM')" />
                  </xsl:variable>
                  
                  <xsl:variable name="schedularMapNameNOEF-REM">
                     <xsl:value-of select="concat('SM','_',  'NOEF','_',  $AF3,'_',  $AF2,'_',  $AF1,'_',  'REM')" />
                  </xsl:variable>
                  
                  <xsl:variable name="trafic-control-profile-name">
                     <xsl:choose>
                        <xsl:when test="$efService = 'true'">
                           <xsl:value-of select="concat('L3VPN','_',  $accessRate,'_', 'EF', '_', $AF3,'_',  $AF2,'_',  $AF1)" />
                        </xsl:when>
                        <xsl:when test="$efService = 'false'">
                           <xsl:value-of select="concat('L3VPN','_',  $accessRate,'_', 'NOEF', '_', $AF3,'_',  $AF2,'_',  $AF1)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('L3VPN','_',  $accessRate,'_', 'NOEF', '_', $AF3,'_',  $AF2,'_',  $AF1)" />
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                  <xsl:variable name="trafic-control-profile-name-rem">
                     <xsl:choose>
                        <xsl:when test="$efService = 'true'">
                           <xsl:value-of select="concat('L3VPN','_',  $accessRate,'_', 'EF', '_', $AF3,'_',  $AF2,'_',  $AF1,'_',  'REM')" />
                        </xsl:when>
                        <xsl:when test="$efService = 'false'">
                           <xsl:value-of select="concat('L3VPN','_',  $accessRate,'_', 'NOEF', '_', $AF3,'_',  $AF2,'_',  $AF1,'_',  'REM')" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('L3VPN','_',  $accessRate,'_', 'NOEF', '_', $AF3,'_',  $AF2,'_',  $AF1,'_',  'REM')" />
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                  <xsl:variable name="topologyType">
                     <xsl:choose>
                        <xsl:when test="$topology = 'Full Mesh'">
                           <xsl:value-of select="$MSH"/>
                        </xsl:when>
                        <xsl:when test="$topology = 'Hub &amp; Spoke' and $endPointType = 'Hub'">
                           <xsl:value-of select="$HUB"/>
                        </xsl:when>
                        <xsl:when test="$topology = 'Hub &amp; Spoke' and $endPointType = 'Spoke'">
                           <xsl:value-of select="$SPK"/>
                        </xsl:when>
                        <xsl:otherwise>
                          
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                  <xsl:variable name="routingInstanceDescription">
                     <xsl:value-of select="concat($siteName, '_', $vpnName, '_', $topologyType)" />
                  </xsl:variable>
                 
                  <xsl:variable name="mgmtRTCommunityName">
                     <xsl:value-of select="concat($RT ,'_', $NMC-MGMT-770)" />
                  </xsl:variable>
                  
                  <xsl:variable name="vrfName">
                     <xsl:value-of select="concat($VPRN , $vpnName)" />
                  </xsl:variable>
                  
                  <xsl:variable name="rtPolicyCommunityName">
                     <xsl:value-of select="concat($RT, '_' ,  $vpnName, '_', $topologyType)" />
                  </xsl:variable>
                  
                  <xsl:variable name="rtCommunityName">
                     <xsl:value-of select="concat($RT, '_' ,  $vpnName, '_VPRN', $SERVICE_ID, '_', $topologyType)" />
                  </xsl:variable>
                  
                  <xsl:variable name="rtPortPolicyCommunityName">
                     <xsl:value-of select="concat($RT,  '_',  $vpnName, '_', $topologyType)" /><!--'_' ,$port,-->
                  </xsl:variable>
                  
                  <xsl:variable name="sooCommunityName">
                     <xsl:value-of select="concat($SOO,'_' ,$ciuName, '_', $vpnName)" />  <!-- twcb to ciuName-->
                  </xsl:variable>
                  
                  <xsl:variable name="targetCommunityMemberMesh">
                     <xsl:value-of select="concat($TARGET,':' ,$AS_NUMBER, ':', $rtMesh)" />
                  </xsl:variable>
                  
                  <xsl:variable name="targetCommunityMemberForHub">
                     <xsl:value-of select="concat($TARGET,':' ,$AS_NUMBER, ':', $rtHub)" />
                  </xsl:variable>
                  <xsl:variable name="targetCommunityMemberForSpoke">
                     <xsl:value-of select="concat($TARGET,':' ,$AS_NUMBER, ':', $rtSpoke)" />
                  </xsl:variable>
                  
                  <xsl:variable name="targetCommunityMember">
                     <xsl:value-of select="concat($TARGET,':' ,$AS_NUMBER, ':', $rtMesh)" />
                  </xsl:variable>
                  
                  <xsl:variable name="deleteTargetCommunityMember">
                     <xsl:value-of select="concat($TARGET,':' ,$AS_NUMBER, ':', $oldRT)" />
                  </xsl:variable>
                  
                  <xsl:variable name="targetCommunityMemberForHubAndSpoke">
                     <xsl:value-of select="concat($TARGET,':' ,$AS_NUMBER, ':', $rtMesh)" />
                  </xsl:variable>
                  
                 <xsl:variable name="originCommunityMember">
                     <xsl:value-of select="concat($ORIGIN,':' ,$RD_ID, ':', $csId)" />
                  </xsl:variable>
                  
                  <xsl:variable name="deleteOriginCommunityMember">
                     <xsl:value-of select="concat($ORIGIN,':' ,$peerAS, ':', $oldRT)" />
                  </xsl:variable>
                  
                  <xsl:variable name="prefixMgmtName">
                     <xsl:value-of select="concat($vpnName, '_', $LB, '_', $MGMT)" />
                  </xsl:variable>
                  <xsl:variable name="TML_CML_TermName">
                     <xsl:value-of select="concat($ciuName, '_', $vpnName)" />
                  </xsl:variable>
                  <xsl:variable name="prefixPerfName">
                     <xsl:value-of select="concat($ciuName, '_',$vpnName,  '_', $PERF)" />
                  </xsl:variable>
                 
                  <xsl:variable name="VRFImportPolicyName">
                     <xsl:value-of select="concat($vpnName,  '_VPRN',$SERVICE_ID,'_', $topologyType, '_', $IMP)" />
                  </xsl:variable>
                  
                  <xsl:variable name="VRFExportPolicyName">
                     <xsl:value-of select="concat($vpnName,  '_VPRN',$SERVICE_ID,'_', $topologyType, '_', $EXP)" />
                  </xsl:variable>
                  
                <xsl:variable name="BGP_TML3_CML3_ImportPolicyName">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'Primary'">
                           <xsl:value-of select="concat('SET_LP_','P', '_' ,'SOO','_',$ciuName,'_' ,$vpnName)" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'Secondary'">
                           <xsl:value-of select="concat('SET_LP_','S', '_' ,'SOO','_',$ciuName,'_' ,$vpnName)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('SET_LP_','S', '_' ,'SOO','_',$ciuName,'_' ,$vpnName)" />
                        </xsl:otherwise>
                     </xsl:choose>
                     <!--<xsl:value-of select="concat('SET_LP_',$pathPreferences, '_' ,'SOO','_',$ciuName,'_' ,$vpnName)" />-->
                  </xsl:variable>
                  
                  <xsl:variable name="BGP_TML3_ExportPolicyName">
                     <xsl:value-of select="concat('FILTER_SOO_',$ciuName, '_', $vpnName)" />
                  </xsl:variable>
                  
                  <xsl:variable name="BGP_CML3_ExportPolicyName">
                     <xsl:value-of select="concat($ciuName,'_', $vpnName, '_CML3_EXP')" />
                  </xsl:variable>
                  
                  <xsl:variable name="fullMeshImportSiteTermName">
                     <xsl:value-of select="concat($port,  '_', $vpnName)" />
                  </xsl:variable>
                  <xsl:variable name="perfTermName">
                     <xsl:value-of select="concat($vpnName,  '_', $PERF)" />
                  </xsl:variable>
                  <xsl:variable name="lbMgmtPrefixList">
                     <xsl:value-of select="concat($vpnName,  '_', $LB-MGMT)" />
                  </xsl:variable>
                  
                  <xsl:variable name="policyStatementPortVrfTopDir">
                     <xsl:value-of select="concat($port, '_',$vpnName,  '_', $topologyType,  '_', $IMP)" />
                  </xsl:variable>
                 
                  <xsl:variable name="loopBackAddressandMask">
                     <xsl:value-of select="concat($prefixListName,  '/', $loopbackSubnetMask)" />
                  </xsl:variable>
                  
                  <xsl:variable name="policerName">
                     <xsl:value-of select="concat($efRate,  '_', 'LIMIT')" />
                  </xsl:variable>
                  
                  <xsl:variable name="shapingRate">
                     <xsl:choose>
                        <xsl:when test="$qosType = 'QoS per Access'">
                           <xsl:value-of select="$accessRate" />
                        </xsl:when>
                        <xsl:when test="$qosType = 'QoS per VPN'">
                           <xsl:value-of select="$vpnRate" />
                        </xsl:when>
                        
                        <xsl:otherwise>
                           <xsl:value-of select="$vpnRate" />
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                  <!-- Check if the scheduler 1 exists. if count 1 then its exists and use the same to the reference whereever it is required-->
                  
                  <xsl:variable name="scheduler1_XPath">
                     <xsl:value-of select="concat('configuration/class-of-service/schedulers[name=&quot;', $schedularNameAF1, '&quot;]')"/>
                  </xsl:variable> 
                 
                  <xsl:variable name="scheduler1Search_NodeSet" select="ServiceActivationUtils:getSubTreeFromInventory($deviceID, $vendorType, $INVENTORY_TYPE_CONFIGURATION, $scheduler1_XPath)"/>
                  
                  <xsl:variable name="scheduler1Search_Count">
                     <xsl:value-of select="count($scheduler1Search_NodeSet)"/>
                  </xsl:variable>
                  <!-- scheduler 1 check finist-->
                  
                  <!-- Check if the scheduler 2 exists. if count 1 then its exists and use the same to the reference whereever it is required-->
                  
                  <xsl:variable name="scheduler2_XPath">
                     <xsl:value-of select="concat('configuration/class-of-service/schedulers[name=&quot;', $schedularNameAF2, '&quot;]')"/>
                  </xsl:variable> 
                  
                  <xsl:variable name="scheduler2Search_NodeSet" select="ServiceActivationUtils:getSubTreeFromInventory($deviceID, $vendorType, $INVENTORY_TYPE_CONFIGURATION, $scheduler2_XPath)"/>
                  
                  <xsl:variable name="scheduler2Search_Count">
                     <xsl:value-of select="count($scheduler2Search_NodeSet)"/>
                  </xsl:variable>
                  
                  <!-- Check if the scheduler 3 exists. if count 1 then its exists and use the same to the reference whereever it is required-->
                  
                  <xsl:variable name="scheduler3_XPath">
                     <xsl:value-of select="concat('configuration/class-of-service/schedulers[name=&quot;', $schedularNameAF3, '&quot;]')"/>
                  </xsl:variable> 
                  
                  <xsl:variable name="scheduler3Search_NodeSet" select="ServiceActivationUtils:getSubTreeFromInventory($deviceID, $vendorType, $INVENTORY_TYPE_CONFIGURATION, $scheduler3_XPath)"/>
                  
                  <xsl:variable name="scheduler3Search_Count">
                     <xsl:value-of select="count($scheduler3Search_NodeSet)"/>
                  </xsl:variable>
                  
                  <!-- search for the scheduler map 1-->
                  <xsl:variable name="schedulerMap_XPath">
                     <xsl:value-of select="concat('configuration/class-of-service/scheduler-maps[name=&quot;', $schedularMapNameEF, '&quot;]')"/>
                  </xsl:variable> 
                  
                  <xsl:variable name="schedulerMapSearch_NodeSet" select="ServiceActivationUtils:getSubTreeFromInventory($deviceID, $vendorType, $INVENTORY_TYPE_CONFIGURATION, $schedulerMap_XPath)"/>
                  
                  <xsl:variable name="schedulerMapSearch_Count">
                     <xsl:value-of select="count($schedulerMapSearch_NodeSet)"/>
                  </xsl:variable>
                  
                  <!-- search for the scheduler map NOEF -->
                  <xsl:variable name="schedulerMapNOEF_XPath">
                     <xsl:value-of select="concat('configuration/class-of-service/scheduler-maps[name=&quot;', $schedularMapNameNOEF, '&quot;]')"/>
                  </xsl:variable> 
                  
                  <xsl:variable name="schedulerMapNOEFSearch_NodeSet" select="ServiceActivationUtils:getSubTreeFromInventory($deviceID, $vendorType, $INVENTORY_TYPE_CONFIGURATION, $schedulerMapNOEF_XPath)"/>
                  
                  <xsl:variable name="schedulerMapNOEFSearch_Count">
                     <xsl:value-of select="count($schedulerMapNOEFSearch_NodeSet)"/>
                  </xsl:variable>
                  
                  <!-- search for the scheduler map 2-->
                  <xsl:variable name="schedulerMapEF_REM_XPath">
                     <xsl:value-of select="concat('configuration/class-of-service/scheduler-maps[name=&quot;', $schedularMapNameEF-REM, '&quot;]')"/>
                  </xsl:variable> 
                  
                  <xsl:variable name="schedulerMapEF_REM_Search_NodeSet" select="ServiceActivationUtils:getSubTreeFromInventory($deviceID, $vendorType, $INVENTORY_TYPE_CONFIGURATION, $schedulerMapEF_REM_XPath)"/>
                  
                  <xsl:variable name="schedulerMapEF_REM_Search_Count">
                     <xsl:value-of select="count($schedulerMapEF_REM_Search_NodeSet)"/>
                  </xsl:variable>
                  
                  <!-- search for the scheduler map 3-->
                  <xsl:variable name="schedulerMapNOEF_REM_XPath">
                     <xsl:value-of select="concat('configuration/class-of-service/scheduler-maps[name=&quot;', $schedularMapNameNOEF-REM, '&quot;]')"/>
                  </xsl:variable> 
                  
                  <xsl:variable name="schedulerMapNOEF_REM_Search_NodeSet" select="ServiceActivationUtils:getSubTreeFromInventory($deviceID, $vendorType, $INVENTORY_TYPE_CONFIGURATION, $schedulerMapNOEF_REM_XPath)"/>
                  
                  <xsl:variable name="schedulerMapNOEF_REM_Search_Count">
                     <xsl:value-of select="count($schedulerMapNOEF_REM_Search_NodeSet)"/>
                  </xsl:variable>
                  
                  <!-- search for the trafic control profile name-->
                  <xsl:variable name="traficControlProfile_XPath">
                     <xsl:value-of select="concat('configuration/class-of-service/traffic-control-profiles[name=&quot;', $trafic-control-profile-name, '&quot;]')"/>
                  </xsl:variable> 
                  
                  <xsl:variable name="traficControlProfileSearch_NodeSet" select="ServiceActivationUtils:getSubTreeFromInventory($deviceID, $vendorType, $INVENTORY_TYPE_CONFIGURATION, $traficControlProfile_XPath)"/>
                  
                  <xsl:variable name="traficControlProfileSearch_Count">
                     <xsl:value-of select="count($traficControlProfileSearch_NodeSet)"/>
                  </xsl:variable>
                  
                  <!-- search for the trafic control profile name rem-->
                  <xsl:variable name="traficControlProfileRem_XPath">
                     <xsl:value-of select="concat('configuration/class-of-service/traffic-control-profiles[name=&quot;', $trafic-control-profile-name-rem, '&quot;]')"/>
                  </xsl:variable> 
                  
                  <xsl:variable name="traficControlProfileRemSearch_NodeSet" select="ServiceActivationUtils:getSubTreeFromInventory($deviceID, $vendorType, $INVENTORY_TYPE_CONFIGURATION, $traficControlProfileRem_XPath)"/>
                  
                  <xsl:variable name="traficControlProfileRemSearch_Count">
                     <xsl:value-of select="count($traficControlProfileRemSearch_NodeSet)"/>
                  </xsl:variable>
                  
                  <xsl:variable name="FromPremiumFilterName">
                     <xsl:choose>
                        <xsl:when test="$flowSampling = 'true'">
                           <xsl:value-of select="concat('FROM_CML3_PREMIUM',  '_',  $efRate, '_', 'SAMPLING')" />
                        </xsl:when>
                        <xsl:when test="$flowSampling = 'false'">
                           <xsl:value-of select="concat('FROM_CML3_PREMIUM',  '_',  $efRate)" />
                        </xsl:when>
                        
                        <xsl:otherwise>
                           <xsl:value-of select="concat('FROM_CML3_PREMIUM',  '_',  $efRate)" />
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                  <xsl:variable name="FromPremiumFilterNameIP6">
                     <xsl:choose>
                        <xsl:when test="$flowSampling = 'true'">
                           <xsl:value-of select="concat('FROM_CML3_PREMIUM',  '_',  $efRate, '_', 'SAMPLING', '_', 'IPV6')" />
                        </xsl:when>
                        <xsl:when test="$flowSampling = 'false'">
                           <xsl:value-of select="concat('FROM_CML3_PREMIUM',  '_',  $efRate, '_', 'IPV6')" />
                        </xsl:when>
                         <xsl:otherwise>
                            <xsl:value-of select="concat('FROM_CML3_PREMIUM',  '_',  $efRate, '_', 'IPV6')" />
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                  <xsl:variable name="ToPremiumFilterName">
                     <xsl:choose>
                        <xsl:when test="$flowSampling = 'true'">
                           <xsl:value-of select="concat('OUT_TO_PREMIUM',  '_',  $efRate, '_', 'SAMPLING')" />
                        </xsl:when>
                        <xsl:when test="$flowSampling = 'false'">
                           <xsl:value-of select="concat('OUT_TO_PREMIUM',  '_',  $efRate)" />
                        </xsl:when>
                        
                        <xsl:otherwise>
                           <xsl:value-of select="concat('OUT_TO_PREMIUM',  '_',  $efRate)" />
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                  <!-- search for the frompremiun filter-->
                  <xsl:variable name="FromPremiumFilterName_XPath">
                     <xsl:value-of select="concat('configuration/firewall/family/inet/filter[name=&quot;', $FromPremiumFilterName, '&quot;]')"/>
                  </xsl:variable> 
                  
                  <xsl:variable name="FromPremiumFilterNameSearch_NodeSet" select="ServiceActivationUtils:getSubTreeFromInventory($deviceID, $vendorType, $INVENTORY_TYPE_CONFIGURATION, $FromPremiumFilterName_XPath)"/>
                  
                  <xsl:variable name="FromPremiumFilterNameSearch_Count">
                     <xsl:value-of select="count($FromPremiumFilterNameSearch_NodeSet)"/>
                  </xsl:variable>
                  
                  <!-- search for the to premiun filter-->
                  <xsl:variable name="ToPremiumFilterName_XPath">
                     <xsl:value-of select="concat('configuration/firewall/family/inet/filter[name=&quot;', $ToPremiumFilterName, '&quot;]')"/>
                  </xsl:variable> 
                  
                  <xsl:variable name="ToPremiumFilterNameSearch_NodeSet" select="ServiceActivationUtils:getSubTreeFromInventory($deviceID, $vendorType, $INVENTORY_TYPE_CONFIGURATION, $ToPremiumFilterName_XPath)"/>
                  
                  <xsl:variable name="ToPremiumFilterNameSearch_Count">
                     <xsl:value-of select="count($ToPremiumFilterNameSearch_NodeSet)"/>
                  </xsl:variable>
                  
                  <!-- DEVICE-LEVEL DERIVATIONS - END -->
               
               
                  <!-- "ADD" CONFIGLET ASSEMBLY - BEGIN -->
                  
                  <deviceConfiguration>
                     <entityID>
                        <xsl:value-of select="$entityID"/>
                    </entityID>
                     <configuration>               
                        <xsl:choose>
                           <xsl:when test="$recordOPType = 'MODIFY'">
                              
                              <interfaces>
                                  <interface>
                                     <name>
                                        <!-- <xsl:value-of select="$INTERFACE_NAME"/> -->
                                        <xsl:value-of select="$port"/>
                                     </name>
                                     <description>
                                        <xsl:value-of select="$interface-description"/>
                                     </description>
                                     <!-- UNIT SUB-STANZA -->
                                     <xsl:if test="$OLD_VLAN_ID != $VLAN_ID">
                                       <unit operation="delete">
                                          <name>
                                             <xsl:value-of select="$OLD_VLAN_ID"/>
                                          </name>	
                                       </unit>
                                     </xsl:if>
                                      <xsl:if test="$IPv4AddressMask != $oldIPV4AddressAndMask">
                                         <unit>
                                            <name>
                                               <xsl:value-of select="$OLD_VLAN_ID"/>
                                            </name>	
                                           <family>
                                              <inet>
                                                 <!-- address comes from IPv4 Address/Mask -->
                                                 <address operation="delete">
                                                <name>
                                                   <xsl:value-of select="$oldIPV4AddressAndMask"/>
                                                </name>
                                             </address>
                                              </inet>
                                           </family>
                                         </unit>
                                        </xsl:if>
                                  </interface>
                               </interfaces>
                             
                             
                              <interfaces>
                                 <xsl:if test="$endPointServiceType = 'TML3'">
                                    <interface>
                                       <name>
                                          <xsl:value-of select="$port"/>
                                       </name>
                                       <description>
                                          <xsl:value-of select="$interface-description"/>
                                       </description>
                                       <unit>
                                          <name>
                                             <xsl:value-of select="$VLAN_ID"/>
                                          </name>
                                          <description>
                                             <xsl:value-of select="$interfaceUnitDescription"/>
                                          </description><!-- interface desc -->
                                          <!-- here is the VLAN id -->
                                          <vlan-id>
                                             <xsl:value-of select="$VLAN_ID"/>
                                          </vlan-id>
                                          <family>
                                             <inet>
                                                <!-- address comes from IPv4 Address/Mask -->
                                                <address>
                                                 <name>
                                                    <xsl:value-of select="$IPv4AddressMask"/>
                                                 </name>
                                             </address>
                                                <filter>
                                                   <output>
                                                      <filter-name>PRIORITIZE_MGT_TRAFFIC</filter-name>
                                                   </output>
                                                </filter>
                                             </inet>
                                          </family>
                                       </unit>
                                    </interface>
                                 </xsl:if>
                                 <xsl:if test="$endPointServiceType = 'CML3'">
                                    <interface>
                                       <name>
                                          <xsl:value-of select="$port"/>
                                       </name>
                                       <description>
                                          <xsl:value-of select="$interface-description"/>
                                       </description>
                                       <unit>
                                          <name>
                                             <xsl:value-of select="$VLAN_ID"/>
                                          </name>
                                          <description>
                                             <xsl:value-of select="$interfaceUnitDescription"/>
                                          </description>
                                          <!-- here is the VLAN id -->
                                          <vlan-id>
                                             <xsl:value-of select="$VLAN_ID"/>
                                          </vlan-id>
                                          <family>
                                             <inet>
                                                <!-- address comes from IPv4 Address/Mask -->
                                                <address>
                                                 <name>
                                                    <xsl:value-of select="$IPv4AddressMask"/>
                                                 </name>
                                             </address>
                                                <filter>
                                                   <input>
                                                      <filter-name>
                                                         <xsl:if test="$flowSampling = 'true'">
                                                            <xsl:value-of select="concat('FROM_CML3_PREMIUM',  '_',  $efRate, '_', 'SAMPLING')" />
                                                         </xsl:if>
                                                         <xsl:if test="$flowSampling = 'false'">
                                                            <xsl:value-of select="concat('FROM_CML3_PREMIUM',  '_',  $efRate)" />
                                                         </xsl:if>
                                                         <!--FROM_CML3_PREMIUM_{Access Rate}{_SAMPLING}-->
                                                      </filter-name>
                                                   </input>
                                                   <output>
                                                      <filter-name>
                                                         <xsl:if test="$flowSampling = 'true'">
                                                            <xsl:value-of select="concat('OUT_TO_PREMIUM',  '_',  $efRate, '_', 'SAMPLING')" /><!--OUT_TO_PREMIUM_{Access Rate}{_SAMPLING}-->
                                                         </xsl:if>
                                                         <xsl:if test="$flowSampling = 'false'">
                                                            <xsl:value-of select="concat('OUT_TO_PREMIUM',  '_',  $efRate)" /><!--OUT_TO_PREMIUM_{Access Rate}{_SAMPLING}-->
                                                         </xsl:if>
                                                      </filter-name>
                                                   </output>
                                                </filter>
                                             </inet>
                                           
                                             <!--IPV6 filter is only used when IPv6 is selected from the UI.-->
                                        
                                             <xsl:if test="$isIPv6Selected = 'true'">
                                                <inet6>
                                                   <address>
                                                      <name>
                                                            <xsl:value-of select="$ipv6Address"/>
                                                      </name>
                                                   </address>
                                                   <filter>
                                                      <input>
                                                         <filter-name>
                                                            <xsl:if test="$flowSampling = 'true'">
                                                               <xsl:value-of select="concat('FROM_CML3_PREMIUM',  '_',  $accessRate, '_', 'SAMPLING', 'IPV6')" />
                                                            </xsl:if>
                                                            <xsl:if test="$flowSampling = 'false'">
                                                               <xsl:value-of select="concat('FROM_CML3_PREMIUM',  '_',  $accessRate, 'IPV6')" />
                                                            </xsl:if>
                                                            <!--FROM_CML3_PREMIUM_{Access Rate}{_SAMPLING}_IPV6-->
                                                         </filter-name>
                                                      </input>
                                                      <output>
                                                         <filter-name>
                                                            <xsl:if test="$flowSampling = 'true'">
                                                               <xsl:value-of select="concat('OUT_TO_PREMIUM',  '_',  $accessRate, '_', 'SAMPLING', 'IPV6')" />
                                                            </xsl:if>
                                                            <xsl:if test="$flowSampling = 'false'">
                                                               <xsl:value-of select="concat('OUT_TO_PREMIUM',  '_',  $accessRate, 'IPV6')" />
                                                            </xsl:if>
                                                            <!--OUT_TO_PREMIUM_{Access Rate}{_SAMPLING}_IPV6-->
                                                         </filter-name>
                                                      </output>
                                                   </filter>
                                                </inet6>
                                             </xsl:if>
                                          </family>
                                       </unit>
                                    </interface>
                                 </xsl:if>
                              </interfaces>
                           
                              <!-- CLASS-OF-POLICY START -->
                              
                          <policy-options>
                              <!-- L3VPN VRF Policy-->
                           
                           <!-- Used for all topologies -->
                           <xsl:if test="$topology = 'Full Mesh'">
                             <community>
                                  <name>
                                     <xsl:value-of select="$rtCommunityName" />
                                  </name>
                                  
                                  <members>
                                        <xsl:value-of select="$targetCommunityMemberMesh" />
                                  </members>
                                
                               </community>
                           </xsl:if>
                           
                             <xsl:if test="$topology = 'Hub &amp; Spoke'"> <!-- and $topologyType = 'HUB' -->
                              <community>
                                 <name>
                                    <xsl:value-of select="concat($RT, '_' ,  $vpnName, '_VPRN', $SERVICE_ID, '_', 'HUB')" />
                                  </name>
                                 
                                 <members>
                                      <xsl:value-of select="$targetCommunityMemberForHub" />
                                 </members>
                                 
                              </community>
                           </xsl:if>
                             <xsl:if test="$topology = 'Hub &amp; Spoke'"> <!--  and $topologyType = 'SPK' -->
                            <community>
                                 <name>
                                    <xsl:value-of select="concat($RT, '_' ,  $vpnName, '_VPRN', $SERVICE_ID, '_', 'SPK')" />
                                 </name>
                                <members>
                                    <xsl:value-of select="$targetCommunityMemberForSpoke" />
                                 </members>
                              </community>
                           </xsl:if>
                           
                           <!-- Site of Origin (always configured) -->
                           <community>
                              <!-- name comes from SOO_<CIU_Name>_<VRF_Name> -->
                              <name>
                                 <xsl:value-of select="$sooCommunityName" />
                              </name>
                              <!-- members comes from origin:<ID>:<Sequence Number> -->
                              <members>
                                 <xsl:value-of select="$originCommunityMember" />
                              </members>
                           </community>
                           
                           <xsl:if test="$endPointServiceType = 'TML3'">
                              <prefix-list>
                                 <!-- prefix-list for the CIU must be created always -
                                    MGMT loopback = <VRF Name>_LB_MGMT -->
                                   
                                 <name>
                                    <xsl:value-of select="$prefixMgmtName" />
                                 </name>
                                 <xsl:if test="$endPointServiceType = 'TML3'">
                                    <prefix-list-item>
                                       <!-- IP address is the CIU loopback address -->
                                       <name>
                                          <xsl:value-of select="$ciuLoopbackAndSubnetMask"/>
                                       </name>
                                    </prefix-list-item>
                                 </xsl:if>
                              </prefix-list>
                              <prefix-list>
                                 <!-- prefix-list for the CIU must be created always -
                                     MGMT loopback = <VRF Name>_LB_MGMT-->
   
                                 <name>
                                    <xsl:value-of select="$prefixPerfName" />
                                 </name>
                                 <xsl:if test="$endPointServiceType = 'TML3'">
                                    <prefix-list-item>
                                       <!-- IP address is the CIU loopback address -->
                                       <name>
                                          <xsl:value-of select="$ciuLoopbackAndSubnetMask"/>
                                       </name>
                                    </prefix-list-item>
                                 </xsl:if>
                              </prefix-list>
                            </xsl:if> 
                           
                           <!-- VRF Import Policy -->
                           
                           <policy-statement>
                              <name>
                                 <xsl:value-of select="$VRFImportPolicyName"/><!-- $vpnName_VPRN$serviceId_$topology_IMP -->
                              </name>
                              
                              <!-- THIS TERM IS TML3 ONLY -->
                              <xsl:if test="$endPointServiceType = 'TML3'">
                                 <term>
                                    <!-- this is a fixed name for the CIU Management VRF  -->
                                    <name>NMC_MGMT_770</name>
                                    <from>
                                       <protocol>bgp</protocol>
                                       <!-- this is a pre-existing community for the CIU Management VRF  -->
                                       <community>RT_NMC_MGMT_770</community>
                                    </from>
                                    <then>
                                       <accept/>
                                    </then>
                                 </term>
                              
                                 <!-- THIS TERM IS TML3 ONLY -->
                                 
                                 <term>
                                    <!-- this is a fixed name  -->
                                    <name>BRIX_import</name>
                                    <from>
                                       <protocol>bgp</protocol>
                                       <!-- this is a pre-existing community for the CIU Management VRF  -->
                                       <community>RT_BRIX</community>
                                    </from>
                                    <then>
                                       <accept/>
                                    </then>
                                 </term>
                                 
                                 <!-- THIS TERM IS TML3 ONLY -->
                                 
                                 <term>
                                    <!-- this is a fixed name  -->
                                    <name>PERF_HUB</name>
                                    <from>
                                       <protocol>bgp</protocol>
                                       <!-- this is a pre-existing community for the CIU Management VRF  -->
                                       <community>RT_PERF_HUB</community>
                                    </from>
                                    <then>
                                       <accept/>
                                    </then>
                                 </term>
                              </xsl:if>
                              
                              <!-- THIS TERM IS TML3 AND CML3 -->
                              <xsl:if test="$endPointServiceType = 'TML3' or $endPointServiceType = 'CML3'">
                                    <xsl:if test="$topology = 'Full Mesh'">
                                       <term>
                                          <name>
                                             <xsl:value-of select="$vpnName"/><!--$vpnName--></name>
                                          <from>
                                             <protocol>bgp</protocol>
                                             <community>
                                                  <xsl:value-of select="concat($RT, '_' ,  $vpnName, '_VPRN', $SERVICE_ID, '_', 'MSH')" />
                                             </community>
                                          </from>
                                          <then>
                                             <accept/>
                                          </then>
                                       </term>
                                    </xsl:if>
                                 <xsl:if test="$topology = 'Hub &amp; Spoke' and $topologyType = 'SPK'">
                                       <term>
                                          <name>
                                             <xsl:value-of select="$vpnName"/><!--$vpnName--></name>
                                          <from>
                                             <protocol>bgp</protocol>
                                             <community>
                                                <xsl:value-of select="concat($RT, '_' ,  $vpnName, '_VPRN', $SERVICE_ID, '_', 'HUB')" />
                                              </community>
                                          </from>
                                          <then>
                                             <accept/>
                                          </then>
                                       </term>
                                 </xsl:if>
                                 <xsl:if test="$topology = 'Hub &amp; Spoke' and $topologyType = 'HUB'">
                                       <term>
                                          <name>
                                             <xsl:value-of select="$vpnName"/><!--$vpnName--></name>
                                          <from>
                                             <protocol>bgp</protocol>
                                             <community>
                                                 <xsl:value-of select="concat($RT, '_' ,  $vpnName, '_VPRN', $SERVICE_ID, '_', 'SPK')" />
                                               </community>
                                          </from>
                                          <then>
                                             <accept/>
                                          </then>
                                       </term>
                                    </xsl:if>
                                
                                 
                                 <!-- THIS TERM IS TML3 AND CML3 -->
                                 
                                 <term>
                                    <name>Last_Reject</name>
                                    <then>
                                       <reject/>
                                    </then>
                                 </term>
                              </xsl:if>
                           </policy-statement>
                           
                           <!-- VRF Export Policy -->
                           
                           <policy-statement>
                              
                              <name>
                                 <xsl:value-of select="$VRFExportPolicyName"/> <!-- $vpnName_VPRN$serviceId_$topology_EXP -->
                              </name>
                              
                              <!-- THIS TERM IS TML3 ONLY -->
                              <xsl:if test="$endPointServiceType = 'TML3'">
                                 <term>
                                    <name>LB_MGMT</name>
                                    <from>
                                       <protocol>bgp</protocol>
                                       <prefix-list>
                                          <xsl:value-of select="$prefixMgmtName" />
                                       </prefix-list>
                                    </from>
                                    <then>
                                       <community>
                                          <add/>
                                          <!-- this is a pre-existing community for the CIU Management VRF  -->
                                          <community-name>RT_CPE_MGMT_771</community-name>
                                       </community>
                                       <accept/>
                                    </then>
                                 </term>
                                 
                                 <!-- THIS TERM IS TML3 ONLY -->
                                 
                                 <term>
                                    <name>
                                       <xsl:value-of select="$prefixPerfName" /> <!-- $ciuName_$vpnName_PERF -->
                                    </name>
                                    <from>
                                       <prefix-list>
                                          <xsl:value-of select="$prefixPerfName" /> <!-- $ciuName_$vpnName_PERF -->
                                       </prefix-list>
                                    </from>
                                    <then>
                                       <community>
                                          <add/>
                                          <!-- this is a pre-existing community for the CIU Management VRF  -->
                                          <community-name>RT_CPE_MGMT_771</community-name>
                                       </community>
                                       <accept/>
                                    </then>
                                 </term>
                              </xsl:if>
                              
                              <!-- THIS TERM IS TML3 AND CML3 -->
                              <xsl:if test="$endPointServiceType = 'TML3' or $endPointServiceType = 'CML3'">
                                 <term>
                                    <name>
                                       <xsl:value-of select="$TML_CML_TermName" /><!--  $ciuName_$vpnName-->
                                    </name>
                                    <from>
                                       <protocol>bgp</protocol>
                                       <protocol>direct</protocol>
                                    </from>
                                    <then>
                                       <community>
                                          <add/>
                                          <community-name>
                                             <xsl:value-of select="$rtCommunityName" /><!--RT_$vpnName_VPRN$serviceId_$topology-->
                                          </community-name>
                                       </community>
                                       <accept/>
                                    </then>
                                 </term>
                                 
                                 <!-- THIS TERM IS TML3 AND CML3 -->
                                 
                                 <term>
                                    <name>last</name>
                                    <then>
                                       <reject/>
                                    </then>
                                 </term>
                              </xsl:if>
                           </policy-statement>
                           
                           <!-- BGP Policy -->
                           <!-- BGP Import Policy -->
                           <!-- This import policy is for the Customer routes and is applied at the protocols bgp layer
                              of the routing-instance-->
                              
                           
                           <!-- THIS POLICY IS TML3 AND CML3 -->
                           <xsl:if test="$endPointServiceType = 'TML3' or $endPointServiceType = 'CML3'">
                              <policy-statement>
                                 <name>
                                    <xsl:value-of select="$BGP_TML3_CML3_ImportPolicyName" /><!--SET_LP_$pathPreferencesSOO_$ciuName_$vpnName-->
                                 </name>
                                 <xsl:if test="$isIPv6Selected = 'true'">
                                    <term>
                                       <name>v6</name>
                                       <from>
                                          <family>inet6</family>
                                       </from>
                                       <then>
                                          <next-hop>
                                             <address>
                                              <xsl:value-of select="$ipv6NextHOP" />
                                            </address>  
                                          </next-hop>
                                          <next>term</next>
                                       </then>
                                    </term>
                                 </xsl:if>   
                                 <term>
                                    <name>SOO</name>
                                    <then>
                                       <local-preference>120</local-preference>
                                       <community>
                                          <add/>
                                          <community-name>
                                             <xsl:value-of select="$sooCommunityName" /><!--SOO_$ciuName_$vpnName-->
                                          </community-name>
                                       </community>
                                       <accept/>
                                    </then>
                                 </term>
                                 <term>
                                    <name>last</name>
                                    <then>
                                       <reject/>
                                    </then>
                                 </term>
                              </policy-statement>
                           </xsl:if>
                           
                           <!-- BGP Export Policy -->
                           
                           <!-- This export policy is for the Customer routes and is applied at the protocols bgp layer
                              of the routing-instance -->
                           
                           <!-- THIS POLICY IS TML3 BGP Export -->
                           <xsl:if test="$endPointServiceType = 'TML3'">
                              <policy-statement>
                                 <name>
                                    <xsl:value-of select="$BGP_TML3_ExportPolicyName" /><!--FILTER_SOO_$ciuName_$vpnName-->
                                 </name>
                                 <term>
                                    <name>Deny Route From Same Site</name>
                                    <from>
                                       <community>
                                          <xsl:value-of select="$sooCommunityName" /><!--SOO_$ciuName_$vpnName-->
                                       </community>
                                    </from>
                                    <then>
                                       <reject/>
                                    </then>
                                 </term>
                                 <term>
                                    <name>Direct Route</name>
                                    <from>
                                       <protocol>direct</protocol>
                                    </from>
                                    <then>
                                       <accept/>
                                    </then>
                                 </term>
                                 <term>
                                    <name>last</name>
                                    <then>
                                       <community>
                                          <delete/>
                                          <community-name>match-target</community-name>
                                       </community>
                                       <community>
                                          <delete/>
                                          <community-name>match-origin</community-name>
                                       </community>
                                       <accept/>
                                    </then>
                                 </term>
                              </policy-statement>
                           </xsl:if>
                           
                           <!-- THIS POLICY IS CML3 BGP Export -->
                           <xsl:if test="$endPointServiceType = 'CML3'">
                              <policy-statement>
                                 <name>
                                    <xsl:value-of select="$BGP_CML3_ExportPolicyName" /><!--$ciuName_$vpnName_CML3_EXP-->
                                 </name>
                                 <term>
                                    <name>FILTER_SOO</name>
                                    <from>
                                       <community>
                                          <xsl:value-of select="$sooCommunityName" /><!--SOO_$ciuName_$vpnName-->
                                       </community>
                                    </from>
                                    <then>
                                       <reject/>
                                    </then>
                                 </term>
                                 <term>
                                    <name>CPE_MGT_FILTER</name>
                                    <from>
                                       <community-name>RT_CPE_MGMT_771</community-name>
                                    </from>
                                    <then>
                                       <reject/>
                                    </then>
                                 </term>
                                 <term>
                                    <name>NOC_MGT_FILTER</name>
                                    <from>
                                       <community>RT_NMC_MGMT_770</community>
                                    </from>
                                    <then>
                                       <reject/>
                                    </then>
                                 </term>
                                 <term>
                                    <name>BRIX_ROUTE_FILTER</name>
                                    <from>
                                       <community>RT_BRIX</community>
                                    </from>
                                    <then>
                                       <reject/>
                                    </then>
                                 </term>
                                 <term>
                                    <name>PERF_HUB_ROUTES_FILTER</name>
                                    <from>
                                       <community>RT_PERF_HUB</community>
                                    </from>
                                    <then>
                                       <reject/>
                                    </then>
                                 </term>
                                 <term>
                                    <name>last</name>
                                    <then>
                                       <community>
                                          <delete/>
                                          <community-name>match-target</community-name>
                                       </community>
                                       <community>
                                          <delete/>
                                          <community-name>match-origin</community-name>
                                       </community>
                                       <accept/>
                                    </then>
                                 </term>
                              </policy-statement>
                           </xsl:if>
                           </policy-options>
                              
                              <!-- ROUTING-INSTANCES STANZA -->
                             
                              <routing-instances>
                                 <instance>
                                    <name>
                                       <xsl:value-of select="$SERVICE_ID"/> 
                                    </name>
                                    <interface operation="delete">
                                       <name>
                                          <xsl:value-of select="concat($port,'.',$OLD_VLAN_ID)" />
                                       </name>
                                    </interface>
                                    <protocols>
                                       <bgp>
                                          <group>
                                             <name>
                                                <xsl:value-of select="$customerName" />
                                             </name>
                                             <neighbor operation="delete">
                                                <name>
                                                   <xsl:value-of select="$oldBGPNeighbourAddress"/> <!-- $bgpNeighbourAddrAndSubnet oldBGPNeighbourAddress 11.1.2.4 -->
                                                </name>
                                             </neighbor>
                                          </group>
                                       </bgp>
                                    </protocols>
                                 </instance>
                              </routing-instances>        
                                 
                              <routing-instances>
                                 <instance>
                                    <name>
                                       <xsl:value-of select="$SERVICE_ID"/>
                                    </name>
                                   <!-- <description>
                                      <xsl:value-of select="$routingInstanceDescription"/>
                                    </description>
                                    <instance-type>vrf</instance-type>-->
                                    <interface>
                                       <name>
                                          <xsl:value-of select="$interfaceName"/>
                                       </name>
                                    </interface>
                                    <!--
                                    <route-distinguisher>
                                       <rd-type>
                                         
                                          <xsl:value-of select="$RD_TYPE"/>
                                       </rd-type>
                                    </route-distinguisher>
                                    -->
                                    <!-- REMOVE the vrf-target statements and replace with these two: (note that the names are the ones passed in from UI)
                                       The choice of which name to use will depend on if the user has picked Full Mesh or Hub/Spoke -->
                                    <vrf-import>
                                       <xsl:value-of select="$VRFImportPolicyName"/> 
                                    </vrf-import>
                                    <vrf-export>
                                       <xsl:value-of select="$VRFExportPolicyName"/>
                                    </vrf-export>
                                    <protocols>
                                       <bgp>
                                          <description>
                                             <xsl:value-of select="$customerName"/>
                                          </description>
                                          <hold-time>45</hold-time>
                                          <group>
                                             <name>
                                                <xsl:value-of select="$customerName"/>
                                             </name>
                                             <type>external</type>
                                             <peer-as>
                                                <xsl:value-of select="$peerAS"/><!--60001-->
                                             </peer-as>
                                             <as-override/>
                                             <neighbor>
                                                <name>
                                                   <xsl:value-of select="$bgpNeighbourAddress"/> <!--11.1.2.4-->
                                                </name>
                                                <description>
                                                   <xsl:value-of select="$routingInstanceBGPDescription"/>
                                                </description>
                                                <metric-out>
                                                   <metric-value>80</metric-value>
                                                </metric-out>
                                                <!--<local-preference>120</local-preference>-->
                                                <!-- This next line is the new addition: -->
                                                <import>
                                                   <xsl:value-of select="$BGP_TML3_CML3_ImportPolicyName"/><!--<FILTER_SOO_<CIU Name>_<VRF Name> change the variablename.. -->
                                                </import>
                                                <!--<family>
                                                   <inet>
                                                      <unicast>
                                                         <prefix-limit>
                                                            <maximum>1</maximum>
                                                         </prefix-limit>
                                                      </unicast>
                                                   </inet>
                                                </family>
                                                <authentication-key>$9$U3iHmCA0B1hP5z6/tIRhSrlvL</authentication-key> -->
                                                <!-- This next line is the new addition: -->
                                                <export>
                                                   <xsl:if test="$endPointServiceType = 'TML3'">
                                                      <xsl:value-of select="$BGP_TML3_ExportPolicyName"/>
                                                   </xsl:if>
                                                   <xsl:if test="$endPointServiceType = 'CML3'">
                                                      <xsl:value-of select="$BGP_CML3_ExportPolicyName"/>
                                                   </xsl:if>
                                                </export>
                                             </neighbor>
                                          </group>
                                       </bgp>
                                    </protocols>
                                 </instance>
                              </routing-instances>
                        
                              <!-- CLASS-OF-SERVICE STANZA -->
                              <xsl:if test="$QoSEnable = 'true'">
                                 <class-of-service>
                                   
                                    <!-- name of the scheduler that matches values from UI.  This is where we will use logic in the XSL
                                       to determine if this scheduler exists using the passed in variables - if yes, use existing, if not must create it.
                                       
                                       Some of the schedulers will already be predefined on the box -->
                                    
                                    <xsl:if test="$isAF3Selected = 'true' and $scheduler3Search_Count = 0">
                                       <schedulers>
                                          <name>
                                             <xsl:value-of select="$schedularNameAF3"/><!--AF_{AF3%}-->
                                          </name>
                                          <transmit-rate>
                                             <!-- this is the value of "AF3" from the UI, it is a percent value -->
                                             <percent>
                                                <xsl:value-of select="$AF3"/><!--{AF3%}-->
                                             </percent>
                                          </transmit-rate>
                                          <buffer-size>
                                             <!-- buffer-size matches the value of "AF3" from the UI, it is a percent value -->
                                             <percent>
                                                <xsl:value-of select="$AF3"/><!--{AF3%}-->
                                             </percent>
                                          </buffer-size>
                                          <!-- fixed value for a ST scheduler -->
                                          <priority>low</priority>
                                       </schedulers>
                                    </xsl:if>
                                    <xsl:if test="$isAF2Selected = 'true' and $scheduler2Search_Count = 0">
                                       <schedulers>
                                          <name>
                                             <xsl:value-of select="$schedularNameAF2"/><!--AF_{AF2%}-->
                                          </name>
                                          <transmit-rate>
                                             <!-- this is the value of "AF3" from the UI, it is a percent value -->
                                             <percent>
                                                <xsl:value-of select="$AF2"/><!--{AF2%}-->
                                             </percent>
                                          </transmit-rate>
                                          <buffer-size>
                                             <!-- buffer-size matches the value of "AF3" from the UI, it is a percent value -->
                                             <percent>
                                                <xsl:value-of select="$AF2"/><!--{AF2%}-->
                                             </percent>
                                          </buffer-size>
                                          <!-- fixed value for a ST scheduler -->
                                          <priority>low</priority>
                                       </schedulers>
                                    </xsl:if>
                                    <xsl:if test="$isAF1Selected = 'true' and $scheduler1Search_Count = 0">
                                       <schedulers>
                                          <name>
                                             <xsl:value-of select="$schedularNameAF1"/><!--AF_{AF1%}-->
                                          </name>
                                          <transmit-rate>
                                             <!-- this is the value of "AF3" from the UI, it is a percent value -->
                                             <percent>
                                                <xsl:value-of select="$AF1"/><!--{AF1%}-->
                                             </percent>
                                          </transmit-rate>
                                          <buffer-size>
                                             <!-- buffer-size matches the value of "AF3" from the UI, it is a percent value -->
                                             <percent>
                                                <xsl:value-of select="$AF1"/><!--{AF1%}-->
                                             </percent>
                                          </buffer-size>
                                          <!-- fixed value for a ST scheduler -->
                                          <priority>low</priority>
                                       </schedulers>
                                    </xsl:if>
                                    <!-- name of the scheduler-map that matches values from UI.  This is where we will use logic in the XSL
                                       to determine if this scheduler-map exists using the passed in variables - if yes, use existing, if not must create it.
                                       
                                       In the logic, we also need to look if "EF Service" was selected - if yes, then the scheduler-map would have the FC_HIGH_PRIORITY_DATA
                                       class/scheduler added to the scheduler-map - if no, then only the other 3 class/schedulers need to be present -->
                                    
                                    
                                       <!-- pick this one if user selects "EF" from UI, but not "BE" -->
                                       <xsl:if test="$efService = 'true' and $beService = 'false' and $schedulerMapSearch_Count = 0"><!-- -->
                                          <scheduler-maps>
                                             <name>
                                                <xsl:value-of select="$schedularMapNameEF"/><!--SM_EF_{AF3%_AF2%_AF1%}-->
                                             </name>
                                          <forwarding-class>
                                             <name>FC_TOLL_VOICE_AND_SIGNALING</name>
                                             <scheduler>RP</scheduler>
                                          </forwarding-class>
                                          <forwarding-class>
                                             <name>FC_HIGH_PRIORITY_DATA</name>
                                             <scheduler>EF</scheduler>
                                          </forwarding-class>
                                             <xsl:if test="$isAF3Selected = 'true'">
                                               <forwarding-class>
                                                  <name>FC_LOW_LATENCY_DATA_GREEN</name>
                                                  <scheduler>
                                                     <xsl:value-of select="$schedularNameAF3"/><!--AF_{AF3%}-->
                                                  </scheduler>
                                               </forwarding-class>
                                             </xsl:if>
                                             <xsl:if test="$isAF2Selected = 'true'">
                                                <forwarding-class>
                                                   <name>FC_HIGH_THROUGHPUT_DATA</name>
                                                   <scheduler>
                                                      <xsl:value-of select="$schedularNameAF2"/><!--AF_{AF2%}-->
                                                   </scheduler>
                                                </forwarding-class>
                                             </xsl:if>
                                             <xsl:if test="$isAF1Selected = 'true'">
                                              <forwarding-class>
                                                 <name>FC_LOW_PRIORITY_DATA_GREEN</name>
                                                 <scheduler>
                                                    <xsl:value-of select="$schedularNameAF1"/><!--AF_{AF1%}-->
                                                 </scheduler>
                                              </forwarding-class>
                                             </xsl:if>
                                          </scheduler-maps>
                                       </xsl:if>
                                       <!-- this one used when "EF" is not enabled in UI, and no "BE" -->
                                       <xsl:if test="$efService = 'false' and $beService = 'false'">
                                       <scheduler-maps>
                                          <name>
                                             <xsl:value-of select="$schedularMapNameNOEF"/><!--SM_NOEF_{AF3%_AF2%_AF1%}-->
                                          </name>
                                          <forwarding-class>
                                             <name>FC_TOLL_VOICE_AND_SIGNALING</name>
                                             <scheduler>RP</scheduler>
                                          </forwarding-class>
                                          <xsl:if test="$isAF3Selected = 'true'">
                                             <forwarding-class>
                                                <name>FC_LOW_LATENCY_DATA_GREEN</name>
                                                <scheduler>
                                                   <xsl:value-of select="$schedularNameAF3"/><!--AF_{AF3%}-->
                                                </scheduler>
                                             </forwarding-class>
                                          </xsl:if>
                                          <xsl:if test="$isAF2Selected = 'true'">
                                             <forwarding-class>
                                                <name>FC_HIGH_THROUGHPUT_DATA</name>
                                                <scheduler>
                                                   <xsl:value-of select="$schedularNameAF2"/><!--AF_{AF2%}-->
                                                </scheduler>
                                             </forwarding-class>
                                          </xsl:if>
                                          <xsl:if test="$isAF1Selected = 'true'">
                                           <forwarding-class>
                                              <name>FC_LOW_PRIORITY_DATA_GREEN</name>
                                              <scheduler>
                                                 <xsl:value-of select="$schedularNameAF1"/><!--AF_{AF1%}-->
                                              </scheduler>
                                           </forwarding-class>
                                          </xsl:if>
                                       </scheduler-maps>
                                       </xsl:if>
                                       <!-- pick this one if user selects "EF" from UI, AND "BE" -->
                                       <xsl:if test="$efService = 'true' and $beService = 'true' and $schedulerMapEF_REM_Search_Count = 0"> <!--  -->
                                          <scheduler-maps>
                                          <name>
                                             <xsl:value-of select="$schedularMapNameEF-REM"/><!--SM_EF_{AF3%_AF2%_AF1%}_REM-->
                                          </name>
                                          <forwarding-class>
                                             <name>FC_TOLL_VOICE_AND_SIGNALING</name>
                                             <scheduler>RP</scheduler>
                                          </forwarding-class>
                                          <forwarding-class>
                                             <name>FC_HIGH_PRIORITY_DATA</name>
                                             <scheduler>EF</scheduler>
                                          </forwarding-class>
                                             <xsl:if test="$isAF3Selected = 'true'">
                                                <forwarding-class>
                                                <name>FC_LOW_LATENCY_DATA_GREEN</name>
                                                <scheduler>
                                                   <xsl:value-of select="$schedularNameAF3"/><!--AF_{AF3%}-->
                                                </scheduler>
                                             </forwarding-class>
                                             </xsl:if>
                                             <xsl:if test="$isAF2Selected = 'true'">
                                              <forwarding-class>
                                                 <name>FC_HIGH_THROUGHPUT_DATA</name>
                                                 <scheduler>
                                                    <xsl:value-of select="$schedularNameAF2"/><!--AF_{AF2%}-->
                                                 </scheduler>
                                              </forwarding-class>
                                             </xsl:if>
                                             <xsl:if test="$isAF1Selected = 'true'">
                                              <forwarding-class>
                                                 <name>FC_LOW_PRIORITY_DATA_GREEN</name>
                                                 <scheduler>
                                                    <xsl:value-of select="$schedularNameAF1"/><!--AF_{AF1%}-->
                                                 </scheduler>
                                              </forwarding-class>
                                             </xsl:if>
                                                
                                           <forwarding-class>
                                             <name>FC_BEST_EFFORT_DATA_GREEN</name>
                                             <scheduler>AF_REM</scheduler>
                                          </forwarding-class>
                                          </scheduler-maps>
                                       </xsl:if>
                                       <!-- this one used when "EF" is not enabled in UI, but "BE" is -->
                                       <xsl:if test="$efService = 'false' and $beService = 'true' and $schedulerMapNOEF_REM_Search_Count = 0"><!-- -->
                                          <scheduler-maps>
                                          <name>
                                             <xsl:value-of select="$schedularMapNameNOEF-REM"/><!--SM_NOEF_{AF3%_AF2%_AF1%}_REM}-->
                                          </name>
                                          <forwarding-class>
                                             <name>FC_TOLL_VOICE_AND_SIGNALING</name>
                                             <scheduler>RP</scheduler>
                                          </forwarding-class>
                                             <xsl:if test="$isAF3Selected = 'true'">
                                              <forwarding-class>
                                                 <name>FC_LOW_LATENCY_DATA_GREEN</name>
                                                 <scheduler>
                                                    <xsl:value-of select="$schedularNameAF3"/><!--AF_{AF3%}-->
                                                 </scheduler>
                                              </forwarding-class>
                                             </xsl:if>
                                             <xsl:if test="$isAF2Selected = 'true'">
                                                 <forwarding-class>
                                                    <name>FC_HIGH_THROUGHPUT_DATA</name>
                                                    <scheduler>
                                                       <xsl:value-of select="$schedularNameAF2"/><!--AF_{AF2%}-->
                                                    </scheduler>
                                                 </forwarding-class>
                                             </xsl:if>
                                             <xsl:if test="$isAF1Selected = 'true'">
                                                 <forwarding-class>
                                                    <name>FC_LOW_PRIORITY_DATA_GREEN</name>
                                                    <scheduler>
                                                       <xsl:value-of select="$schedularNameAF1"/><!--AF_{AF1%}-->
                                                    </scheduler>
                                                 </forwarding-class>
                                             </xsl:if>
                                             <forwarding-class>
                                             <name>FC_BEST_EFFORT_DATA_GREEN</name>
                                             <scheduler>AF_REM</scheduler>
                                          </forwarding-class>
                                          </scheduler-maps>
                                       </xsl:if>
                                    
                                    
                                    <!-- This is where we will use logic in the XSL to determine if this profile exists using the passed in variables
                                        - if yes, use existing, if not must create it -->
                                    
                                    <!-- choose this one if "BE" is not enabled -->
                                    <!--<xsl:if test="$beService = 'false' and $efService = 'false'">  TODO: verify with john-->
                                    <xsl:if test="$beService = 'false' and $traficControlProfileSearch_Count = 0 "> <!--  -->
                                       <traffic-control-profiles>
                                          <name>
                                             <xsl:value-of select="$trafic-control-profile-name"/><!--L3VPN_{Access Rate}_<EF | NOEF>_{AF3%_AF2%_AF1%}-->
                                          </name>
                                          <xsl:if test="$efService = 'true'">
                                             <scheduler-map>
                                                <xsl:value-of select="$schedularMapNameEF"/><!--SM_<EF | NOEF>_{AF3%_AF2%_AF1%}-->
                                             </scheduler-map>
                                          </xsl:if>
                                          <xsl:if test="$efService = 'false'">
                                             <scheduler-map>
                                                <xsl:value-of select="$schedularMapNameNOEF"/><!--SM_<EF | NOEF>_{AF3%_AF2%_AF1%}-->
                                             </scheduler-map>
                                          </xsl:if>
                                                <shaping-rate>
                                                   <rate>
                                                      <xsl:value-of select="$shapingRate"/><!--{Access Rate}-->
                                                   </rate>
                                                </shaping-rate>
                                       </traffic-control-profiles>
                                    </xsl:if>
                                    
                                    <!-- choose this one if "BE" is enabled -->
                                   <!-- <xsl:if test="$beService = 'true' and $efService = 'false'"> TODO: verify with john -->
                                    <xsl:if test="$beService = 'true' and $traficControlProfileRemSearch_Count = 0 "><!-- -->
                                       <traffic-control-profiles>
                                          <name>
                                             <xsl:if test="$efService = 'true'">
                                                <xsl:value-of select="$trafic-control-profile-name"/><!--L3VPN_{Access Rate}_<EF | NOEF>_{AF3%_AF2%_AF1%}_REM-->
                                             </xsl:if>
                                             <xsl:if test="$efService = 'false'">
                                                <xsl:value-of select="$trafic-control-profile-name-rem"/><!--L3VPN_{Access Rate}_<EF | NOEF>_{AF3%_AF2%_AF1%}_REM-->
                                             </xsl:if>
                                          </name>
                                             <scheduler-map>
                                                <!--SM_<EF | NOEF>_{AF3%_AF2%_AF1%}_REM-->
                                                <xsl:if test="$efService = 'true'">
                                                   <xsl:value-of select="$schedularMapNameEF-REM"/>
                                                </xsl:if>
                                                <xsl:if test="$efService = 'false'">
                                                   <xsl:value-of select="$schedularMapNameNOEF-REM"/>
                                                </xsl:if>
                                             </scheduler-map>
                                                <shaping-rate>
                                                   <rate>
                                                      <xsl:value-of select="$shapingRate"/><!--{Access Rate}-->
                                                   </rate>
                                                </shaping-rate>
                                       </traffic-control-profiles>
                                    </xsl:if>
                                    <!-- choose this one for the following combination:  EF, All AF -->
                                    <interfaces>
                                    <xsl:if test="$efService = 'true' and $isAllAFSelected='true'">
                                     <interface>
                                        <name>
                                           <xsl:value-of select="$port"/>
                                        </name>
                                        <unit operation="delete">
                                           <name>
                                              <xsl:value-of select="$VLAN_ID"/>
                                           </name>
                                        </unit>
                                        <unit>
                                           <name>
                                              <xsl:value-of select="$VLAN_ID"/>
                                           </name>
                                           <output-traffic-control-profile>
                                              <profile-name>
                                                 <xsl:value-of select="concat('L3VPN', '_', $accessRate, '_','EF', '_', $AF3, '_', $AF2, '_', $AF1)" /><!--L3VPN_{Access Rate}_EF_{AF3%_AF2%_AF1%}-->
                                              </profile-name>
                                           </output-traffic-control-profile>
                                           
                                           <!-- choose the classifier based on UI selection -->
                                           
                                           <classifiers>
                                              <xsl:if test="$classifier = 'v2-DSCP(default)'">
                                                <dscp>
                                                   <name>IPv2_PREMIUM</name>
                                                </dscp>
                                              </xsl:if>
                                              <xsl:if test="$classifier = 'v2-802.1p'">
                                                 <ieee-802.1>
                                                    <classifier-name>IPv2_PREMIUM_DOT1P</classifier-name>
                                                 </ieee-802.1>
                                              </xsl:if>
                                              <xsl:if test="$classifier = 'v2-802.1ad'">
                                                 <ieee-802.1ad>
                                                    <classifier-name>IPv2_PREMIUM_DEI</classifier-name>
                                                 </ieee-802.1ad>
                                              </xsl:if>
                                           </classifiers>
                                        </unit>
                                     </interface>
                                    </xsl:if>
                                    
                                    <!-- choose this one for the following combination:  All AF -->
                                    <xsl:if test="$isAllAFSelected='true' and $efService='false'">
                                    <interface>
                                       <name>
                                          <xsl:value-of select="$port"/>
                                       </name>
                                       <unit operation="delete">
                                          <name>
                                             <xsl:value-of select="$VLAN_ID"/>
                                          </name>
                                       </unit>
                                       <unit>
                                          <name>
                                             <xsl:value-of select="$VLAN_ID"/>
                                          </name>
                                          <output-traffic-control-profile>
                                             <profile-name>
                                                <xsl:value-of select="concat('L3VPN', '_', $accessRate, '_','NOEF', '_', $AF3, '_', $AF2, '_', $AF1)" /><!--L3VPN_{Access Rate}_NOEF_{AF3%_AF2%_AF1%}-->
                                             </profile-name>
                                          </output-traffic-control-profile>
                                          
                                          <!-- choose the classifier based on UI selection -->
                                          
                                           <classifiers>
                                                 <xsl:if test="$classifier = 'v2-DSCP(default)'">
                                                      <dscp>
                                                         <name>IPv2_ENHANCED</name>
                                                      </dscp>
                                                   </xsl:if>
                                                   <xsl:if test="$classifier = 'v2-802.1p'">
                                                      <ieee-802.1>
                                                         <classifier-name>IPv2_ENHANCED_DOT1P</classifier-name>
                                                      </ieee-802.1>
                                                   </xsl:if>
                                                   <xsl:if test="$classifier = 'v2-802.1ad'">
                                                      <ieee-802.1ad>
                                                         <classifier-name>IPv2_ENHANCED_DEI</classifier-name>
                                                      </ieee-802.1ad>
                                                   </xsl:if>
                                                </classifiers>
                                        </unit>
                                    </interface>
                                    </xsl:if>
                                    
                                    <!-- choose this one for the following combination:  AF3 -->
                                    <xsl:if test="$isAF3Selected='true' and $isAF1Selected='false' and $isAF2Selected='false'">
                                    <interface>
                                       <name>
                                          <xsl:value-of select="$port"/>
                                       </name>
                                       <unit operation="delete">
                                          <name>
                                             <xsl:value-of select="$VLAN_ID"/>
                                          </name>
                                       </unit>
                                       <unit>
                                          <name>
                                             <xsl:value-of select="$VLAN_ID"/>
                                          </name>
                                          <output-traffic-control-profile>
                                             <profile-name>
                                               <!-- <xsl:value-of select="concat('L3VPN', '_', $accessRate, '_','NOEF', '_', 'AF3', '_', '100', '_', 'AF2', '_', '0', '_', 'AF1', '_', '0')" />L3VPN_{Access Rate}_NOEF_AF3_100_AF2_0_AF1_0-->
                                                <xsl:if test="$efService='true'">
                                                   <xsl:value-of select="concat('L3VPN', '_', $accessRate, '_','EF', '_',  '100', '_',  '0', '_',  '0')" />
                                                </xsl:if>
                                                <xsl:if test="$efService='false'">
                                                   <xsl:value-of select="concat('L3VPN', '_', $accessRate, '_','NOEF', '_',  '100', '_',  '0', '_',  '0')" />
                                                </xsl:if>
                                             </profile-name>
                                          </output-traffic-control-profile>
                                          
                                          <!-- choose the classifier based on UI selection -->
                                          
                                          <classifiers>
                                             <xsl:if test="$classifier = 'v2-DSCP(default)'">
                                             <dscp>
                                                <name>IPv2_AF3_ONLY</name>
                                             </dscp>
                                             </xsl:if>
                                             <xsl:if test="$classifier = 'v2-802.1p'">
                                             <ieee-802.1p>
                                                <classifier-name>IPv2_AF3_DOT1P</classifier-name>
                                             </ieee-802.1p>
                                             </xsl:if>
                                             <xsl:if test="$classifier = 'v2-802.1ad'">
                                             <ieee-802.1ad>
                                                <classifier-name>IPv2_AF3_DEI</classifier-name>
                                             </ieee-802.1ad>
                                             </xsl:if>
                                          </classifiers>
                                       </unit>
                                    </interface>
                                    </xsl:if>
                                    
                                    <!-- choose this one for the following combination:  AF2 -->
                                    <xsl:if test="$isAF2Selected='true' and $isAF1Selected='false' and $isAF3Selected='false'">
                                       <interface>
                                          <name>
                                             <xsl:value-of select="$port"/>
                                          </name>
                                          <unit operation="delete">
                                             <name>
                                                <xsl:value-of select="$VLAN_ID"/>
                                             </name>
                                          </unit>
                                          <unit>
                                             <name>
                                                <xsl:value-of select="$VLAN_ID"/>
                                             </name>
                                             <output-traffic-control-profile>
                                                <profile-name>
                                                   <xsl:if test="$efService='true'">
                                                      <xsl:value-of select="concat('L3VPN', '_', $accessRate, '_','EF', '_', '0', '_', '100', '_', '0')" /><!--L3VPN_{Access Rate}_NOEF_AF2_100_AF2_0_AF1_0-->
                                                   </xsl:if>
                                                   <xsl:if test="$efService='false'">
                                                      <xsl:value-of select="concat('L3VPN', '_', $accessRate, '_','NOEF', '_', '0', '_', '100', '_', '0')" /><!--L3VPN_{Access Rate}_NOEF_AF2_100_AF2_0_AF1_0-->
                                                   </xsl:if>
                                                </profile-name>
                                             </output-traffic-control-profile>
                                             
                                             <!-- choose the classifier based on UI selection -->
                                             
                                             <classifiers>
                                                <xsl:if test="$classifier = 'v2-DSCP(default)'">
                                                <dscp>
                                                   <name>IPv2_AF2_ONLY</name>
                                                </dscp>
                                                </xsl:if>
                                                <xsl:if test="$classifier = 'v2-802.1p'">
                                                <ieee-802.1>
                                                   <classifier-name>IPv2_AF2_DOT1P</classifier-name>
                                                </ieee-802.1>
                                                </xsl:if>
                                                <xsl:if test="$classifier = 'v2-802.1ad'">
                                                <ieee-802.1ad>
                                                   <classifier-name>IPv2_AF2_DEI</classifier-name>
                                                </ieee-802.1ad>
                                                </xsl:if>
                                             </classifiers>
                                          </unit>
                                       </interface>
                                    </xsl:if>
                                    <!-- choose this one for the following combination:  AF1 -->
                                    <xsl:if test="$isAF1Selected='true' and $isAF2Selected='false' and $isAF3Selected='false'">
                                          <interface>
                                             <name>
                                                <xsl:value-of select="$port"/>
                                             </name>
                                             <unit operation="delete">
                                                <name>
                                                  <xsl:value-of select="$VLAN_ID"/>
                                                </name>
                                             </unit>
                                             <unit>
                                                <name>
                                                  <xsl:value-of select="$VLAN_ID"/>
                                                </name>
                                                <output-traffic-control-profile>
                                                  <profile-name>
                                                  <xsl:if test="$efService='true'">
                                                  <xsl:value-of
                                                  select="concat('L3VPN', '_', $accessRate, '_','EF', '_',  '0', '_', '0', '_',  '100')"/>
                                                  <!--L3VPN_{Access Rate}_NOEF_AF3_0_AF2_0_AF1_100-->
                                                  </xsl:if>
                                                  <xsl:if test="$efService='false'">
                                                  <xsl:value-of
                                                  select="concat('L3VPN', '_', $accessRate, '_','NOEF', '_',  '0', '_', '0', '_',  '100')"/>
                                                  <!--L3VPN_{Access Rate}_NOEF_AF3_0_AF2_0_AF1_100-->
                                                  </xsl:if>
                                                  </profile-name>
                                                </output-traffic-control-profile>
                                                <!-- choose the classifier based on UI selection -->

                                                <classifiers>
                                                  <xsl:if test="$classifier = 'v2-DSCP(default)'">
                                                  <dscp>
                                                  <name>IPv2_AF1_ONLY</name>
                                                  </dscp>
                                                  </xsl:if>
                                                  <xsl:if test="$classifier = 'v2-802.1p'">
                                                  <ieee-802.1>
                                                  <classifier-name>IPv2_AF1_DOT1P</classifier-name>
                                                  </ieee-802.1>
                                                  </xsl:if>

                                                  <xsl:if test="$classifier = 'v2-802.1ad'">
                                                  <ieee-802.1ad>
                                                  <classifier-name>IPv2_AF1_DEI</classifier-name>
                                                  </ieee-802.1ad>
                                                  </xsl:if>
                                                </classifiers>
                                             </unit>
                                          </interface>
                                    </xsl:if>
                                    </interfaces>
                                 </class-of-service>
                        </xsl:if>
                           </xsl:when>
                           <xsl:when test="$recordOPType = 'ADD'">
                              
                              <interfaces>
                           <xsl:if test="$endPointServiceType = 'TML3'">
                              <interface>
                                 <name>
                                    <xsl:value-of select="$port"/>
                                 </name>
                                 <description>
                                    <xsl:value-of select="$interface-description"/>
                                 </description>
                                 <unit>
                                    <name>
                                       <xsl:value-of select="$VLAN_ID"/>
                                    </name>
                                    <description>
                                       <xsl:value-of select="$interfaceUnitDescription"/>
                                    </description>
                                    <!-- here is the VLAN id -->
                                    <vlan-id>
                                       <xsl:value-of select="$VLAN_ID"/>
                                    </vlan-id>
                                    <family>
                                       <inet>
                                          <!-- address comes from IPv4 Address/Mask -->
                                          <address>
                                                 <name>
                                                    <xsl:value-of select="$IPv4AddressMask"/>
                                                 </name>
                                             </address>
                                          <filter>
                                             <output>
                                                <filter-name>PRIORITIZE_MGT_TRAFFIC</filter-name>
                                             </output>
                                          </filter>
                                       </inet>
                                    </family>
                                 </unit>
                              </interface>
                           </xsl:if>
                           <xsl:if test="$endPointServiceType = 'CML3'">
                              <interface>
                                 <name>
                                    <xsl:value-of select="$port"/>
                                 </name>
                                 <description>
                                    <xsl:value-of select="$interface-description"/>
                                 </description>
                                 <unit>
                                    <name>
                                       <xsl:value-of select="$VLAN_ID"/>
                                    </name>
                                    <description>
                                       <xsl:value-of select="$interfaceUnitDescription"/>
                                    </description>
                                    <!-- here is the VLAN id -->
                                    <vlan-id>
                                       <xsl:value-of select="$VLAN_ID"/>
                                    </vlan-id>
                                    <family>
                                       <inet>
                                          <!-- address comes from IPv4 Address/Mask -->
                                          <address>
                                                 <name>
                                                    <xsl:value-of select="$IPv4AddressMask"/>
                                                 </name>
                                             </address>
                                          <xsl:if test="$efService = 'true'">
                                           <filter>
                                              <input>
                                                 <filter-name>
                                                    <xsl:if test="$flowSampling = 'true'">
                                                       <xsl:value-of select="concat('FROM_CML3_PREMIUM',  '_',  $efRate, '_', 'SAMPLING')" />
                                                    </xsl:if>
                                                    <xsl:if test="$flowSampling = 'false'">
                                                       <xsl:value-of select="concat('FROM_CML3_PREMIUM',  '_',  $efRate)" />
                                                    </xsl:if>
                                                    <!--FROM_CML3_PREMIUM_{Access Rate}{_SAMPLING}-->
                                                 </filter-name>
                                              </input>
                                              <output>
                                                 <filter-name>
                                                    <xsl:if test="$flowSampling = 'true'">
                                                       <xsl:value-of select="concat('OUT_TO_PREMIUM',  '_',  $efRate, '_', 'SAMPLING')" /><!--OUT_TO_PREMIUM_{Access Rate}{_SAMPLING}-->
                                                    </xsl:if>
                                                    <xsl:if test="$flowSampling = 'false'">
                                                       <xsl:value-of select="concat('OUT_TO_PREMIUM',  '_',  $efRate)" /><!--OUT_TO_PREMIUM_{Access Rate}{_SAMPLING}-->
                                                    </xsl:if>
                                                 </filter-name>
                                              </output>
                                           </filter>
                                          </xsl:if>
                                       </inet>
                                       
                                       <!--
                                          IPV6 filter is only used when IPv6 is selected from the UI.
                                        -->
                                       <xsl:if test="$isIPv6Selected = 'true'">
                                          <inet6>
                                             <address>
                                                  <!-- comes from IPv6 Address -->
                                                 <name>
                                                       <xsl:value-of select="$ipv6Address"/>
                                                      <!-- 2001:568:b:400:2:1:0:0/127 -->
                                                 </name>
                                             </address>
                                             <xsl:if test="$efService = 'true'">
                                              <filter>
                                                 <input>
                                                    <filter-name>
                                                       <xsl:if test="$flowSampling = 'true'">
                                                          <xsl:value-of select="concat('FROM_CML3_PREMIUM',  '_',  $accessRate, '_', 'SAMPLING', 'IPV6')" />
                                                       </xsl:if>
                                                       <xsl:if test="$flowSampling = 'false'">
                                                          <xsl:value-of select="concat('FROM_CML3_PREMIUM',  '_',  $accessRate, 'IPV6')" />
                                                       </xsl:if>
                                                       <!--FROM_CML3_PREMIUM_{Access Rate}{_SAMPLING}_IPV6-->
                                                    </filter-name>
                                                 </input>
                                                 <output>
                                                    <filter-name>
                                                       <xsl:if test="$flowSampling = 'true'">
                                                          <xsl:value-of select="concat('OUT_TO_PREMIUM',  '_',  $accessRate, '_', 'SAMPLING', 'IPV6')" />
                                                       </xsl:if>
                                                       <xsl:if test="$flowSampling = 'false'">
                                                          <xsl:value-of select="concat('OUT_TO_PREMIUM',  '_',  $accessRate, 'IPV6')" />
                                                       </xsl:if>
                                                       <!--OUT_TO_PREMIUM_{Access Rate}{_SAMPLING}_IPV6-->
                                                    </filter-name>
                                                 </output>
                                              </filter>
                                             </xsl:if>
                                          </inet6>
                                       </xsl:if>
                                    </family>
                                 </unit>
                              </interface>
                           </xsl:if>
                        </interfaces>
                        
                        <!-- FIREWALL STANZA -->     
                        <xsl:if test="$efService = 'true'">
                           <firewall>
                              <!-- Policer used in all cases below.  These rates come from a table that must be followed -->
                              <xsl:if test="$efService = 'true'">
                                 <policer>
                                    <name>
                                       <xsl:value-of select="$policerName"/><!--{EF Rate}_LIMIT-->
                                    </name>
                                    <logical-interface-policer/>
                                    <if-exceeding>
                                       <bandwidth-limit>
                                          <xsl:value-of select="$bwLimit"/><!--{BW Limit}-->
                                       </bandwidth-limit>
                                       <burst-size-limit>
                                          <xsl:value-of select="$burstSize"/>
                                          <!--{Burst Size}-->
                                       </burst-size-limit>
                                    </if-exceeding>
                                    <then>
                                       <discard/>
                                    </then>
                                 </policer>
                              </xsl:if>
                              <xsl:if test="$efService = 'true'">
                                 <family>
                                    <inet>
                                       <xsl:if test="$FromPremiumFilterNameSearch_Count = 0">
                                       <filter>
                                          
                                          <!-- If Jflow is selected from UI, then add the _SAMPLING to the end of the name -->
                                          
                                          <name>
                                             <xsl:value-of select="$FromPremiumFilterName"/>
                                            
                                             <!--FROM_CML3_PREMIUM_{EF Rate}_SAMPLING-->
                                          </name>
                                          <interface-specific/>
                                          <term>
                                             <name>ALLOW_ROUTING_TRAFFIC</name>
                                             <from>
                                                <forwarding-class>FC_TOLL_VOICE_AND_SIGNALING</forwarding-class>
                                             </from>
                                             <then>
                                                <accept/>
                                             </then>
                                          </term>
                                          <term>
                                             <name>EF_TRAFFIC</name>
                                             <from>
                                                <forwarding-class>FC_HIGH_PRIORITY_DATA</forwarding-class>
                                             </from>
                                             <then>
                                                <xsl:if test="$efService = 'true'">
                                                 <policer>
                                                    <xsl:value-of select="$policerName"/><!--{EF Rate}_LIMIT-->
                                                 </policer>
                                                </xsl:if>
                                                <!-- If Jflow is selected from UI, then add the sample line -->
                                                <xsl:if test="$flowSampling = 'true'">
                                                   <sample/>
                                                </xsl:if>
                                             </then>
                                          </term>
                                          <term>
                                             <name>ALL_OTHER_TRAFFIC</name>
                                             <then>
                                                
                                                <!-- If Jflow is selected from UI, then add the sample line -->
                                                <xsl:if test="$flowSampling = 'true'">
                                                   <sample/>
                                                </xsl:if>
                                                <accept/>
                                             </then>
                                          </term>
                                       </filter>
                                       </xsl:if>
                                       <xsl:if test="$ToPremiumFilterNameSearch_Count = 0">
                                       <filter>
                                          
                                          <!-- If Jflow is selected from UI, then add the _SAMPLING to the end of the name -->
                                          
                                          <name>
                                             
                                             <xsl:value-of select="$ToPremiumFilterName"/>
                                          </name>
                                          <interface-specific/>
                                          <term>
                                             <name>IPV4_SAMPLING</name>
                                             <from>
                                                <interface-group-except>1</interface-group-except>
                                             </from>
                                             <then>
                                                <sample/>
                                                <accept/>
                                             </then>
                                          </term>
                                          <term>
                                             <name>ALLOW_MANAGEMENT</name>
                                             <from>
                                                <source-prefix-list>OSS_MANAGEMENT_SUBNETS</source-prefix-list>
                                             </from>
                                             <then>
                                                <forwarding-class>FC_TOLL_VOICE_AND_SIGNALING</forwarding-class>
                                             </then>
                                          </term>
                                          <term>
                                             <name>EF_TRAFFIC</name>
                                             <from>
                                                <forwarding-class>FC_HIGH_PRIORITY_DATA</forwarding-class>
                                             </from>
                                             <then>
                                                <xsl:if test="$efService = 'true'">
                                                   <policer>
                                                      <xsl:value-of select="$policerName"/><!--{EF Rate}_LIMIT-->
                                                   </policer>
                                                </xsl:if>
                                             </then>
                                          </term>
                                          <term>
                                             <name>ALL_OTHER_TRAFFIC</name>
                                             <then>
                                                <accept/>
                                             </then>
                                          </term>
                                       </filter>
                                       </xsl:if>
                                    </inet>
                                 </family>
                              </xsl:if>
                              <xsl:if test="$isIPv6Selected = 'true' and $efService = 'true'">
                                    <family>
                                    <inet6>
                                       <filter>
                                          
                                          <!-- If Jflow is selected from UI, then add the _SAMPLING in the name -->
                                          
                                          <name>
                                             <xsl:value-of select="$FromPremiumFilterNameIP6"/>
                                          </name>
                                          <interface-specific/>
                                          <term>
                                             <name>EF_TRAFFIC</name>
                                             <from>
                                                <forwarding-class>FC_HIGH_PRIORITY_DATA</forwarding-class>
                                             </from>
                                             <then>
                                                <xsl:if test="$efService = 'true'">
                                                 <policer>
                                                    <xsl:value-of select="$policerName"/><!--{EF Rate}_LIMIT-->
                                                 </policer>
                                                </xsl:if>
                                                
                                                <!-- If Jflow is selected from UI, then add the sample line -->
                                               <xsl:if test="$flowSampling = 'true'">
                                                   <sample/>
                                                </xsl:if>
                                             </then>
                                          </term>
                                          <term>
                                             <name>ALL_OTHER_TRAFFIC</name>
                                             <then>
                                                
                                                <!-- If Jflow is selected from UI, then add the sample line -->
                                                <xsl:if test="$flowSampling = 'true'">
                                                   <sample/>
                                                </xsl:if>
                                                <accept/>
                                             </then>
                                          </term>
                                       </filter>
                                    </inet6>
                                    </family>
                                 </xsl:if>
                             
                           </firewall>
                        </xsl:if>
                        <!-- FIREWALL STANZA END-->      
                        <!-- CLASS-OF-SERVICE STANZA -->
                        
                        <xsl:if test="$QoSEnable = 'true'">
                        <class-of-service>
                          
                           <!-- name of the scheduler that matches values from UI.  This is where we will use logic in the XSL
                              to determine if this scheduler exists using the passed in variables - if yes, use existing, if not must create it.
                              
                              Some of the schedulers will already be predefined on the box -->
                           
                           <xsl:if test="$isAF3Selected = 'true' and $scheduler3Search_Count = 0">
                              <schedulers>
                                 <name>
                                    <xsl:value-of select="$schedularNameAF3"/><!--AF_{AF3%}-->
                                 </name>
                                 <transmit-rate>
                                    <!-- this is the value of "AF3" from the UI, it is a percent value -->
                                    <percent>
                                       <xsl:value-of select="$AF3"/><!--{AF3%}-->
                                    </percent>
                                 </transmit-rate>
                                 <buffer-size>
                                    <!-- buffer-size matches the value of "AF3" from the UI, it is a percent value -->
                                    <percent>
                                       <xsl:value-of select="$AF3"/><!--{AF3%}-->
                                    </percent>
                                 </buffer-size>
                                 <!-- fixed value for a ST scheduler -->
                                 <priority>low</priority>
                              </schedulers>
                           </xsl:if>
                           <xsl:if test="$isAF2Selected = 'true' and $scheduler2Search_Count = 0">
                              <schedulers>
                                 <name>
                                    <xsl:value-of select="$schedularNameAF2"/><!--AF_{AF2%}-->
                                 </name>
                                 <transmit-rate>
                                    <!-- this is the value of "AF3" from the UI, it is a percent value -->
                                    <percent>
                                       <xsl:value-of select="$AF2"/><!--{AF2%}-->
                                    </percent>
                                 </transmit-rate>
                                 <buffer-size>
                                    <!-- buffer-size matches the value of "AF3" from the UI, it is a percent value -->
                                    <percent>
                                       <xsl:value-of select="$AF2"/><!--{AF2%}-->
                                    </percent>
                                 </buffer-size>
                                 <!-- fixed value for a ST scheduler -->
                                 <priority>low</priority>
                              </schedulers>
                           </xsl:if>
                           <xsl:if test="$isAF1Selected = 'true' and $scheduler1Search_Count = 0">
                              <schedulers>
                                 <name>
                                    <xsl:value-of select="$schedularNameAF1"/><!--AF_{AF1%}-->
                                 </name>
                                 <transmit-rate>
                                    <!-- this is the value of "AF3" from the UI, it is a percent value -->
                                    <percent>
                                       <xsl:value-of select="$AF1"/><!--{AF1%}-->
                                    </percent>
                                 </transmit-rate>
                                 <buffer-size>
                                    <!-- buffer-size matches the value of "AF3" from the UI, it is a percent value -->
                                    <percent>
                                       <xsl:value-of select="$AF1"/><!--{AF1%}-->
                                    </percent>
                                 </buffer-size>
                                 <!-- fixed value for a ST scheduler -->
                                 <priority>low</priority>
                              </schedulers>
                           </xsl:if>
                           <!-- name of the scheduler-map that matches values from UI.  This is where we will use logic in the XSL
                              to determine if this scheduler-map exists using the passed in variables - if yes, use existing, if not must create it.
                              
                              In the logic, we also need to look if "EF Service" was selected - if yes, then the scheduler-map would have the FC_HIGH_PRIORITY_DATA
                              class/scheduler added to the scheduler-map - if no, then only the other 3 class/schedulers need to be present -->
                           
                           
                              <!-- pick this one if user selects "EF" from UI, but not "BE" -->
                              <xsl:if test="$efService = 'true' and $beService = 'false' and $schedulerMapSearch_Count = 0"><!-- -->
                                 <scheduler-maps>
                                    <name>
                                       <xsl:value-of select="$schedularMapNameEF"/><!--SM_EF_{AF3%_AF2%_AF1%}-->
                                    </name>
                                 <forwarding-class>
                                    <name>FC_TOLL_VOICE_AND_SIGNALING</name>
                                    <scheduler>RP</scheduler>
                                 </forwarding-class>
                                 <forwarding-class>
                                    <name>FC_HIGH_PRIORITY_DATA</name>
                                    <scheduler>EF</scheduler>
                                 </forwarding-class>
                                    <xsl:if test="$isAF3Selected = 'true'">
                                      <forwarding-class>
                                         <name>FC_LOW_LATENCY_DATA_GREEN</name>
                                         <scheduler>
                                            <xsl:value-of select="$schedularNameAF3"/><!--AF_{AF3%}-->
                                         </scheduler>
                                      </forwarding-class>
                                    </xsl:if>
                                    <xsl:if test="$isAF2Selected = 'true'">
                                       <forwarding-class>
                                          <name>FC_HIGH_THROUGHPUT_DATA</name>
                                          <scheduler>
                                             <xsl:value-of select="$schedularNameAF2"/><!--AF_{AF2%}-->
                                          </scheduler>
                                       </forwarding-class>
                                    </xsl:if>
                                    <xsl:if test="$isAF1Selected = 'true'">
                                     <forwarding-class>
                                        <name>FC_LOW_PRIORITY_DATA_GREEN</name>
                                        <scheduler>
                                           <xsl:value-of select="$schedularNameAF1"/><!--AF_{AF1%}-->
                                        </scheduler>
                                     </forwarding-class>
                                    </xsl:if>
                                 </scheduler-maps>
                              </xsl:if>
                              <!-- this one used when "EF" is not enabled in UI, and no "BE" -->
                              <xsl:if test="$efService = 'false' and $beService = 'false'">
                              <scheduler-maps>
                                 <name>
                                    <xsl:value-of select="$schedularMapNameNOEF"/><!--SM_NOEF_{AF3%_AF2%_AF1%}-->
                                 </name>
                                 <forwarding-class>
                                    <name>FC_TOLL_VOICE_AND_SIGNALING</name>
                                    <scheduler>RP</scheduler>
                                 </forwarding-class>
                                 <xsl:if test="$isAF3Selected = 'true'">
                                    <forwarding-class>
                                       <name>FC_LOW_LATENCY_DATA_GREEN</name>
                                       <scheduler>
                                          <xsl:value-of select="$schedularNameAF3"/><!--AF_{AF3%}-->
                                       </scheduler>
                                    </forwarding-class>
                                 </xsl:if>
                                 <xsl:if test="$isAF2Selected = 'true'">
                                    <forwarding-class>
                                       <name>FC_HIGH_THROUGHPUT_DATA</name>
                                       <scheduler>
                                          <xsl:value-of select="$schedularNameAF2"/><!--AF_{AF2%}-->
                                       </scheduler>
                                    </forwarding-class>
                                 </xsl:if>
                                 <xsl:if test="$isAF1Selected = 'true'">
                                  <forwarding-class>
                                     <name>FC_LOW_PRIORITY_DATA_GREEN</name>
                                     <scheduler>
                                        <xsl:value-of select="$schedularNameAF1"/><!--AF_{AF1%}-->
                                     </scheduler>
                                  </forwarding-class>
                                 </xsl:if>
                              </scheduler-maps>
                              </xsl:if>
                              <!-- pick this one if user selects "EF" from UI, AND "BE" -->
                              <xsl:if test="$efService = 'true' and $beService = 'true' and $schedulerMapEF_REM_Search_Count = 0"> <!--  -->
                                 <scheduler-maps>
                                 <name>
                                    <xsl:value-of select="$schedularMapNameEF-REM"/><!--SM_EF_{AF3%_AF2%_AF1%}_REM-->
                                 </name>
                                 <forwarding-class>
                                    <name>FC_TOLL_VOICE_AND_SIGNALING</name>
                                    <scheduler>RP</scheduler>
                                 </forwarding-class>
                                 <forwarding-class>
                                    <name>FC_HIGH_PRIORITY_DATA</name>
                                    <scheduler>EF</scheduler>
                                 </forwarding-class>
                                    <xsl:if test="$isAF3Selected = 'true'">
                                       <forwarding-class>
                                       <name>FC_LOW_LATENCY_DATA_GREEN</name>
                                       <scheduler>
                                          <xsl:value-of select="$schedularNameAF3"/><!--AF_{AF3%}-->
                                       </scheduler>
                                    </forwarding-class>
                                    </xsl:if>
                                    <xsl:if test="$isAF2Selected = 'true'">
                                     <forwarding-class>
                                        <name>FC_HIGH_THROUGHPUT_DATA</name>
                                        <scheduler>
                                           <xsl:value-of select="$schedularNameAF2"/><!--AF_{AF2%}-->
                                        </scheduler>
                                     </forwarding-class>
                                    </xsl:if>
                                    <xsl:if test="$isAF1Selected = 'true'">
                                     <forwarding-class>
                                        <name>FC_LOW_PRIORITY_DATA_GREEN</name>
                                        <scheduler>
                                           <xsl:value-of select="$schedularNameAF1"/><!--AF_{AF1%}-->
                                        </scheduler>
                                     </forwarding-class>
                                    </xsl:if>
                                       
                                  <forwarding-class>
                                    <name>FC_BEST_EFFORT_DATA_GREEN</name>
                                    <scheduler>AF_REM</scheduler>
                                 </forwarding-class>
                                 </scheduler-maps>
                              </xsl:if>
                              <!-- this one used when "EF" is not enabled in UI, but "BE" is -->
                              <xsl:if test="$efService = 'false' and $beService = 'true' and $schedulerMapNOEF_REM_Search_Count = 0"><!-- -->
                                 <scheduler-maps>
                                 <name>
                                    <xsl:value-of select="$schedularMapNameNOEF-REM"/><!--SM_NOEF_{AF3%_AF2%_AF1%}_REM}-->
                                 </name>
                                 <forwarding-class>
                                    <name>FC_TOLL_VOICE_AND_SIGNALING</name>
                                    <scheduler>RP</scheduler>
                                 </forwarding-class>
                                    <xsl:if test="$isAF3Selected = 'true'">
                                     <forwarding-class>
                                        <name>FC_LOW_LATENCY_DATA_GREEN</name>
                                        <scheduler>
                                           <xsl:value-of select="$schedularNameAF3"/><!--AF_{AF3%}-->
                                        </scheduler>
                                     </forwarding-class>
                                    </xsl:if>
                                    <xsl:if test="$isAF2Selected = 'true'">
                                        <forwarding-class>
                                           <name>FC_HIGH_THROUGHPUT_DATA</name>
                                           <scheduler>
                                              <xsl:value-of select="$schedularNameAF2"/><!--AF_{AF2%}-->
                                           </scheduler>
                                        </forwarding-class>
                                    </xsl:if>
                                    <xsl:if test="$isAF1Selected = 'true'">
                                        <forwarding-class>
                                           <name>FC_LOW_PRIORITY_DATA_GREEN</name>
                                           <scheduler>
                                              <xsl:value-of select="$schedularNameAF1"/><!--AF_{AF1%}-->
                                           </scheduler>
                                        </forwarding-class>
                                    </xsl:if>
                                    <forwarding-class>
                                    <name>FC_BEST_EFFORT_DATA_GREEN</name>
                                    <scheduler>AF_REM</scheduler>
                                 </forwarding-class>
                                 </scheduler-maps>
                              </xsl:if>
                           
                           
                           <!-- This is where we will use logic in the XSL to determine if this profile exists using the passed in variables
                               - if yes, use existing, if not must create it -->
                           
                           <!-- choose this one if "BE" is not enabled -->
                           <!--<xsl:if test="$beService = 'false' and $efService = 'false'">  TODO: verify with john-->
                           <xsl:if test="$beService = 'false' and $traficControlProfileSearch_Count = 0 "> <!--  -->
                              <traffic-control-profiles>
                                 <name>
                                    <xsl:value-of select="$trafic-control-profile-name"/><!--L3VPN_{Access Rate}_<EF | NOEF>_{AF3%_AF2%_AF1%}-->
                                 </name>
                                 <xsl:if test="$efService = 'true'">
                                    <scheduler-map>
                                       <xsl:value-of select="$schedularMapNameEF"/><!--SM_<EF | NOEF>_{AF3%_AF2%_AF1%}-->
                                    </scheduler-map>
                                 </xsl:if>
                                 <xsl:if test="$efService = 'false'">
                                    <scheduler-map>
                                       <xsl:value-of select="$schedularMapNameNOEF"/><!--SM_<EF | NOEF>_{AF3%_AF2%_AF1%}-->
                                    </scheduler-map>
                                 </xsl:if>
                                       <shaping-rate>
                                          <rate>
                                             <xsl:value-of select="$shapingRate"/><!--{Access Rate}-->
                                          </rate>
                                       </shaping-rate>
                              </traffic-control-profiles>
                           </xsl:if>
                           
                           <!-- choose this one if "BE" is enabled -->
                          <!-- <xsl:if test="$beService = 'true' and $efService = 'false'"> TODO: verify with john -->
                           <xsl:if test="$beService = 'true' and $traficControlProfileRemSearch_Count = 0 "><!-- -->
                              <traffic-control-profiles>
                                 <name>
                                    <xsl:if test="$efService = 'true'">
                                       <xsl:value-of select="$trafic-control-profile-name"/><!--L3VPN_{Access Rate}_<EF | NOEF>_{AF3%_AF2%_AF1%}_REM-->
                                    </xsl:if>
                                    <xsl:if test="$efService = 'false'">
                                       <xsl:value-of select="$trafic-control-profile-name-rem"/><!--L3VPN_{Access Rate}_<EF | NOEF>_{AF3%_AF2%_AF1%}_REM-->
                                    </xsl:if>
                                 </name>
                                    <scheduler-map>
                                       <!--SM_<EF | NOEF>_{AF3%_AF2%_AF1%}_REM-->
                                       <xsl:if test="$efService = 'true'">
                                          <xsl:value-of select="$schedularMapNameEF-REM"/>
                                       </xsl:if>
                                       <xsl:if test="$efService = 'false'">
                                          <xsl:value-of select="$schedularMapNameNOEF-REM"/>
                                       </xsl:if>
                                    </scheduler-map>
                                       <shaping-rate>
                                          <rate>
                                             <xsl:value-of select="$shapingRate"/><!--{Access Rate}-->
                                          </rate>
                                       </shaping-rate>
                              </traffic-control-profiles>
                           </xsl:if>
                           <!-- choose this one for the following combination:  EF, All AF -->
                           <interfaces>
                           <xsl:if test="$efService = 'true' and $isAllAFSelected='true'">
                            <interface>
                               <name>
                                  <xsl:value-of select="$port"/>
                               </name>
                               <unit>
                                  <name>
                                     <xsl:value-of select="$VLAN_ID"/>
                                  </name>
                                  <output-traffic-control-profile>
                                     <profile-name>
                                        <xsl:value-of select="concat('L3VPN', '_', $accessRate, '_','EF', '_', $AF3, '_', $AF2, '_', $AF1)" /><!--L3VPN_{Access Rate}_EF_{AF3%_AF2%_AF1%}-->
                                     </profile-name>
                                  </output-traffic-control-profile>
                                  
                                  <!-- choose the classifier based on UI selection -->
                                  
                                  <classifiers>
                                     <xsl:if test="$classifier = 'v2-DSCP(default)'">
                                       <dscp>
                                          <name>IPv2_PREMIUM</name>
                                       </dscp>
                                     </xsl:if>
                                     <xsl:if test="$classifier = 'v2-802.1p'">
                                        <ieee-802.1>
                                           <classifier-name>IPv2_PREMIUM_DOT1P</classifier-name>
                                        </ieee-802.1>
                                     </xsl:if>
                                     <xsl:if test="$classifier = 'v2-802.1ad'">
                                        <ieee-802.1ad>
                                           <classifier-name>IPv2_PREMIUM_DEI</classifier-name>
                                        </ieee-802.1ad>
                                     </xsl:if>
                                  </classifiers>
                               </unit>
                            </interface>
                           </xsl:if>
                           
                           <!-- choose this one for the following combination:  All AF -->
                           <xsl:if test="$isAllAFSelected='true' and $efService='false'">
                           <interface>
                              <name>
                                 <xsl:value-of select="$port"/>
                              </name>
                              <unit>
                                 <name>
                                    <xsl:value-of select="$VLAN_ID"/>
                                 </name>
                                 <output-traffic-control-profile>
                                    <profile-name>
                                       <xsl:value-of select="concat('L3VPN', '_', $accessRate, '_','NOEF', '_', $AF3, '_', $AF2, '_', $AF1)" /><!--L3VPN_{Access Rate}_NOEF_{AF3%_AF2%_AF1%}-->
                                    </profile-name>
                                 </output-traffic-control-profile>
                                 
                                 <!-- choose the classifier based on UI selection -->
                                 
                                 <classifiers>
                                    <xsl:if test="$classifier = 'v2-DSCP(default)'">
                                     <dscp>
                                        <name>IPv2_ENHANCED</name>
                                     </dscp>
                                    </xsl:if>
                                    <xsl:if test="$classifier = 'v2-802.1p'">
                                       <ieee-802.1>
                                          <classifier-name>IPv2_ENHANCED_DOT1P</classifier-name>
                                       </ieee-802.1>
                                    </xsl:if>
                                    <xsl:if test="$classifier = 'v2-802.1ad'">
                                     <ieee-802.1ad>
                                        <classifier-name>IPv2_ENHANCED_DEI</classifier-name>
                                     </ieee-802.1ad>
                                    </xsl:if>
                                 </classifiers>
                                 
                              </unit>
                           </interface>
                           </xsl:if>
                           
                           <!-- choose this one for the following combination:  AF3 -->
                           <xsl:if test="$isAF3Selected='true' and $isAF1Selected='false' and $isAF2Selected='false'">
                           <interface>
                              <name>
                                 <xsl:value-of select="$port"/>
                              </name>
                              <unit>
                                 <name>
                                    <xsl:value-of select="$VLAN_ID"/>
                                 </name>
                                 <output-traffic-control-profile>
                                    <profile-name>
                                      <!-- <xsl:value-of select="concat('L3VPN', '_', $accessRate, '_','NOEF', '_', 'AF3', '_', '100', '_', 'AF2', '_', '0', '_', 'AF1', '_', '0')" />L3VPN_{Access Rate}_NOEF_AF3_100_AF2_0_AF1_0-->
                                       <xsl:if test="$efService='true'">
                                          <xsl:value-of select="concat('L3VPN', '_', $accessRate, '_','EF', '_',  '100', '_',  '0', '_',  '0')" />
                                       </xsl:if>
                                       <xsl:if test="$efService='false'">
                                          <xsl:value-of select="concat('L3VPN', '_', $accessRate, '_','NOEF', '_',  '100', '_',  '0', '_',  '0')" />
                                       </xsl:if>
                                    </profile-name>
                                 </output-traffic-control-profile>
                                 
                                 <!-- choose the classifier based on UI selection -->
                                 
                                 <classifiers>
                                    <xsl:if test="$classifier = 'v2-DSCP(default)'">
                                    <dscp>
                                       <name>IPv2_AF3_ONLY</name>
                                    </dscp>
                                    </xsl:if>
                                    <xsl:if test="$classifier = 'v2-802.1p'">
                                    <ieee-802.1p>
                                       <classifier-name>IPv2_AF3_DOT1P</classifier-name>
                                    </ieee-802.1p>
                                    </xsl:if>
                                    <xsl:if test="$classifier = 'v2-802.1ad'">
                                    <ieee-802.1ad>
                                       <classifier-name>IPv2_AF3_DEI</classifier-name>
                                    </ieee-802.1ad>
                                    </xsl:if>
                                 </classifiers>
                              </unit>
                           </interface>
                           </xsl:if>
                           
                           <!-- choose this one for the following combination:  AF2 -->
                           <xsl:if test="$isAF2Selected='true' and $isAF1Selected='false' and $isAF3Selected='false'">
                              <interface>
                                 <name>
                                    <xsl:value-of select="$port"/>
                                 </name>
                                 <unit>
                                    <name>
                                       <xsl:value-of select="$VLAN_ID"/>
                                    </name>
                                    <output-traffic-control-profile>
                                       <profile-name>
                                          <xsl:if test="$efService='true'">
                                             <xsl:value-of select="concat('L3VPN', '_', $accessRate, '_','EF', '_', '0', '_', '100', '_', '0')" /><!--L3VPN_{Access Rate}_NOEF_AF2_100_AF2_0_AF1_0-->
                                          </xsl:if>
                                          <xsl:if test="$efService='false'">
                                             <xsl:value-of select="concat('L3VPN', '_', $accessRate, '_','NOEF', '_', '0', '_', '100', '_', '0')" /><!--L3VPN_{Access Rate}_NOEF_AF2_100_AF2_0_AF1_0-->
                                          </xsl:if>
                                       </profile-name>
                                    </output-traffic-control-profile>
                                    
                                    <!-- choose the classifier based on UI selection -->
                                    
                                    <classifiers>
                                       <xsl:if test="$classifier = 'v2-DSCP(default)'">
                                       <dscp>
                                          <name>IPv2_AF2_ONLY</name>
                                       </dscp>
                                       </xsl:if>
                                       <xsl:if test="$classifier = 'v2-802.1p'">
                                       <ieee-802.1>
                                          <classifier-name>IPv2_AF2_DOT1P</classifier-name>
                                       </ieee-802.1>
                                       </xsl:if>
                                       <xsl:if test="$classifier = 'v2-802.1ad'">
                                       <ieee-802.1ad>
                                          <classifier-name>IPv2_AF2_DEI</classifier-name>
                                       </ieee-802.1ad>
                                       </xsl:if>
                                    </classifiers>
                                 </unit>
                              </interface>
                           </xsl:if>
                           <!-- choose this one for the following combination:  AF1 -->
                           <xsl:if test="$isAF1Selected='true' and $isAF2Selected='false' and $isAF3Selected='false'">
                              <interface>
                                 <name>
                                    <xsl:value-of select="$port"/>
                                 </name>
                                 <unit>
                                    <name>
                                       <xsl:value-of select="$VLAN_ID"/>
                                    </name>
                                    <output-traffic-control-profile>
                                       <profile-name>
                                          <xsl:if test="$efService='true'">
                                             <xsl:value-of select="concat('L3VPN', '_', $accessRate, '_','EF', '_',  '0', '_', '0', '_',  '100')" /><!--L3VPN_{Access Rate}_NOEF_AF3_0_AF2_0_AF1_100-->
                                          </xsl:if>
                                          <xsl:if test="$efService='false'">
                                             <xsl:value-of select="concat('L3VPN', '_', $accessRate, '_','NOEF', '_',  '0', '_', '0', '_',  '100')" /><!--L3VPN_{Access Rate}_NOEF_AF3_0_AF2_0_AF1_100-->
                                          </xsl:if>
                                       </profile-name>
                                    </output-traffic-control-profile>
                                    <!-- choose the classifier based on UI selection -->
                                    
                                    <classifiers>
                                       <xsl:if test="$classifier = 'v2-DSCP(default)'">
                                       <dscp>
                                          <name>IPv2_AF1_ONLY</name>
                                       </dscp>
                                       </xsl:if>
                                       <xsl:if test="$classifier = 'v2-802.1p'">
                                       <ieee-802.1>
                                          <classifier-name>IPv2_AF1_DOT1P</classifier-name>
                                       </ieee-802.1>
                                       </xsl:if>
                                       
                                       <xsl:if test="$classifier = 'v2-802.1ad'">
                                       <ieee-802.1ad>
                                          <classifier-name>IPv2_AF1_DEI</classifier-name>
                                       </ieee-802.1ad>
                                       </xsl:if>
                                    </classifiers>
                                 </unit>
                              </interface>
                           </xsl:if>
                           </interfaces>
                        </class-of-service>
                        </xsl:if>
                        
                        <!-- CLASS-OF-SERVICE END -->
                        
						      <!-- CLASS-OF-POLICY START -->
                        <policy-options>
                           <!-- L3VPN VRF Policy-->
                           
                           <!-- Used for all topologies -->
                           <xsl:if test="$topology = 'Full Mesh'">
                               <community>
                                  <name>
                                     <xsl:value-of select="$rtCommunityName" />
                                  </name>
                                  
                                  <members>
                                     <xsl:if test="$topology = 'Full Mesh'">
                                        <xsl:value-of select="$targetCommunityMemberMesh" />
                                     </xsl:if>
                                  </members>
                                
                               </community>
                           </xsl:if>
                           
                           <xsl:if test="$topology = 'Hub &amp; Spoke' "> <!-- and $topologyType = 'HUB' -->
                              <community>
                                 <name>
                                    <xsl:value-of select="concat($RT, '_' ,  $vpnName, '_VPRN', $SERVICE_ID, '_', 'HUB')" />
                                  </name>
                                 
                                 <members>
                                      <xsl:value-of select="$targetCommunityMemberForHub" />
                                 </members>
                                 
                              </community>
                           </xsl:if>
                           <xsl:if test="$topology = 'Hub &amp; Spoke'"> <!--  and $topologyType = 'SPK' -->
                            <community>
                                 <name>
                                    <xsl:value-of select="concat($RT, '_' ,  $vpnName, '_VPRN', $SERVICE_ID, '_', 'SPK')" />
                                 </name>
                                <members>
                                    <xsl:value-of select="$targetCommunityMemberForSpoke" />
                                 </members>
                              </community>
                           </xsl:if>
                           
                           <!-- Site of Origin (always configured) -->
                           <community>
                              <!-- name comes from SOO_<CIU_Name>_<VRF_Name> -->
                              <name>
                                 <xsl:value-of select="$sooCommunityName" />
                              </name>
                              <!-- members comes from origin:<ID>:<Sequence Number> -->
                              <members>
                                 <xsl:value-of select="$originCommunityMember" />
                              </members>
                           </community>
                           
                           <xsl:if test="$endPointServiceType = 'TML3'">
                              <prefix-list>
                                 <!-- prefix-list for the CIU must be created always -
                                    MGMT loopback = <VRF Name>_LB_MGMT -->
                                   
                                 <name>
                                    <xsl:value-of select="$prefixMgmtName" />
                                 </name>
                                 <xsl:if test="$endPointServiceType = 'TML3'">
                                    <prefix-list-item>
                                       <!-- IP address is the CIU loopback address -->
                                       <name>
                                          <xsl:value-of select="$ciuLoopbackAndSubnetMask"/>
                                       </name>
                                    </prefix-list-item>
                                 </xsl:if>
                              </prefix-list>
                              <prefix-list>
                                 <!-- prefix-list for the CIU must be created always -
                                     MGMT loopback = <VRF Name>_LB_MGMT-->
   
                                 <name>
                                    <xsl:value-of select="$prefixPerfName" />
                                 </name>
                                 <xsl:if test="$endPointServiceType = 'TML3'">
                                    <prefix-list-item>
                                       <!-- IP address is the CIU loopback address -->
                                       <name>
                                          <xsl:value-of select="$ciuLoopbackAndSubnetMask"/>
                                       </name>
                                    </prefix-list-item>
                                 </xsl:if>
                              </prefix-list>
                            </xsl:if> 
                           
                           <!-- VRF Import Policy -->
                           
                           <policy-statement>
                              <name>
                                 <xsl:value-of select="$VRFImportPolicyName"/><!-- $vpnName_VPRN$serviceId_$topology_IMP -->
                              </name>
                              
                              <!-- THIS TERM IS TML3 ONLY -->
                              <xsl:if test="$endPointServiceType = 'TML3'">
                                 <term>
                                    <!-- this is a fixed name for the CIU Management VRF  -->
                                    <name>NMC_MGMT_770</name>
                                    <from>
                                       <protocol>bgp</protocol>
                                       <!-- this is a pre-existing community for the CIU Management VRF  -->
                                       <community>RT_NMC_MGMT_770</community>
                                    </from>
                                    <then>
                                       <accept/>
                                    </then>
                                 </term>
                              
                                 <!-- THIS TERM IS TML3 ONLY -->
                                 
                                 <term>
                                    <!-- this is a fixed name  -->
                                    <name>BRIX_import</name>
                                    <from>
                                       <protocol>bgp</protocol>
                                       <!-- this is a pre-existing community for the CIU Management VRF  -->
                                       <community>RT_BRIX</community>
                                    </from>
                                    <then>
                                       <accept/>
                                    </then>
                                 </term>
                                 
                                 <!-- THIS TERM IS TML3 ONLY -->
                                 
                                 <term>
                                    <!-- this is a fixed name  -->
                                    <name>PERF_HUB</name>
                                    <from>
                                       <protocol>bgp</protocol>
                                       <!-- this is a pre-existing community for the CIU Management VRF  -->
                                       <community>RT_PERF_HUB</community>
                                    </from>
                                    <then>
                                       <accept/>
                                    </then>
                                 </term>
                              </xsl:if>
                              
                              <!-- THIS TERM IS TML3 AND CML3 -->
                              <xsl:if test="$endPointServiceType = 'TML3' or $endPointServiceType = 'CML3'">
                                    <xsl:if test="$topology = 'Full Mesh'">
                                       <term>
                                          <name>
                                             <xsl:value-of select="$vpnName"/><!--$vpnName--></name>
                                          <from>
                                             <protocol>bgp</protocol>
                                             <community>
                                                  <xsl:value-of select="concat($RT, '_' ,  $vpnName, '_VPRN', $SERVICE_ID, '_', 'MSH')" />
                                             </community>
                                          </from>
                                          <then>
                                             <accept/>
                                          </then>
                                       </term>
                                    </xsl:if>
                                 <xsl:if test="$topology = 'Hub &amp; Spoke' and $topologyType = 'SPK'">
                                       <term>
                                          <name>
                                             <xsl:value-of select="$vpnName"/><!--$vpnName--></name>
                                          <from>
                                             <protocol>bgp</protocol>
                                             <community>
                                                <xsl:value-of select="concat($RT, '_' ,  $vpnName, '_VPRN', $SERVICE_ID, '_', 'HUB')" />
                                              </community>
                                          </from>
                                          <then>
                                             <accept/>
                                          </then>
                                       </term>
                                 </xsl:if>
                                 <xsl:if test="$topology = 'Hub &amp; Spoke' and $topologyType = 'HUB'">
                                       <term>
                                          <name>
                                             <xsl:value-of select="$vpnName"/><!--$vpnName--></name>
                                          <from>
                                             <protocol>bgp</protocol>
                                             <community>
                                                 <xsl:value-of select="concat($RT, '_' ,  $vpnName, '_VPRN', $SERVICE_ID, '_', 'SPK')" />
                                               </community>
                                          </from>
                                          <then>
                                             <accept/>
                                          </then>
                                       </term>
                                    </xsl:if>
                                
                                 
                                 <!-- THIS TERM IS TML3 AND CML3 -->
                                 
                                 <term>
                                    <name>Last_Reject</name>
                                    <then>
                                       <reject/>
                                    </then>
                                 </term>
                              </xsl:if>
                           </policy-statement>
                           
                           <!-- VRF Export Policy -->
                           
                           <policy-statement>
                              
                              <name>
                                 <xsl:value-of select="$VRFExportPolicyName"/> <!-- $vpnName_VPRN$serviceId_$topology_EXP -->
                              </name>
                              
                              <!-- THIS TERM IS TML3 ONLY -->
                              <xsl:if test="$endPointServiceType = 'TML3'">
                                 <term>
                                    <name>LB_MGMT</name>
                                    <from>
                                       <protocol>bgp</protocol>
                                       <prefix-list>
                                          <xsl:value-of select="$prefixMgmtName" />
                                       </prefix-list>
                                    </from>
                                    <then>
                                       <community>
                                          <add/>
                                          <!-- this is a pre-existing community for the CIU Management VRF  -->
                                          <community-name>RT_CPE_MGMT_771</community-name>
                                       </community>
                                       <accept/>
                                    </then>
                                 </term>
                                 
                                 <!-- THIS TERM IS TML3 ONLY -->
                                 
                                 <term>
                                    <name>
                                       <xsl:value-of select="$prefixPerfName" /> <!-- $ciuName_$vpnName_PERF -->
                                    </name>
                                    <from>
                                       <prefix-list>
                                          <xsl:value-of select="$prefixPerfName" /> <!-- $ciuName_$vpnName_PERF -->
                                       </prefix-list>
                                    </from>
                                    <then>
                                       <community>
                                          <add/>
                                          <!-- this is a pre-existing community for the CIU Management VRF  -->
                                          <community-name>RT_CPE_MGMT_771</community-name>
                                       </community>
                                       <accept/>
                                    </then>
                                 </term>
                              </xsl:if>
                              
                              <!-- THIS TERM IS TML3 AND CML3 -->
                              <xsl:if test="$endPointServiceType = 'TML3' or $endPointServiceType = 'CML3'">
                                 <term>
                                    <name>
                                       <xsl:value-of select="$TML_CML_TermName" /><!--  $ciuName_$vpnName-->
                                    </name>
                                    <from>
                                       <protocol>bgp</protocol>
                                       <protocol>direct</protocol>
                                    </from>
                                    <then>
                                       <community>
                                          <add/>
                                          <community-name>
                                             <xsl:value-of select="$rtCommunityName" /><!--RT_$vpnName_VPRN$serviceId_$topology-->
                                          </community-name>
                                       </community>
                                       <accept/>
                                    </then>
                                 </term>
                                 
                                 <!-- THIS TERM IS TML3 AND CML3 -->
                                 
                                 <term>
                                    <name>last</name>
                                    <then>
                                       <reject/>
                                    </then>
                                 </term>
                              </xsl:if>
                           </policy-statement>
                           
                           <!-- BGP Policy -->
                           <!-- BGP Import Policy -->
                           <!-- This import policy is for the Customer routes and is applied at the protocols bgp layer
                              of the routing-instance-->
                              
                           
                           <!-- THIS POLICY IS TML3 AND CML3 -->
                           <xsl:if test="$endPointServiceType = 'TML3' or $endPointServiceType = 'CML3'">
                              <policy-statement>
                                 <name>
                                    <xsl:value-of select="$BGP_TML3_CML3_ImportPolicyName" /><!--SET_LP_$pathPreferencesSOO_$ciuName_$vpnName-->
                                 </name>
                                 <xsl:if test="$isIPv6Selected = 'true'">
                                    <term>
                                       <name>v6</name>
                                       <from>
                                          <family>inet6</family>
                                       </from>
                                       <then>
                                          <next-hop>
                                             <address>
                                              <xsl:value-of select="$ipv6NextHOP" />
                                            </address>  
                                          </next-hop>
                                          <next>term</next>
                                       </then>
                                    </term>
                                 </xsl:if> 
                                 <term>
                                    <name>SOO</name>
                                    <then>
                                       <local-preference>120</local-preference>
                                       <community>
                                          <add/>
                                          <community-name>
                                             <xsl:value-of select="$sooCommunityName" /><!--SOO_$ciuName_$vpnName-->
                                          </community-name>
                                       </community>
                                       <accept/>
                                    </then>
                                 </term>
                                 <term>
                                    <name>last</name>
                                    <then>
                                       <reject/>
                                    </then>
                                 </term>
                              </policy-statement>
                           </xsl:if>
                           
                           <!-- BGP Export Policy -->
                           
                           <!-- This export policy is for the Customer routes and is applied at the protocols bgp layer
                              of the routing-instance -->
                           
                           <!-- THIS POLICY IS TML3 BGP Export -->
                           <xsl:if test="$endPointServiceType = 'TML3'">
                              <policy-statement>
                                 <name>
                                    <xsl:value-of select="$BGP_TML3_ExportPolicyName" /><!--FILTER_SOO_$ciuName_$vpnName-->
                                 </name>
                                 <term>
                                    <name>Deny Route From Same Site</name>
                                    <from>
                                       <community>
                                          <xsl:value-of select="$sooCommunityName" /><!--SOO_$ciuName_$vpnName-->
                                       </community>
                                    </from>
                                    <then>
                                       <reject/>
                                    </then>
                                 </term>
                                 <term>
                                    <name>Direct Route</name>
                                    <from>
                                       <protocol>direct</protocol>
                                    </from>
                                    <then>
                                       <accept/>
                                    </then>
                                 </term>
                                 <term>
                                    <name>last</name>
                                    <then>
                                       <community>
                                          <delete/>
                                          <community-name>match-target</community-name>
                                       </community>
                                       <community>
                                          <delete/>
                                          <community-name>match-origin</community-name>
                                       </community>
                                       <accept/>
                                    </then>
                                 </term>
                              </policy-statement>
                           </xsl:if>
                           
                           <!-- THIS POLICY IS CML3 BGP Export -->
                           <xsl:if test="$endPointServiceType = 'CML3'">
                              <policy-statement>
                                 <name>
                                    <xsl:value-of select="$BGP_CML3_ExportPolicyName" /><!--$ciuName_$vpnName_CML3_EXP-->
                                 </name>
                                 <term>
                                    <name>FILTER_SOO</name>
                                    <from>
                                       <community>
                                          <xsl:value-of select="$sooCommunityName" /><!--SOO_$ciuName_$vpnName-->
                                       </community>
                                    </from>
                                    <then>
                                       <reject/>
                                    </then>
                                 </term>
                                 <term>
                                    <name>CPE_MGT_FILTER</name>
                                    <from>
                                       <community-name>RT_CPE_MGMT_771</community-name>
                                    </from>
                                    <then>
                                       <reject/>
                                    </then>
                                 </term>
                                 <term>
                                    <name>NOC_MGT_FILTER</name>
                                    <from>
                                       <community>RT_NMC_MGMT_770</community>
                                    </from>
                                    <then>
                                       <reject/>
                                    </then>
                                 </term>
                                 <term>
                                    <name>BRIX_ROUTE_FILTER</name>
                                    <from>
                                       <community>RT_BRIX</community>
                                    </from>
                                    <then>
                                       <reject/>
                                    </then>
                                 </term>
                                 <term>
                                    <name>PERF_HUB_ROUTES_FILTER</name>
                                    <from>
                                       <community>RT_PERF_HUB</community>
                                    </from>
                                    <then>
                                       <reject/>
                                    </then>
                                 </term>
                                 <term>
                                    <name>last</name>
                                    <then>
                                       <community>
                                          <delete/>
                                          <community-name>match-target</community-name>
                                       </community>
                                       <community>
                                          <delete/>
                                          <community-name>match-origin</community-name>
                                       </community>
                                       <accept/>
                                    </then>
                                 </term>
                              </policy-statement>
                           </xsl:if>
                           
                           </policy-options>
                        
                        <!-- CLASS-OF-POLICY END -->
                     
                        <!-- ROUTING-INSTANCES STANZA -->
                        <routing-instances>
                           <instance>
                              <name>
                                 <xsl:value-of select="$SERVICE_ID"/>
                              </name>
                              <description>
                                    <!--ge-0/3/4.telus vpn.Full Mesh-->
                                 <xsl:value-of select="$routingInstanceDescription"/>
                              </description>
                              <instance-type>vrf</instance-type>
                              <interface>
                                 <name>
                                    <xsl:value-of select="$interfaceName"/><!--ge-0/3/4.591-->
                                 </name>
                              </interface>
                              <route-distinguisher>
                                 <rd-type>
                                    <!--60001:3100-->
                                    <xsl:value-of select="$RD_TYPE"/>
                                 </rd-type>
                              </route-distinguisher>
                              
                             <vrf-import>
                                 <xsl:value-of select="$VRFImportPolicyName"/> 
                              </vrf-import>
                              <vrf-export>
                                 <xsl:value-of select="$VRFExportPolicyName"/>
                              </vrf-export>
                              <protocols>
                                 <bgp>
                                   <hold-time>45</hold-time>
                                    <group>
                                       <name>
                                          <xsl:value-of select="$customerName"/>
                                       </name>
                                       <type>external</type>
                                       <peer-as>
                                          <xsl:value-of select="$peerAS"/><!--60001-->
                                       </peer-as>
                                       <as-override/>
                                       <neighbor>
                                          <name>
                                             <xsl:value-of select="$bgpNeighbourAddress"/> <!--11.1.2.4-->
                                          </name>
                                          <description>
                                             <!--BPS222.test1..telus vpn.Primary-->
                                             <xsl:value-of select="$routingInstanceBGPDescription"/>
                                          </description>
                                          <metric-out>
                                             <metric-value>
                                                <xsl:value-of select="$med"/>
                                             </metric-value> <!-- MED -->
                                          </metric-out>
                                          <local-preference>
                                             <xsl:value-of select="$localPref"/>
                                          </local-preference>
                                         <import>
                                             <xsl:value-of select="$BGP_TML3_CML3_ImportPolicyName"/>
                                             <!--<FILTER_SOO_<CIU Name>_<VRF Name> change the variablename.. -->
                                          </import>
                                          <!-- if enforce route true -->
                                          <xsl:if test="$enforceRoute = 'true'">
                                             <family>
                                                <inet>
                                                   <unicast>
                                                      <prefix-limit>
                                                         <maximum>
                                                            <xsl:value-of select="$maxRoute"/>
                                                         </maximum> <!-- if true  -->
                                                      </prefix-limit>
                                                   </unicast>
                                                </inet>
                                             </family>
                                          </xsl:if>
                                          <authentication-key>
                                             <xsl:value-of select="$csId"/>
                                          </authentication-key><!-- csId -->
                                          <!-- This next line is the new addition: -->
                                          <export>
                                             <xsl:if test="$endPointServiceType = 'TML3'">
                                                <xsl:value-of select="$BGP_TML3_ExportPolicyName"/>
                                             </xsl:if>
                                             <xsl:if test="$endPointServiceType = 'CML3'">
                                                <xsl:value-of select="$BGP_CML3_ExportPolicyName"/>
                                             </xsl:if>
                                             </export>
                                         <!--
                                             <multipath>
                                             </multipath>
                                          -->
                                       </neighbor>
                                    </group>
                                 </bgp>
                              </protocols>
                           </instance>
                        </routing-instances>
                          </xsl:when>
                          <xsl:when test="$recordOPType = 'DELETE'">
                              <interfaces>
                                 <interface>
                                    <name>
                                       <!-- <xsl:value-of select="$INTERFACE_NAME"/> -->
                                       <xsl:value-of select="$port"/>
                                    </name>
                                    
                                    <!-- UNIT SUB-STANZA -->
                                    <unit operation="delete">
                                       <name>
                                          <xsl:value-of select="$VLAN_ID"/>
                                       </name>		
                                    </unit>
                                 </interface>
                              </interfaces>
                             <!-- <routing-instances>
                                 <instance operation="delete">
                                    <name>
                                       <xsl:value-of select="$SERVICE_ID"/>
                                    </name>
                                 </instance>
                              </routing-instances>
                              -->
                              <policy-options>
                                 
                                 <policy-statement operation="delete">
                                    <name>
                                       <xsl:value-of select="$BGP_TML3_CML3_ImportPolicyName" />
                                    </name>
                                 </policy-statement>
                                 <policy-statement operation="delete">
                                    <name>
                                       <xsl:value-of select="$VRFImportPolicyName"/>
                                    </name>
                                 </policy-statement>
                                 <policy-statement operation="delete">
                                    <name>
                                       <xsl:value-of select="$VRFExportPolicyName"/>
                                    </name>
                                 </policy-statement>
                                 <xsl:if test="$endPointServiceType = 'CML3'">
                                    <policy-statement operation="delete">
                                       <name>
                                          <xsl:value-of select="$BGP_CML3_ExportPolicyName"/>
                                       </name>
                                    </policy-statement>
                                 </xsl:if>
                                 <xsl:if test="$endPointServiceType = 'TML3'">
                                    <policy-statement operation="delete">
                                       <name>
                                          <xsl:value-of select="$BGP_TML3_ExportPolicyName"/>
                                       </name>
                                    </policy-statement>
                                 </xsl:if>
                                 
                                 <community operation="delete">
                                    <name>
                                       <xsl:value-of select="$rtCommunityName" />
                                    </name>
                                 </community>
                                 <community operation="delete">
                                    <name>
                                       <xsl:value-of select="$sooCommunityName" />
                                    </name>
                                 </community>
                                 <prefix-list operation="delete">
                                    <name>
                                       <xsl:value-of select="$prefixMgmtName" />
                                    </name>
                                 </prefix-list>
                                 <prefix-list operation="delete">
                                    <name>
                                       <xsl:value-of select="$prefixPerfName" />
                                    </name>
                                 </prefix-list>
                              </policy-options>
                              
                              <!-- CLASS-OF-SERVICE STANZA -->
                              
                              <xsl:if test="$QoSEnable = 'true'">
                                 <class-of-service>
                                    <interfaces>
                                       <interface>
                                          <name>
                                             <xsl:value-of select="$port"/> 
                                          </name>
                                          
                                          <unit  operation="delete">
                                             <name>
                                                <xsl:value-of select="$VLAN_ID"/>
                                             </name>
                                          </unit>
                                          
                                       </interface>
                                    </interfaces>
                                 </class-of-service>
                              </xsl:if>
                           </xsl:when>
                           <xsl:otherwise>
                           </xsl:otherwise>
                        </xsl:choose>  
                     </configuration>
                  </deviceConfiguration>
                  <!-- "ADD" CONFIGLET ASSEMBLY - END -->
               </xsl:for-each> 
            </serviceRequestConfig>
         </xsl:when>
         
          
         <!-- IF OPTYPE == "DELETE" -->
         <xsl:when test="$opType = 'DELETE'">
           
         </xsl:when>
            
         <xsl:otherwise>
         </xsl:otherwise>
      </xsl:choose>
      <!-- CONFIGLET ASSEMBLY - END -->
      
   </xsl:template>
</xsl:stylesheet>
