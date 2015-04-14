<?xml version='1.0' ?>
<!-- LB_MGMT
***********************************************************
   JNPR RE Device Turnup XSLT TRANSFORMATION SCRIPT
   
      > Support: Bhanu Singh
      > Company: Juniper Networks
      > Contact: bhanus@juniper.net    
      > Version: 1.2           
      > Revision Date: 2015-04-14
      
      [Copyright 2009-2014 Juniper Networks, Inc.]
      [All rights reserved.]
      
***********************************************************
-->

<!--
BELOW IS A SAMPLE 'SERVICEREQUEST.XML' ASSOCIATED WITH THIS XSLT SCRIPT:

<?xml version="1.0"?>
<ns2:ServiceRequest xmlns:ns2="http://provisioning.jmp.juniper.net/servicerequest/dto">
  <ID>5111810</ID>
  <Name>SO243341567</Name>
  <TypeOfRequest>Provisioning</TypeOfRequest>
  <Description/>
  <ServiceType>FLEX</ServiceType>
  <RecoveryState>Default</RecoveryState>
  <OpType>ADD</OpType>
  <ServiceID>0</ServiceID>
  <Createdby>bhanus</Createdby>
  <CreatedDate>2014-10-09T15:33:22.228Z</CreatedDate>
  <LastModifiedDate>2014-10-09T15:33:22.186Z</LastModifiedDate>
  <State>Requested</State>
  <Customer/>
  <ServiceCommonAttributes>
    <e>
      <accounting>false</accounting>
      <application>GEN</application>
      <architecture>JCE</architecture>
      <customer>
        <e>
          <description>admin user</description>
          <email>admin@telus.com</email>
          <id>90</id>
          <name>Telus User</name>
        </e>
      </customer>
      <operationalMode>PEN</operationalMode>
      <qosType>Aggregate per Access</qosType>
      <redistConnRoutes>false</redistConnRoutes>
      <serviceOrderId>3007031</serviceOrderId>
      <topology>Full Mesh</topology>
      <vpnName>7890</vpnName>
    </e>
  </ServiceCommonAttributes>
  <Policy>
    <ID>2425214</ID>
    <Name>L3VPN</Name>
  </Policy>
  <ExtRef>3007031</ExtRef>
  <serviceElementList>
    <serviceElement>
      <deviceID>1671172</deviceID>
      <deviceName>EDTN-LAB-CG01-RE0</deviceName>
      <vendorType>Juniper</vendorType>
      <operation>ADD</operation>
      <entityID>5111811</entityID>
      <seID>0</seID>
      <elementState>0</elementState>
      <elementRecoveryState>Default</elementRecoveryState>
      <ServiceEndpointAttributes>
        <Interface>ge-0/3/4</Interface>
        <accessRate>10M</accessRate>
        <accessType>HS</accessType>
        <af1>50</af1>
        <af2>40</af2>
        <af3>10</af3>
        <ciuAlias>singh</ciuAlias>
        <ciuLoopback>10.3.1.1</ciuLoopback>
        <ciuName>bhanu</ciuName>
        <connectionType>RE Direct</connectionType>
        <csId>TEL123</csId>
        <efRate>10M</efRate>
        <efService>true</efService>
        <endPointServiceType>TML3</endPointServiceType>
        <enforceRoute>true</enforceRoute>
        <innerEncap>1</innerEncap>
        <ipAddress>10.1.1.1</ipAddress>
        <ipMTU>3000</ipMTU>
        <ipv6Address/>
        <ipv6NeighAddress/>
        <ipv6Peer>false</ipv6Peer>
        <localPref>120</localPref>
        <maxRoute>1</maxRoute>
        <med>80</med>
        <multipath>false</multipath>
        <mvpn>false</mvpn>
        <neighbourAddress>10.2.1.1</neighbourAddress>
        <operation>ADD</operation>
        <outerEncap>1</outerEncap>
        <pathPreferences>Primary</pathPreferences>
        <pedeviceId>1671172</pedeviceId>
        <peerAS>60001</peerAS>
        <rd>2900</rd>
        <recordOPType>ADD</recordOPType>
        <rpAddress/>
        <rpGprRange/>
        <rpType null="true"/>
        <rt>222</rt>
        <seId>0</seId>
        <senderSite null="true"/>
        <site>EDTN-LAB-CG01-RE0</site>
        <ssmIP/>
        <ssmIpMask null="true"/>
        <subnetMask>30</subnetMask>
        <vendorType>Juniper</vendorType>
        <outerEncap>621</outerEncap>
      </ServiceEndpointAttributes>
    </serviceElement>
  </serviceElementList>
</ns2:ServiceRequest>



-->
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:ns2="http://provisioning.jmp.juniper.net/servicerequest/dto"
                xmlns:ResourceMap="java:net.juniper.jmp.provisioning.scriptUtil.ResourceMap"
                xmlns:ServiceActivationUtils="java:net.juniper.jmp.provisioning.scriptUtil.ServiceActivationUtils"
                xmlns:junos="http://xml.juniper.net/junos/12.3R6/junos"
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
      <!--<xsl:variable name="vpnName" select="/*/ServiceCommonAttributes/e/vpnName" disable-output-escaping="no"/>-->

      <xsl:variable name="vpnName">
         <xsl:value-of select="/*/ServiceCommonAttributes/e/vpnName" disable-output-escaping="no"/>
      </xsl:variable>      <!--<xsl:variable name="topology" select="/*/ServiceCommonAttributes/e/topology"/>-->
      <xsl:variable name="vpnAlias" select="/*/ServiceCommonAttributes/e/vpnAlias"/>
      
      <xsl:variable name="qosType" select="/*/ServiceCommonAttributes/e/qosType"/>
      <xsl:variable name="application" select="/*/ServiceCommonAttributes/e/application"/>
      <xsl:variable name="flowSampling" select="/*/ServiceCommonAttributes/e/flowSampling"/>
      <xsl:variable name="operationalMode1" select="/*/ServiceCommonAttributes/e/operationalMode"/>
      <xsl:variable name="architecture" select="/*/ServiceCommonAttributes/e/architecture"/>
      <xsl:variable name="redistConnRoutes" select="/*/ServiceCommonAttributes/e/redistConnRoutes"/>
      <xsl:variable name="opType" select="/ns2:ServiceRequest/OpType"/>
      <xsl:variable name="pathId" select="/*/ServiceCommonAttributes/e/pathId"/>
      <xsl:variable name="serviceDefinitionName" select="/ns2:ServiceRequest/Policy/Name"/>
      <xsl:variable name="serviceOrderName" select="/ns2:ServiceRequest/Name"/>
      <xsl:variable name="serviceOrderDescription" select="/ns2:ServiceRequest/Description"/>
      <xsl:variable name="speed" select="/*/ServiceCommonAttributes/e/speed"/>
      <xsl:variable name="userId" select="/ns2:ServiceRequest/Createdby"/>
      <xsl:variable name="maxRoute" select="/*/ServiceCommonAttributes/e/maxRoute"/>
      <xsl:variable name="enforceRoute" select="/*/ServiceCommonAttributes/e/enforceRoute"/>
      
      <xsl:variable name="topology" select="/*/ServiceCommonAttributes/e/topology"/>
      <xsl:variable name="endPointType" select="endPointType"/>
      <xsl:variable name="rtMesh" select="/*/ServiceCommonAttributes/e/rd"/>
      <xsl:variable name="rtHub" select="/*/ServiceCommonAttributes/e/rd"/>
      <xsl:variable name="rtSpoke" select="/*/ServiceCommonAttributes/e/rtSpoke"/>
      <xsl:variable name="rdMesh" select="/*/ServiceCommonAttributes/e/rd"/>
      <xsl:variable name="rdHub" select="/*/ServiceCommonAttributes/e/rd"/>
      <xsl:variable name="rdSpoke" select="/*/ServiceCommonAttributes/e/spkRd"/>
      <xsl:variable name="spkVrfId" select="/*/ServiceCommonAttributes/e/spkVrfId"/>
      
      <xsl:variable name="spkVrfName" select="/*/ServiceCommonAttributes/e/spkVrfName"/>
      <xsl:variable name="vrfName" select="/*/ServiceCommonAttributes/e/vrfName"/>
      
      <xsl:variable name="policyGroup" select="/*/ServiceCommonAttributes/e/policyGroup"/>
      <xsl:variable name="application" select="/*/ServiceCommonAttributes/e/application"/>
      <xsl:variable name="endPointServiceType" select="/*/ServiceCommonAttributes/e/endPointServiceType"/>
      
      <xsl:variable name="vrfName">
         <xsl:choose>
            <xsl:when test="$topology = 'Mesh'">
               <xsl:value-of select="/*/ServiceCommonAttributes/e/vrfName"/>
            </xsl:when>
            <xsl:when test="$topology = 'Hub'">
               <xsl:value-of select="/*/ServiceCommonAttributes/e/vrfName"/>
            </xsl:when>
            <xsl:otherwise> <!-- Spoke-->
               <xsl:value-of select="/*/ServiceCommonAttributes/e/spkVrfName"/>
            </xsl:otherwise>
         </xsl:choose>
      </xsl:variable>
      
  <!-- TOP-LEVEL DERIVATIONS - END -->
      
      
      <!-- CONSTANT PARAMS ... -->
      <xsl:variable name="smallcase" select="'abcdefghijklmnopqrstuvwxyz'" />
      <xsl:variable name="uppercase" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'" />
      <xsl:variable name="INVENTORY_TYPE_CONFIGURATION" select="'configuration'"/>
      <xsl:variable name="AS_NUMBER" select="'852'"/>
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
      
      
      <xsl:variable name="topologyType">
         <xsl:choose>
            <xsl:when test="$topology = 'Mesh'">
               <xsl:value-of select="$MSH"/>
            </xsl:when>
            <xsl:when test="$topology = 'Hub'">
               <xsl:value-of select="$HUB"/>
            </xsl:when>
            <xsl:when test="$topology = 'Spoke'">
               <xsl:value-of select="$SPK"/>
            </xsl:when>
            <xsl:otherwise>
               
            </xsl:otherwise>
         </xsl:choose>
      </xsl:variable>
      
      <xsl:variable name="QoSEnable" select="'true'"/>
   
      <!-- CONFIGLET ASSEMBLY - BEGIN -->
      <xsl:choose>
         <!-- IF OPTYPE == "ADD" -->
         <xsl:when test="$opType = 'ADD'">
            <serviceRequestConfig>   <!-- Insert document root element (<serviceRequestConfig>) here -->
            
               <!-- JNPR PE ENDPOINT CONFIG -->
               <xsl:for-each select="/ns2:ServiceRequest/serviceElementList/serviceElement/ServiceEndpointAttributes[vendorType = 'Juniper']">
               
                  <!-- DEVICE-LEVEL DERIVATIONS - BEGIN -->
			         <xsl:variable name="CARRIER-FACING-VLAN-ID" select="outerEncap"/><!--vlan id 200 bps -->
			         <xsl:variable name="VLAN_ID" select="outerEncap"/>
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
                  <xsl:variable name="efRate" select="efRate1"/>
                  <xsl:variable name="typeOfService" select="typeOfService"/>
                  <xsl:variable name="bwLimit" select="bwLimit"/>
                  <xsl:variable name="burstSize" select="burstSize"/>
                  <xsl:variable name="efService" select="efService"/>
                  <xsl:variable name="isbeService" select="beService"/>
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
                  <xsl:variable name="ciuLoopback" select="ciuLoopback"/>
                  <xsl:variable name="loopbackSubnetMask" select="'32'"/>
                  <xsl:variable name="ciuName" select="ciuName"/>
                  <xsl:variable name="ciuAlias" select="ciuAlias"/>
                  
                  <xsl:variable name="siteName" select="site"/>
                  <xsl:variable name="endPointServiceType1" select="endPointServiceType"/>
                  <xsl:variable name="ipv6NextHOP" select="nextHOP"/>
                  
                  <xsl:variable name="multiVRF" select="multiVRF"/>
                  <xsl:variable name="traficControlProfile" select="traficControlProfile"/>
                  <xsl:variable name="qosType" select="qosType"/>
                  <xsl:variable name="autonegotiate" select="autonegotiate"/>
                  <xsl:variable name="adminState" select="adminState"/>
                  <xsl:variable name="portSpeed" select="portSpeed"/>
                  <xsl:variable name="management" select="management"/>
                  
                  
                  <xsl:variable name="operationalMode" select="operationalMode"/>
                  
                  <xsl:variable name="ciuLoopbackAndSubnetMask">
                     <xsl:value-of select="concat($ciuLoopback, '/', $loopbackSubnetMask)"/>
                  </xsl:variable>
                  
                  <xsl:variable name="beService" >
                  <xsl:choose>
                     <xsl:when test="$classifier = '802.1p'">
                        <xsl:value-of select="'true'"/>
                     </xsl:when>
                     <xsl:otherwise>
                        <xsl:value-of select="'false'"/>
                     </xsl:otherwise>
                  </xsl:choose>
                  </xsl:variable>
                  <xsl:variable name="pathPreferences">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'Primary'">
                           <xsl:value-of select="'PRI'"/>
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="'SEC'"/>
                        </xsl:otherwise>
                     </xsl:choose>
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
                
                  <xsl:variable name="RD_TYPE">
                     <xsl:choose>
                        <xsl:when test="$topology = 'Mesh'">
                           <xsl:value-of select="rdMesh"/>
                        </xsl:when>
                        <xsl:when test="$topology = 'Hub'">
                           <xsl:value-of select="rdHub"/>
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="rdSpoke"/>
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                  <xsl:variable name="vrfName111">
                     <xsl:choose>
                        <xsl:when test="$topology = 'Mesh'">
                            <xsl:value-of select="vrfName"/>
                        </xsl:when>
                        <xsl:when test="$topology = 'Hub'">
                           <xsl:value-of select="vrfName"/>
                        </xsl:when>
                        <xsl:otherwise> <!-- Spoke-->
                           <xsl:value-of select="spkVrfName"/>
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                  
                  <xsl:variable name="IPv4AddressMask">
                     <xsl:value-of select="concat($IP-V4-ADDRESS, '/', $IP-V4-MASK)"/>
                  </xsl:variable>
                  
                  <xsl:variable name="ssmGroupRangeAndMask">
                     <xsl:value-of select="concat($ssmIP, '/', $ssmIpMask)"/>
                  </xsl:variable>
                 
                  <xsl:variable name="interfaceName">
                     <xsl:value-of select="concat($port, '.', $VLAN_ID)" />
                  </xsl:variable> 
                  <xsl:variable name="test" select="'&amp;'"/>
                  
                 
                 <xsl:variable name="routingInstanceBGPDescription">          
                    <xsl:value-of select="concat($csId, '.', $ciuName, '...', $endPointServiceType, '.', $application , '.', $protocol, '.', $vrfName, '.', $pathPreferences, '...', $accessOptionConnectionType , '.', $policyGroup, '.', $operationalMode)" />
                  </xsl:variable>
                 
                  <xsl:variable name="vpnSpeed">
                     <xsl:value-of select="concat('V0M', $vpnRate)" />
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
                  
                  <xsl:variable name="schedularMapNameEF1">
                     <xsl:value-of select="concat('SM','_',  'EF','_',  $AF3,'_',  $AF2,'_',  $AF1)" />
                  </xsl:variable>
                  
                  <xsl:variable name="schedularMapNameNOEF1">
                     <xsl:value-of select="concat('SM','_',  'NOEF','_',  $AF3,'_',  $AF2,'_',  $AF1)" />
                  </xsl:variable>
                  
                  <xsl:variable name="interfaceUnitQueryXpath">
                     <xsl:value-of select="concat('configuration/interfaces/interface[name=&quot;', $port, '&quot;]/unit')"/>
                  </xsl:variable>
                  
                  <xsl:variable name="interfaceUnitNodeSet" select="ServiceActivationUtils:getSubTreeFromInventory($deviceID, $vendorType,$INVENTORY_TYPE_CONFIGURATION, $interfaceUnitQueryXpath)"/>
                  
                  <xsl:variable name="interfaceUnitCount">
                     <xsl:value-of select="count($interfaceUnitNodeSet)"/>
                  </xsl:variable>
                  
                  
                  
                  <xsl:variable name="schedularMapName">
                     <xsl:choose>
                        <xsl:when test="$interfaceUnitCount > '0' and $qosType = 'QoS per Access' and $beService = 'false'">
                           <xsl:value-of select="concat('SM','_',  'EF','_',  $AF3,'_',  $AF2,'_',  $AF1)" />
                        </xsl:when>
                        <xsl:when test="$interfaceUnitCount > '0' and $qosType = 'QoS per Access' and $beService = 'true'">
                           <xsl:value-of select="concat('SM','_',  'EF','_',  $AF3,'_',  $AF2,'_',  $AF1, '_', 'SCA')" />
                        </xsl:when>
                        <xsl:when test="$efService = 'true' and $beService = 'true' and $interfaceUnitCount = '0'">
                           <xsl:value-of select="concat('SM','_',  'EF','_',  $AF3,'_',  $AF2,'_',  $AF1, '_', 'SCA')" />
                        </xsl:when>
                        <xsl:when test="$efService = 'true' and $beService = 'false' and $interfaceUnitCount = '0'">
                           <xsl:value-of select="concat('SM','_',  'EF','_',  $AF3,'_',  $AF2,'_',  $AF1)" />
                        </xsl:when>
                        <xsl:when test="$efService = 'false' and $beService = 'true' and $interfaceUnitCount = '0'">
                           <xsl:value-of select="concat('SM','_',  'NOEF','_',  $AF3,'_',  $AF2,'_',  $AF1, '_', 'SCA')" />
                        </xsl:when>
                        <xsl:when test="$efService = 'false' and $beService = 'false' and $interfaceUnitCount = '0'">
                           <xsl:value-of select="concat('SM','_',  'NOEF','_',  $AF3,'_',  $AF2,'_',  $AF1)" />
                        </xsl:when>
                        
                        <xsl:otherwise>
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                  
                  <xsl:variable name="trafic-control-profile-name">
                     <xsl:choose>
                        <xsl:when test="$interfaceUnitCount >= '0' and $qosType = 'QoS per Access'  and $beService = 'false'">
                           <xsl:value-of select="concat('IP_NTWKSv2','_',  $accessRate,'_', 'EF', '_', $AF3,'_',  $AF2,'_',  $AF1)" />
                        </xsl:when>
                        <xsl:when test="$interfaceUnitCount >= '0' and $qosType = 'QoS per Access'  and $beService = 'true'">
                           <xsl:value-of select="concat('IP_NTWKSv2','_',  $accessRate,'_', 'EF', '_', $AF3,'_',  $AF2,'_',  $AF1, '_', 'SCA')" />
                        </xsl:when>
                        <xsl:when test="$efService = 'false' and $beService = 'false' and $interfaceUnitCount = '0'">
                           <xsl:value-of select="concat('IP_NTWKSv2','_',  $accessRate,'_', 'NOEF', '_', $AF3,'_',  $AF2,'_',  $AF1)" />
                        </xsl:when>
                        <xsl:when test="$efService = 'true' and $beService = 'true' and $interfaceUnitCount = '0'">
                           <xsl:value-of select="concat('IP_NTWKSv2','_',  $accessRate,'_', 'EF', '_', $AF3,'_',  $AF2,'_',  $AF1, '_', 'SCA')" />
                        </xsl:when>
                        <xsl:when test="$efService = 'false' and $beService = 'true' and $interfaceUnitCount = '0'">
                           <xsl:value-of select="concat('IP_NTWKSv2','_',  $accessRate,'_', 'NOEF', '_', $AF3,'_',  $AF2,'_',  $AF1, '_', 'SCA')" />
                        </xsl:when>
                        
                        <xsl:otherwise>
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                  <!--
                  <xsl:variable name="trafic-control-profile-name">
                     <xsl:choose>
                        <xsl:when test="$efService = 'true'">
                           <xsl:value-of select="concat('IP_NTWKSv2','_',  $accessRate,'_', 'EF', '_', $AF3,'_',  $AF2,'_',  $AF1)" />
                        </xsl:when>
                        <xsl:when test="$efService = 'false'">
                           <xsl:value-of select="concat('IP_NTWKSv2','_',  $accessRate,'_', 'NOEF', '_', $AF3,'_',  $AF2,'_',  $AF1)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('IP_NTWKSv2','_',  $accessRate,'_', 'NOEF', '_', $AF3,'_',  $AF2,'_',  $AF1)" />
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                  
                   <xsl:variable name="trafic-control-profile-name-rem">
                     <xsl:choose>
                        <xsl:when test="$efService = 'true'">
                           <xsl:value-of select="concat('IP_NTWKSv2','_',  $accessRate,'_', 'EF', '_', $AF3,'_',  $AF2,'_',  $AF1,'_',  'SCA')" />
                        </xsl:when>
                        <xsl:when test="$efService = 'false'">
                           <xsl:value-of select="concat('IP_NTWKSv2','_',  $accessRate,'_', 'NOEF', '_', $AF3,'_',  $AF2,'_',  $AF1,'_',  'SCA')" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('IP_NTWKSv2','_',  $accessRate,'_', 'NOEF', '_', $AF3,'_',  $AF2,'_',  $AF1,'_',  'SCA')" />
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  -->
                  <xsl:variable name="interfaceUnitDescription">
                     <xsl:choose>
                        <xsl:when test="$efService = 'true'">
                           <xsl:value-of select="concat($csId,  '.',  $ciuName,'..', $accessType, '.', $accessRate, '.', $endPointServiceType, '.', $application, '.', $protocol, '.', $vrfName, '.', $pathPreferences, '.', $vpnSpeed, '.', $architecture, '.', $accessOptionConnectionType, '.', $policyGroup, '.', $operationalMode, '.', $ciuAlias)" />
                        </xsl:when>
                        <xsl:when test="$efService = 'false'">
                           <xsl:value-of select="concat($csId,  '.', $ciuName,'..', $accessType, '.', $accessRate, '.', $endPointServiceType, '.', $application, '.', $protocol, '.', $vrfName, '.', $pathPreferences, '.', $vpnSpeed, '.', $architecture, '.', $accessOptionConnectionType, '.', $policyGroup, '.', $operationalMode, '.', $ciuAlias)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat($csId,  '.', $ciuName,'..', $accessType, '.', $accessRate, '.', $endPointServiceType, '.', $application, '.', $protocol, '.', $vrfName, '.', $pathPreferences, '.', $vpnSpeed, '.', $architecture, '.', $accessOptionConnectionType, '.', $policyGroup, '.', $operationalMode, '.', $ciuAlias)" />
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                  
                <xsl:variable name="interface-description">
                     <xsl:value-of select="concat($csId,  '.', $ciuName, '.', $accessRate)" />
                  </xsl:variable>
                  
                  <xsl:variable name="groupName">
                     <xsl:value-of select="concat($vrfName, '.', $topologyType)"/>
                  </xsl:variable>
                  
                  <xsl:variable name="routingInstanceDescription">
                     <xsl:choose>
                        <xsl:when test="$topology = 'Mesh'">
                           <xsl:value-of select="concat($endPointServiceType, '.', $vrfName, '.', $topologyType, '.', $vrfName, '.', $vpnAlias, '.', $policyGroup, '.', $application,'.RD:',$RD_TYPE)" />
                          </xsl:when>
                        <xsl:when test="$topology = 'Hub'">
                           <xsl:value-of select="concat($endPointServiceType, '.', $vrfName, '.', $topologyType, '.', $vrfName, '.', $vpnAlias, '.', $policyGroup, '.', $application,'.RD:',$RD_TYPE,'.S' ,$spkVrfId)" /> 
                        </xsl:when>
                        <xsl:when test="$topology = 'Spoke'">
                           <xsl:value-of select="concat($endPointServiceType, '.', $vrfName, '.', $topologyType, '.', $vrfName, '.', $vpnAlias, '.', $policyGroup, '.', $application,'.RD:',$RD_TYPE,'.H' ,$spkVrfName)" />
                           </xsl:when>
                        <xsl:otherwise>
                           
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                  <xsl:variable name="mgmtRTCommunityName">
                     <xsl:value-of select="concat($RT ,'_', $NMC-MGMT-770)" />
                  </xsl:variable>
                  
                  <xsl:variable name="rtPolicyCommunityName">
                     <xsl:value-of select="concat($RT, '_' ,  $vrfName, '_', $topologyType)" />
                  </xsl:variable>
                  
                  <xsl:variable name="rtCommunityName">
                     <xsl:value-of select="concat($RT, '_' ,  $vrfName, '_VPRN', $SERVICE_ID, '_', $topologyType)" />
                  </xsl:variable>
                  
                  <xsl:variable name="rtPortPolicyCommunityName">
                     <xsl:value-of select="concat($RT,  '_',  $vrfName, '_', $topologyType)" /><!--'_' ,$port,-->
                  </xsl:variable>
                  
                  <xsl:variable name="sooCommunityName">
                     <xsl:value-of select="concat($SOO,'_' ,$ciuName, '_', $vrfName)" />  <!-- twcb to ciuName-->
                  </xsl:variable>
                  
                  <xsl:variable name="targetCommunityMemberMesh">
                     <xsl:value-of select="concat($TARGET,':' , $rtMesh)" />
                  </xsl:variable>
                  
                  <xsl:variable name="targetCommunityMemberForHub">
                     <xsl:value-of select="concat($TARGET,':' , $rtHub)" />
                  </xsl:variable>
                  <xsl:variable name="targetCommunityMemberForSpoke">
                     <xsl:value-of select="concat($TARGET,':' , $rdSpoke)" />
                  </xsl:variable>
                 
                  <xsl:variable name="originCommunityMember">
                     <xsl:choose>
                        <xsl:when test="$topology = 'Mesh'">
                           <xsl:variable name="rdId">
                              <xsl:value-of select="substring-after($rdMesh,':')"/>
                           </xsl:variable>
                           <xsl:value-of select="concat($ORIGIN,':' ,$rdId, ':', $csId)" />
                           
                        </xsl:when>
                        <xsl:when test="$topology = 'Hub'">
                           <xsl:variable name="rdId">
                              <xsl:value-of select="substring-after($rdHub,':')"/>
                           </xsl:variable>
                           <xsl:value-of select="concat($ORIGIN,':' ,$rdId, ':', $csId)" />
                        </xsl:when>
                        <xsl:otherwise> <!-- Spoke-->
                           <xsl:variable name="rdId">
                              <xsl:value-of select="substring-after($rdSpoke,':')"/>
                           </xsl:variable>
                           <xsl:value-of select="concat($ORIGIN,':' ,$rdId, ':', $csId)" />
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                  
                  <xsl:value-of select="substring-before(.,',')"/>
                  
                  <xsl:variable name="prefixMgmtName">
                     <xsl:value-of select="concat($vrfName,'_VPRN',$SERVICE_ID,  '_', $LB, '_', $MGMT)" />
                  </xsl:variable>
                  <xsl:variable name="TML_CML_TermName">
                     <xsl:value-of select="concat($ciuName, '_', $vrfName)" />
                  </xsl:variable>
                  <xsl:variable name="prefixPerfName">
                     <xsl:value-of select="concat($ciuName, '_',$vrfName,  '_', $PERF)" />
                  </xsl:variable>
                 
                  <xsl:variable name="VRFImportPolicyName">
                     <xsl:value-of select="concat($vrfName,  '_VPRN',$SERVICE_ID,'_', $topologyType, '_', $IMP)" />
                  </xsl:variable>
                  
                  <xsl:variable name="VRFExportPolicyName">
                     <xsl:value-of select="concat($vrfName,  '_VPRN',$SERVICE_ID,'_', $topologyType, '_', $EXP)" />
                  </xsl:variable>
                  
                  <xsl:variable name="TML3ImportPolicy">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'PRI'">
                           <xsl:value-of select="concat('P','SOO','_',$ciuName,'_' ,$vrfName)" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'SEC'">
                           <xsl:value-of select="concat('S', 'SOO','_',$ciuName,'_' ,$vrfName)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('S' ,'SOO','_',$ciuName,'_' ,$vrfName)" />
                        </xsl:otherwise>
                     </xsl:choose>
                     <!--<xsl:value-of select="concat('SET_LP_',$pathPreferences, '_' ,'SOO','_',$ciuName,'_' ,$vpnName)" />-->
                  </xsl:variable>
                  
                  <xsl:variable name="TML3ExportPolicy">
                     <xsl:value-of select="concat($ciuName, '_', $vrfName, '_' , 'MGP')" />
                  </xsl:variable>
                  
                  <xsl:variable name="CML3ImportPolicy">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'PRI'">
                           <xsl:value-of select="concat('P','SOO','_',$ciuName,'_' ,$vrfName)" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'SEC'">
                           <xsl:value-of select="concat('S', 'SOO','_',$ciuName,'_' ,$vrfName)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('S' ,'SOO','_',$ciuName,'_' ,$vrfName)" />
                        </xsl:otherwise>
                     </xsl:choose>
                    </xsl:variable>
                  
                  <xsl:variable name="CML3ExportPolicy">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'PRI'">
                           <xsl:value-of select="concat($ciuName, '_', $vrfName, '_' , 'MGP')" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'SEC'">
                           <xsl:value-of select="concat($ciuName, '_', $vrfName, '_' , 'NMGP')" />
                        </xsl:when>
                        <xsl:otherwise>
                           
                        </xsl:otherwise>
                     </xsl:choose>
                     
                  </xsl:variable>
                  
                 
                  <xsl:variable name="fullMeshImportSiteTermName">
                     <xsl:value-of select="concat($port,  '_', $vrfName)" />
                  </xsl:variable>
                  <xsl:variable name="perfTermName">
                     <xsl:value-of select="concat($vrfName,  '_', $PERF)" />
                  </xsl:variable>
                  <xsl:variable name="lbMgmtPrefixList">
                     <xsl:value-of select="concat($vrfName,  '_VPRN', $SERVICE_ID,'_', $LB-MGMT)" />
                  </xsl:variable>
                  
                  <xsl:variable name="policyStatementPortVrfTopDir">
                     <xsl:value-of select="concat($port, '_',$vrfName,  '_', $topologyType,  '_', $IMP)" />
                  </xsl:variable>
                  
                  <xsl:variable name="policerName">
                     <xsl:value-of select="concat($efRate,  '_', 'LIMIT')" />
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
                     <xsl:value-of select="concat('configuration/class-of-service/scheduler-maps[name=&quot;', $schedularMapName, '&quot;]')"/>
                  </xsl:variable> 
                  
                  <xsl:variable name="schedulerMapSearch_NodeSet" select="ServiceActivationUtils:getSubTreeFromInventory($deviceID, $vendorType, $INVENTORY_TYPE_CONFIGURATION, $schedulerMap_XPath)"/>
                  
                  <xsl:variable name="schedulerMapSearch_Count">
                     <xsl:value-of select="count($schedulerMapSearch_NodeSet)"/>
                  </xsl:variable>
                  
                  <!-- search for the scheduler map 2-->
                  <!--
                  <xsl:variable name="schedulerMapEF_REM_XPath">
                     <xsl:value-of select="concat('configuration/class-of-service/scheduler-maps[name=&quot;', $schedularMapNameEF-REM, '&quot;]')"/>
                  </xsl:variable> 
                  
                  <xsl:variable name="schedulerMapEF_REM_Search_NodeSet" select="ServiceActivationUtils:getSubTreeFromInventory($deviceID, $vendorType, $INVENTORY_TYPE_CONFIGURATION, $schedulerMapEF_REM_XPath)"/>
                  
                  <xsl:variable name="schedulerMapEF_REM_Search_Count">
                     <xsl:value-of select="count($schedulerMapEF_REM_Search_NodeSet)"/>
                  </xsl:variable>
                 
                 <xsl:variable name="schedulerMapNOEF_REM_XPath">
                     <xsl:value-of select="concat('configuration/class-of-service/scheduler-maps[name=&quot;', $schedularMapNameNOEF-REM, '&quot;]')"/>
                  </xsl:variable> 
                  
                  <xsl:variable name="schedulerMapNOEF_REM_Search_NodeSet" select="ServiceActivationUtils:getSubTreeFromInventory($deviceID, $vendorType, $INVENTORY_TYPE_CONFIGURATION, $schedulerMapNOEF_REM_XPath)"/>
                  
                  <xsl:variable name="schedulerMapNOEF_REM_Search_Count">
                     <xsl:value-of select="count($schedulerMapNOEF_REM_Search_NodeSet)"/>
                  </xsl:variable>
                   -->
                  
                  <!-- search for the trafic control profile name-->
                  <xsl:variable name="traficControlProfile_XPath">
                     <xsl:value-of select="concat('configuration/class-of-service/traffic-control-profiles[name=&quot;', $trafic-control-profile-name, '&quot;]')"/>
                  </xsl:variable> 
                  
                  <xsl:variable name="traficControlProfileSearch_NodeSet" select="ServiceActivationUtils:getSubTreeFromInventory($deviceID, $vendorType, $INVENTORY_TYPE_CONFIGURATION, $traficControlProfile_XPath)"/>
                  
                  <xsl:variable name="traficControlProfileSearch_Count">
                     <xsl:value-of select="count($traficControlProfileSearch_NodeSet)"/>
                  </xsl:variable>
                  <!--
                  <xsl:variable name="traficControlProfileRem_XPath">
                     <xsl:value-of select="concat('configuration/class-of-service/traffic-control-profiles[name=&quot;', $trafic-control-profile-name-rem, '&quot;]')"/>
                  </xsl:variable> 
                  
                  <xsl:variable name="traficControlProfileRemSearch_NodeSet" select="ServiceActivationUtils:getSubTreeFromInventory($deviceID, $vendorType, $INVENTORY_TYPE_CONFIGURATION, $traficControlProfileRem_XPath)"/>
                  
                  <xsl:variable name="traficControlProfileRemSearch_Count">
                     <xsl:value-of select="count($traficControlProfileRemSearch_NodeSet)"/>
                  </xsl:variable>
                  -->
                 
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
                  
                  
                  <!-- search for the scheduler map 3-->
                  <!--
                  <xsl:variable name="routingInstance_XPath">
                     <xsl:value-of select="concat('configuration/routing-instances/[name=&quot;', $SERVICE_ID, '&quot;]/route-distinguisher')"/>
                  </xsl:variable> 
                  
                  <xsl:variable name="routingInstance_NodeSet" select="ServiceActivationUtils:getSubTreeFromInventory($deviceID, $vendorType, $INVENTORY_TYPE_CONFIGURATION, $routingInstance_XPath)"/>
                  
                 
                  <xsl:variable name="schedulerMapNOEF_REM_Search_Count">
                     <xsl:value-of select="count($schedulerMapNOEF_REM_Search_NodeSet)"/>
                  </xsl:variable>
                  -->
                 <!-- 
                  <xsl:variable name="routeDistinguisher">
                     <xsl:value-of select="ResourceMap:allocateType0RDFromResourcePool($resourceMap,$RD_TYPE)" />
                  </xsl:variable>
                  -->
                  
                  <xsl:variable name="routeDistinguisherQueryXpath">
                     <xsl:value-of select="concat('configuration/routing-instances/instance/route-distinguisher[rd-type=&quot;',$RD_TYPE,'&quot;]')"/>
                  </xsl:variable>
                  
                  <xsl:variable name="routeDistinguisherNodeSet" select="ServiceActivationUtils:getSubTreeFromInventory($deviceID, $vendorType,$INVENTORY_TYPE_CONFIGURATION, $routeDistinguisherQueryXpath)"/>
                  
                  <xsl:variable name="routeDistinguisherCount">
                     <xsl:value-of select="count($routeDistinguisherNodeSet)"/>
                  </xsl:variable>
                  
                  <xsl:variable name="isGEPort">
                     <xsl:value-of select="starts-with($port,'ge')"/>
                  </xsl:variable>
                  
                  <xsl:variable name="interfaceSetQueryXpath">
                     <xsl:value-of select="concat('configuration/interfaces/interface-set[name=&quot;', $ciuName, '&quot;]/interface[name=&quot;', $port, '&quot;]/unit')"/>
                  </xsl:variable>
                  
                  <xsl:variable name="interfaceSetNodeSet" select="ServiceActivationUtils:getSubTreeFromInventory($deviceID, $vendorType,$INVENTORY_TYPE_CONFIGURATION, $interfaceSetQueryXpath)"/>
                  
                  <xsl:variable name="interfaceSetCount">
                     <xsl:value-of select="count($interfaceSetNodeSet)"/>
                  </xsl:variable>
                  
                  
                  
                  <xsl:variable name="reclassifyFilter">
                  <xsl:choose>
                     <xsl:when test="$isAllAFSelected='true' or $isAF1Selected='true'">
                        <xsl:value-of select="'RECLASSIFY-EF-TO-AF1'"/>
                     </xsl:when>
                     <xsl:when test="$isAF2Selected='true'">
                        <xsl:value-of select="'RECLASSIFY-EF-TO-AF2'"/>
                     </xsl:when>
                     <xsl:when test="$isAF3Selected='true'">
                        <xsl:value-of select="'RECLASSIFY-EF-TO-AF3'"/>
                     </xsl:when>
                     <xsl:otherwise>
                     </xsl:otherwise>
                  </xsl:choose>
                  </xsl:variable>
                  
                  <!--
                  <xsl:variable name="routingInstancesIDQueryXpath">
                     <xsl:value-of select="concat('configuration/routing-instances/[name=&quot;', $SERVICE_ID, '&quot;]')"/>
                  </xsl:variable>
                  
                  <xsl:variable name="routingInstancesIDNodeSet" select="ServiceActivationUtils:getSubTreeFromInventory($deviceID, $vendorType,$INVENTORY_TYPE_CONFIGURATION, $routingInstancesIDQueryXpath)"/>
                  
                  <xsl:variable name="routingInstancesIDCount">
                     <xsl:value-of select="count($routingInstancesIDNodeSet)"/>
                  </xsl:variable>
                  
                  <xsl:choose>
                     <xsl:when test="$routingInstancesIDCount = '0'">
                       
                        
                     </xsl:when>
                     <xsl:otherwise>
                        
                        <xsl:message terminate="yes">ERROR: The selected Service Id is already in use.!</xsl:message>
                     </xsl:otherwise>
                  </xsl:choose>
                  -->
                  <!-- DEVICE-LEVEL DERIVATIONS - END -->
               
               
                  <!-- "ADD" CONFIGLET ASSEMBLY - BEGIN -->
                  
                  <deviceConfiguration>
                     <entityID>
                        <xsl:value-of select="$entityID"/>
                    </entityID>
                     <configuration>
                        <interfaces>
                           <xsl:if test="$endPointServiceType = 'TML3' or $endPointServiceType = 'TML3A'">
                              <interface>
                                 <name>
                                    <xsl:value-of select="$port"/>
                                 </name>
                                 <xsl:if test="$interfaceUnitCount = '0'">
                                    <description>
                                       <xsl:value-of select="$interface-description"/>
                                    </description>
                                 </xsl:if>
                                 <xsl:if test="$isGEPort = 'true'">
                                    <speed>
                                       <xsl:value-of select="$portSpeed"/> 
                                    </speed>
                                 </xsl:if>
                                 <xsl:if test="$autonegotiate = 'true'">
                                  <gigether-options> 
                                     <auto-negotiation> 
                                     </auto-negotiation> 
                                   </gigether-options>
                                 </xsl:if>
                                 <xsl:if test="$autonegotiate = 'false'">
                                    <gigether-options> 
                                       <no-auto-negotiation/> 
                                     </gigether-options> 
                                 </xsl:if>
                                 <xsl:if test="$adminState = 'Down'">
                                    <disable/> 
                                 </xsl:if>
                                 <xsl:if test="$adminState = 'Up'">
                                    <disable operation="delete">
                                    </disable> 
                                 </xsl:if>
                                 <hierarchical-scheduler>
                                 </hierarchical-scheduler>
                                 <flexible-vlan-tagging/>
                                 <encapsulation>flexible-ethernet-services</encapsulation>
                                 
                                 <unit>
                                    <name>
                                       <xsl:value-of select="$VLAN_ID"/>
                                    </name>
                                    <!--<junos:comment>/* test test */</junos:comment>-->
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
                                          <!--<mtu>
                                             <xsl:value-of select="$MTU"/> 
                                          </mtu> 
                                          -->
                                          <address>
                                                 <name>
                                                    <xsl:value-of select="$IPv4AddressMask"/>
                                                 </name>
                                             </address>
                                          
                                             <xsl:if test="$qosType = 'QoS per VPN' and $management = 'true'">
                                                <filter>
                                                   <output>
                                                      <filter-name>PRIORITIZE_MGT_TRAFFIC</filter-name>
                                                   </output>
                                                </filter>
                                             </xsl:if>
                                             <xsl:if test="$qosType = 'QoS per Access'">
                                                
                                                   <xsl:choose>
                                                      <xsl:when test="$efService='false'">
                                                         <filter>
                                                            <xsl:if test="$management = 'true'">
                                                               <output-list>PRIORITIZE_MGT_TRAFFIC</output-list>
                                                            </xsl:if>
                                                            <xsl:if test="$interfaceUnitCount = '0'">
                                                               <output-list>
                                                                  <xsl:value-of select="$reclassifyFilter"/>
                                                               </output-list>
                                                               </xsl:if>
                                                         </filter>
                                                      </xsl:when>
                                                         <xsl:otherwise>
                                                            <xsl:if test="$management = 'true'">
                                                               <filter>
                                                                  <output>
                                                                     <filter-name>PRIORITIZE_MGT_TRAFFIC</filter-name>
                                                                  </output>
                                                               </filter>
                                                            </xsl:if>
                                                         </xsl:otherwise>
                                                     </xsl:choose>
                                             
                                                     <xsl:choose>
                                                         <xsl:when test="$interfaceUnitCount = '1'">
                                                            <xsl:choose>
                                                               <xsl:when test="$efService='false'">
                                                                  <filter>
                                                                     <output>
                                                                        <filter-name>
                                                                           <xsl:value-of select="$reclassifyFilter"/>
                                                                        </filter-name>
                                                                     </output>
                                                                  </filter>
                                                               </xsl:when>
                                                               <xsl:otherwise>
                                                                 <!-- do nothing -->
                                                               </xsl:otherwise>
                                                            </xsl:choose>
                                                         </xsl:when>
                                                    </xsl:choose>
                                             
                                           </xsl:if>
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
                                    <xsl:value-of select="$interface-description"/> <!-- interfaceUnitDescription -->
                                 </description>
                                 <xsl:if test="$isGEPort = 'true'">
                                    <speed>
                                       <xsl:value-of select="$portSpeed"/> 
                                    </speed>
                                 </xsl:if>
                                 <xsl:if test="$autonegotiate = 'true'">
                                    <gigether-options> 
                                       <auto-negotiation> 
                                       </auto-negotiation> 
                                    </gigether-options>
                                 </xsl:if>
                                 <xsl:if test="$autonegotiate = 'false'">
                                    <gigether-options> 
                                       <no-auto-negotiation/> 
                                    </gigether-options> 
                                 </xsl:if>
                                 <xsl:if test="$adminState = 'Down'">
                                    <disable/> 
                                 </xsl:if>
                                 <xsl:if test="$adminState = 'Up'">
                                    <disable operation="delete">
                                    </disable> 
                                 </xsl:if>
                                 <unit>
                                    <name>
                                       <xsl:value-of select="$VLAN_ID"/>
                                    </name>
                                    <description>
                                       <xsl:value-of select="$interfaceUnitDescription"/> <!-- interface-description -->
                                    </description><!-- interface desc -->
                                    <!-- here is the VLAN id -->
                                    <vlan-id>
                                       <xsl:value-of select="$VLAN_ID"/>
                                    </vlan-id>
                                    <family>
                                       <inet>
                                          <!--
                                          <mtu>
                                             <xsl:value-of select="$MTU"/> 
                                          </mtu> 
                                          -->
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
                           <xsl:if test="$qosType = 'QoS per Access'">
                              <interface-set>
                                 <name><xsl:value-of select="$ciuName"/></name>
                                 <interface>
                                    <name><xsl:value-of select="$port"/></name>
                                    <unit>
                                       <name><xsl:value-of select="$VLAN_ID"/></name>
                                    </unit>
                                  </interface>
                              </interface-set>
                           </xsl:if>
                        </interfaces>
                        
                        <!-- FIREWALL STANZA -->     
                        <xsl:if test="$efService = 'true' and $endPointServiceType = 'CML3'">
                           <firewall>
                              <!-- Policer used in all cases below.  These rates come from a table that must be followed -->
                              <xsl:if test="$efService = 'true'">
                                <!-- CML3-->
                                 <xsl:if test="$efService = 'true'"><!--  and $endPointServiceType = 'CML3' -->
                                 <policer>
                                    <name>
                                       <xsl:value-of select="$policerName"/>
                                    </name>
                                    <logical-interface-policer/>
                                    <if-exceeding>
                                       <bandwidth-limit>
                                          <xsl:value-of select="$bwLimit"/>
                                       </bandwidth-limit>
                                       <burst-size-limit>
                                           <xsl:value-of select="$burstSize"/>
                                        
                                       </burst-size-limit>
                                    </if-exceeding>
                                    <then>
                                       <discard/>
                                    </then>
                                 </policer>
                                 </xsl:if>
                                 <!--  TODO: check if available <xsl:if test="$FromPremiumFilterNameSearch_Count = 0">-->
                                 
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
                                                <!-- <policer>
                                                    <xsl:value-of select="$policerName"/>
                                                 </policer>-->
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
                        
                       <class-of-service>
                           <!-- if this scheduler exists using the passed in variables - if yes, use existing, if not must create it.
                              Some of the schedulers will already be predefined on the box -->
                           
                           <xsl:if test="$isAF3Selected = 'true' and $scheduler3Search_Count = 0">
                              <schedulers>
                                 <name>
                                    <xsl:value-of select="$schedularNameAF3"/>
                                 </name>
                                 <transmit-rate>
                                    <percent>
                                       <xsl:value-of select="$AF3"/>
                                    </percent>
                                 </transmit-rate>
                                 <buffer-size>
                                    <percent>
                                       <xsl:value-of select="'20'"/>
                                    </percent>
                                 </buffer-size>
                                 <!-- fixed value for a ST scheduler -->
                                 <priority>low</priority>
                              </schedulers>
                           </xsl:if>
                           <xsl:if test="$isAF2Selected = 'true' and $scheduler2Search_Count = 0">
                              <schedulers>
                                 <name>
                                    <xsl:value-of select="$schedularNameAF2"/>
                                 </name>
                                 <transmit-rate>
                                   <percent>
                                       <xsl:value-of select="$AF2"/>
                                    </percent>
                                 </transmit-rate>
                                 <buffer-size>
                                    <percent>
                                       <xsl:value-of select="'20'"/>
                                    </percent>
                                 </buffer-size>
                                 <priority>low</priority>
                              </schedulers>
                           </xsl:if>
                           <xsl:if test="$isAF1Selected = 'true' and $scheduler1Search_Count = 0">
                              <schedulers>
                                 <name>
                                    <xsl:value-of select="$schedularNameAF1"/>
                                 </name>
                                 <transmit-rate>
                                    <percent>
                                       <xsl:value-of select="$AF1"/>
                                    </percent>
                                 </transmit-rate>
                                 <buffer-size>
                                   <percent>
                                      <xsl:value-of select="'20'"/>
                                    </percent>
                                 </buffer-size>
                                <priority>low</priority>
                              </schedulers>
                           </xsl:if>
                           <!-- if this scheduler-map exists using the passed in variables - if yes, use existing, if not must create it.
                              
                              In the logic, we also need to look if "EF Service" was selected - if yes, then the scheduler-map would have the FC_HIGH_PRIORITY_DATA
                              class/scheduler added to the scheduler-map - if no, then only the other 3 class/schedulers need to be present -->
                            <scheduler-maps>
                                    <name>
                                       <xsl:value-of select="$schedularMapName"/>
                                    </name>
                                 <forwarding-class>
                                    <name>FC_TOLL_VOICE_AND_SIGNALING</name>
                                    <scheduler>RP</scheduler>
                                 </forwarding-class>
                                  <xsl:if test="$efService = 'true'">
                                       <forwarding-class>
                                          <name>FC_HIGH_PRIORITY_DATA</name>
                                          <scheduler>EF</scheduler>
                                       </forwarding-class>
                                    </xsl:if>
                                    <xsl:if test="$isAF3Selected = 'true'">
                                      <forwarding-class>
                                         <name>FC_LOW_LATENCY_DATA_GREEN</name>
                                         <scheduler>
                                            <xsl:value-of select="$schedularNameAF3"/>
                                         </scheduler>
                                      </forwarding-class>
                                    </xsl:if>
                                    <xsl:if test="$isAF2Selected = 'true'">
                                       <forwarding-class>
                                          <name>FC_HIGH_THROUGHPUT_DATA_GREEN</name>
                                          <scheduler>
                                             <xsl:value-of select="$schedularNameAF2"/>
                                          </scheduler>
                                       </forwarding-class>
                                    </xsl:if>
                                    <xsl:if test="$isAF1Selected = 'true'">
                                     <forwarding-class>
                                        <name>FC_LOW_PRIORITY_DATA_GREEN</name>
                                        <scheduler>
                                           <xsl:value-of select="$schedularNameAF1"/>
                                        </scheduler>
                                     </forwarding-class>
                                    </xsl:if>
                                    <xsl:if test="$beService = 'true'">
                                       <forwarding-class>
                                          <name>FC_BEST_EFFORT_DATA_YELLOW</name>
                                          <scheduler>AF_SCA</scheduler>
                                       </forwarding-class>
                                    </xsl:if>
                            </scheduler-maps>
                          <!--xsl:if test="$traficControlProfileSearch_Count = 0 "-->
                           <traffic-control-profiles>
                                 <name>
                                    <xsl:value-of select="$trafic-control-profile-name"/>
                                 </name>
                                    <scheduler-map>
                                       <xsl:value-of select="$schedularMapName"/>
                                    </scheduler-map>
                                <shaping-rate>
                                    <rate>
                                       <xsl:value-of select="$shapingRate"/>
                                    </rate>
                                 </shaping-rate>
                           </traffic-control-profiles>
                          <!--/xsl:if-->     
                           
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
                                  <xsl:if test="$qosType = 'QoS per VPN'">
                                    <output-traffic-control-profile>
                                       <profile-name>
                                          <xsl:value-of select="$trafic-control-profile-name"/>
                                       </profile-name>
                                    </output-traffic-control-profile>
                                  </xsl:if>
                                  <!-- choose the classifier based on UI selection -->
                                  <classifiers>
                                     <xsl:if test="$classifier = 'DSCP'">
                                       <dscp>
                                          <name>IPv2_PREMIUM</name>
                                       </dscp>
                                     </xsl:if>
                                     <xsl:if test="$classifier = '802.1p'">
                                        <ieee-802.1>
                                           <classifier-name>IPv2_PREMIUM_DOT1P</classifier-name>
                                        </ieee-802.1>
                                     </xsl:if>
                                     <xsl:if test="$classifier = '802.1ad'">
                                        <ieee-802.1ad>
                                           <classifier-name>IPv2_PREMIUM_DEI</classifier-name>
                                        </ieee-802.1ad>
                                     </xsl:if>
                                  </classifiers>
                                  <rewrite-rules>
                                     <xsl:if test="$classifier = '802.1p'">
                                        <ieee-802.1>
                                           <rewrite-rule-name>REWRITE_DOT1P_IPV2_PREMIUM</rewrite-rule-name>
                                        </ieee-802.1>
                                     </xsl:if>
                                     <xsl:if test="$classifier = '802.1ad'">
                                        <ieee-802.1ad>
                                           <rewrite-rule-name>REWRITE_DOT1AD_IPV2_PREMIUM</rewrite-rule-name>
                                        </ieee-802.1ad>
                                     </xsl:if>
                                  </rewrite-rules>
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
                                 <xsl:if test="$qosType = 'QoS per VPN'">
                                  <output-traffic-control-profile>
                                     <profile-name>
                                        <xsl:value-of select="$trafic-control-profile-name"/>
                                     </profile-name>
                                  </output-traffic-control-profile>
                                 </xsl:if>
                                 <!-- choose the classifier based on UI selection -->
                                 
                                 <classifiers>
                                    <xsl:if test="$classifier = 'DSCP'">
                                     <dscp>
                                        <name>IPv2_ENHANCED</name>
                                     </dscp>
                                    </xsl:if>
                                    <xsl:if test="$classifier = '802.1p'">
                                       <ieee-802.1>
                                          <classifier-name>IPv2_ENHANCED_DOT1P</classifier-name>
                                       </ieee-802.1>
                                    </xsl:if>
                                    <xsl:if test="$classifier = '802.1ad'">
                                     <ieee-802.1ad>
                                        <classifier-name>IPv2_ENHANCED_DEI</classifier-name>
                                     </ieee-802.1ad>
                                    </xsl:if>
                                 </classifiers>
                                 <rewrite-rules>
                                    <xsl:if test="$classifier = '802.1p'">
                                       <ieee-802.1>
                                          <rewrite-rule-name>REWRITE_DOT1P_IPV2_PREMIUM</rewrite-rule-name>
                                       </ieee-802.1>
                                    </xsl:if>
                                    <xsl:if test="$classifier = '802.1ad'">
                                       <ieee-802.1ad>
                                          <rewrite-rule-name>REWRITE_DOT1AD_IPV2_PREMIUM</rewrite-rule-name>
                                       </ieee-802.1ad>
                                    </xsl:if>
                                 </rewrite-rules>
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
                                 <xsl:if test="$qosType = 'QoS per VPN'">
                                    <output-traffic-control-profile>
                                       <profile-name>
                                          <xsl:value-of select="$trafic-control-profile-name"/>
                                       </profile-name>
                                    </output-traffic-control-profile>
                                 </xsl:if>
                                 <!-- choose the classifier based on UI selection -->
                                 
                                 <classifiers>
                                    <xsl:if test="$classifier = 'DSCP'">
                                    <dscp>
                                       <name>IPv2_AF3_ONLY</name>
                                    </dscp>
                                    </xsl:if>
                                    <xsl:if test="$classifier = '802.1p'">
                                    <ieee-802.1>
                                       <classifier-name>IPv2_AF3_ONLY_DOT1P</classifier-name>
                                    </ieee-802.1>
                                    </xsl:if>
                                 </classifiers>
                                 <rewrite-rules>
                                    <xsl:if test="$classifier = '802.1p'">
                                       <ieee-802.1>
                                          <rewrite-rule-name>REWRITE_DOT1P_AF3_ONLY</rewrite-rule-name>
                                       </ieee-802.1>
                                    </xsl:if>
                                    <!--<xsl:if test="$classifier = '802.1ad'">
                                       <ieee-802.1ad>
                                          <rewrite-rule-name>REWRITE_DOT1P_AF3_ONLY</rewrite-rule-name>
                                       </ieee-802.1ad>
                                    </xsl:if>
                                    -->
                                 </rewrite-rules>
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
                                    <xsl:if test="$qosType = 'QoS per VPN'">
                                       <output-traffic-control-profile>
                                          <profile-name>
                                             <xsl:value-of select="$trafic-control-profile-name"/>
                                          </profile-name>
                                       </output-traffic-control-profile>
                                    </xsl:if>
                                    <!-- choose the classifier based on UI selection -->
                                    
                                    <classifiers>
                                       <xsl:if test="$classifier = 'DSCP'">
                                       <dscp>
                                          <name>IPv2_AF2_ONLY</name>
                                       </dscp>
                                       </xsl:if>
                                       <xsl:if test="$classifier = '802.1p'">
                                       <ieee-802.1>
                                          <classifier-name>IPv2_AF2_ONLY_DOT1P</classifier-name>
                                       </ieee-802.1>
                                       </xsl:if>
                                    </classifiers>
                                    <rewrite-rules>
                                       <xsl:if test="$classifier = '802.1p'">
                                          <ieee-802.1>
                                             <rewrite-rule-name>REWRITE_DOT1P_AF2_ONLY</rewrite-rule-name>
                                          </ieee-802.1>
                                       </xsl:if>
                                       <!--<xsl:if test="$classifier = '802.1ad'">
                                          <ieee-802.1ad>
                                             <rewrite-rule-name>REWRITE_DOT1P_AF2_ONLY</rewrite-rule-name>
                                          </ieee-802.1ad>
                                       </xsl:if>-->
                                    </rewrite-rules>
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
                                    <xsl:if test="$qosType = 'QoS per VPN'">
                                       <output-traffic-control-profile>
                                          <profile-name>
                                             <xsl:value-of select="$trafic-control-profile-name"/>
                                          </profile-name>
                                       </output-traffic-control-profile>
                                    </xsl:if>
                                    <!-- choose the classifier based on UI selection -->
                                    
                                    <classifiers>
                                       <xsl:if test="$classifier = 'DSCP'">
                                       <dscp>
                                          <name>IPv2_AF1_ONLY</name>
                                       </dscp>
                                       </xsl:if>
                                       <xsl:if test="$classifier = '802.1p'">
                                       <ieee-802.1>
                                          <classifier-name>IPv2_AF1_ONLY_DOT1P</classifier-name>
                                       </ieee-802.1>
                                       </xsl:if>
                                    </classifiers>
                                    <rewrite-rules>
                                       <xsl:if test="$classifier = '802.1p'">
                                          <ieee-802.1>
                                             <rewrite-rule-name>REWRITE_DOT1P_AF1_ONLY</rewrite-rule-name>
                                          </ieee-802.1>
                                       </xsl:if>
                                       <!--<xsl:if test="$classifier = '802.1ad'">
                                          <ieee-802.1ad>
                                             <rewrite-rule-name>REWRITE_DOT1P_AF1_ONLY</rewrite-rule-name>
                                          </ieee-802.1ad>
                                       </xsl:if>
                                       -->
                                    </rewrite-rules>
                                 </unit>
                              </interface>
                           </xsl:if>
                              <xsl:if test="$qosType = 'QoS per Access'">
                                <interface-set>
                                    <name>
                                       <xsl:value-of select="$ciuName"/>
                                    </name>
                                  
                                       <output-traffic-control-profile>
                                            <profile-name>
                                                <xsl:value-of select="$trafic-control-profile-name"/>
                                             </profile-name>
                                       </output-traffic-control-profile>
                                   </interface-set>
                              </xsl:if>
                             </interfaces>
                        </class-of-service>
                        
                        <!-- CLASS-OF-SERVICE END -->
                        
						      <!-- CLASS-OF-POLICY START -->
                        <policy-options>
                           <!-- L3VPN VRF Policy-->
                           
                           <!-- Used for all topologies -->
                           <xsl:if test="$topology = 'Mesh'">
                               <community>
                                  <name>
                                     <xsl:value-of select="$rtCommunityName" />
                                  </name>
                                  <members>
                                      <xsl:value-of select="$targetCommunityMemberMesh" />
                                    </members>
                               </community>
                           </xsl:if>
                           
                           <xsl:if test="$topology = 'Hub' or $topology = 'Spoke'"> <!-- and $topologyType = 'HUB' -->
                              <community>
                                 <name>
                                    <xsl:value-of select="concat($RT, '_' ,  $vrfName, '_VPRN', $SERVICE_ID, '_', 'HUB')" />
                                  </name>
                                 
                                 <members>
                                      <xsl:value-of select="$targetCommunityMemberForHub" />
                                 </members>
                                 
                              </community>
                              <community>
                                 <name>
                                    <xsl:value-of select="concat($RT, '_' ,  $vrfName, '_VPRN', $SERVICE_ID, '_', 'SPK')" />
                                 </name>
                                <members>
                                    <xsl:value-of select="$targetCommunityMemberForSpoke" />
                                 </members>
                              </community>
                           </xsl:if>
                           
                           <!-- Site of Origin (always configured) -->
                           <community>
                              <name>
                                 <xsl:value-of select="$sooCommunityName" />
                              </name>
                              <members>
                                 <xsl:value-of select="$originCommunityMember" />
                              </members>
                           </community>
                           
                           <xsl:if test="$endPointServiceType = 'TML3' or $endPointServiceType = 'TML3A'">
                              <prefix-list>
                                 <!-- prefix-list for the CIU must be created always -->
                                 <name>
                                    <xsl:value-of select="$lbMgmtPrefixList" />
                                 </name>
                                    <prefix-list-item>
                                       <!-- IP address is the CIU loopback address -->
                                       <name>
                                         <xsl:value-of select="$ciuLoopbackAndSubnetMask"/>
                                       </name>
                                    </prefix-list-item>
                              </prefix-list>
                              
                              <prefix-list>
                                 <name>
                                    <xsl:value-of select="$prefixPerfName" />
                                 </name>
                                 <!--
                                    <prefix-list-item>
                                       <name>
                                          <xsl:value-of select="$ciuLoopbackAndSubnetMask"/>
                                       </name>
                                    </prefix-list-item>
                                --> 
                                 <xsl:for-each select="prefixList/prefixList/e">
                                    <prefix-list-item>
                                       <xsl:variable name="route" select="prefixList" />
                                       
                                       <name> 
                                          <xsl:value-of select="$route" />
                                       </name>
                                    </prefix-list-item>
                                 </xsl:for-each>
                             </prefix-list>
                              </xsl:if> 
                           
                           <!-- VRF Import Policy -->
                           
                           <policy-statement>
                              <name>
                                  <xsl:value-of select="$VRFImportPolicyName"/>
                              </name>
                              
                              <!-- THIS TERM IS TML3 ONLY -->
                              <xsl:if test="$endPointServiceType = 'TML3' or $endPointServiceType = 'TML3A'">
                                 <term>
                                    <!-- this is a fixed name for the CIU Management VRF  -->
                                    <!--<name>1</name>-->
                                    <name>ENTRY_1:NMC_MGMT_770-IMPORT</name>
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
                                    <name>ENTRY_3:PERF_HUB-IMPORT</name>
                                    <from>
                                       <protocol>bgp</protocol>
                                       <!-- this is a pre-existing community for the CIU Management VRF  -->
                                       <community>RT_PERF_HUB</community>
                                    </from>
                                    <then>
                                       <accept/>
                                    </then>
                                 </term>
                                 <xsl:if test="$policyGroup = 'TQSTD'">
                                 <term>
                                    <name>ENTRY_4:TQ_NMC_MANAGEMENT</name>
                                    <from>
                                       <protocol>bgp</protocol>
                                       <community>RT_TQ_NMC_MGMT</community>
                                    </from>
                                    <then>                       
                                       <accept/>
                                    </then>
                                 </term>
                                 </xsl:if>
                                 <xsl:if test="$policyGroup = 'BVOIP'">
                                    <term>
                                       <name>ENTRY_5:BVOIP VPRN-IMPORT</name>
                                       <from>
                                          <protocol>bgp</protocol>
                                          <prefix-list>
                                             <name>
                                                <xsl:value-of select="concat(' BVOIP', '_' ,  'CORE', '_VPRN', $SERVICE_ID)" /><!--  -->
                                             </name>
                                          </prefix-list>
                                          <community>RT_BVOIP</community>
                                       </from>
                                       <then>                       
                                          <accept/>
                                       </then>
                                    </term>
                                 </xsl:if>
                                 
                              </xsl:if>
                              
                              <!-- THIS TERM IS TML3 AND CML3 -->
                              <xsl:if test="$endPointServiceType = 'TML3' or $endPointServiceType = 'TML3A' or $endPointServiceType = 'CML3'">
                                    <xsl:if test="$topology = 'Mesh'">
                                       <term>
                                          <name>
                                             <xsl:value-of select="'ENTRY_999:VPRN-IMPORT'"/><!--<xsl:value-of select="$vrfName"/>-->
                                          </name>
                                          <from>
                                             <protocol>bgp</protocol>
                                             <community>
                                                  <xsl:value-of select="concat($RT, '_' ,  $vrfName, '_VPRN', $SERVICE_ID, '_', 'MSH')" />
                                             </community>
                                          </from>
                                          <then>
                                             <accept/>
                                          </then>
                                       </term>
                                    </xsl:if>
                                 <xsl:if test="$topology = 'Spoke'">
                                    <term>
                                       <name>
                                          <xsl:value-of select="'ENTRY_201:HUB-IMPORT'"/><!--$vpnName-->
                                       </name>
                                       <from>
                                          <protocol>bgp</protocol>
                                          <community>
                                             <xsl:value-of select="concat($RT, '_' ,  $vrfName, '_VPRN', $SERVICE_ID, '_', 'HUB')" />
                                          </community>
                                       </from>
                                       <then>
                                          <accept/>
                                       </then>
                                    </term>
                                 </xsl:if>
                                 <xsl:if test="$topology = 'Hub'">
                                    <term>
                                       <name>
                                          <xsl:value-of select="'ENTRY_201:SPOKE'"/><!--$vpnName-->
                                       </name>
                                       <from>
                                          <protocol>bgp</protocol>
                                          <community>
                                             <xsl:value-of select="concat($RT, '_' ,  $vrfName, '_VPRN', $SERVICE_ID, '_', 'SPK')" />
                                          </community>
                                       </from>
                                       <then>
                                          <accept/>
                                       </then>
                                    </term>
                                       <term>
                                          <name>
                                             <xsl:value-of select="'ENTRY_999:VPRN-IMPORT'"/><!--$vpnName-->
                                          </name>
                                          <from>
                                             <protocol>bgp</protocol>
                                             <community>
                                                 <xsl:value-of select="concat($RT, '_' ,  $vrfName, '_VPRN', $SERVICE_ID, '_', 'HUB')" />
                                               </community>
                                          </from>
                                          <then>
                                             <accept/>
                                          </then>
                                       </term>
                                    </xsl:if>
                                
                                 
                                 <!-- THIS TERM IS TML3 AND CML3 -->
                                 
                                 <term>
                                    <name>ENTRY_1000:LAST-REJECT</name>
                                    <then>
                                       <reject/>
                                    </then>
                                 </term>
                              </xsl:if>
                           </policy-statement>
                           
                           <!-- VRF Export Policy -->
                           
                          
                           <policy-statement>
                              <name>
                                 <xsl:value-of select="$VRFExportPolicyName"/>
                              </name>
                              
                              <!-- THIS TERM IS TML3 ONLY -->
                              <xsl:if test="$endPointServiceType = 'TML3' or $endPointServiceType = 'TML3A'">
                                 <xsl:if test="$policyGroup = 'TQSTD'">
                                    <term>
                                       <name>ENTRY_1:TQ_NMC_MANAGEMENT-EXPORT</name>
                                       <from>
                                          <protocol>bgp</protocol>
                                          <prefix-list>
                                             <name>TQ_LB_MGMT</name>
                                          </prefix-list>                        
                                       </from>
                                       <then>
                                          <community>
                                             <add/>
                                             <community-name>RT_TQ_NMC_MGMT</community-name>
                                          </community>                       
                                          <accept/>
                                       </then>
                                    </term>
                                 </xsl:if>
                                 <xsl:if test="$policyGroup = 'CNS3'">
                                  <term>
                                     <name>ENTRY_1:CNS3-LAN-MGMT</name>
                                     <from>
                                        <protocol>bgp</protocol>
                                        <prefix-list>
                                           <name>CNS3-LAN-MGMT_100-72-252-0</name>
                                        </prefix-list>                        
                                     </from>
                                     <then>
                                        <community>
                                           <add/>
                                           <community-name>RT_CPE_MGMT_771</community-name>
                                        </community>                       
                                        <accept/>
                                     </then>
                                  </term>
                                 </xsl:if>
                                 <term>
                                    <name>ENTRY_200:LB_MGMT-EXPORT</name>
                                    <from>
                                       <protocol>bgp</protocol>
                                       <prefix-list>
                                          <xsl:value-of select="$lbMgmtPrefixList" />
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
                                 <xsl:if test="$operationalMode = 'TST'">
                                    <xsl:variable name="counter" select="401"/>
                                    
                                    <xsl:for-each select="prefixList/prefixList/e">
                                       <xsl:variable name="counter" select="$counter"/>
                                      <term>
                                          
                                          <name>
                                             <xsl:value-of select="concat('ENTRY', '_', $counter - position(),':', $ciuName,'_', $vrfName,'_PERF')"/>
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
                                       <xsl:variable name="counter" select="$counter -1"/>
                                    </xsl:for-each>
                                 </xsl:if>
                              </xsl:if>
                              
                              <!-- THIS TERM IS TML3 AND CML3 -->
                              <xsl:if test="$endPointServiceType = 'TML3' or $endPointServiceType = 'TML3A' or $endPointServiceType = 'CML3'">
                                 <term>
                                    <name>
                                       <xsl:value-of select="'ENTRY_999:VPRN-BGP-EXPORT'" />
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
                                    <name>
                                       <xsl:value-of select="'ENTRY_1000:LAST-REJECT'" />
                                    </name>
                                    <then>
                                       <reject/>
                                    </then>
                                 </term>
                              </xsl:if>
                           </policy-statement>
                           
                           <!-- BGP Policy -->
                           <!-- BGP Import Policy -->
                           <!-- This import policy is for the Customer routes and is applied at the protocols bgp layer  of the routing-instance-->
                           <xsl:if test="$endPointServiceType = 'TML3' or $endPointServiceType = 'TML3A' or $endPointServiceType = 'CML3'">
                              <policy-statement>
                                 <name>
                                    <xsl:value-of select="$TML3ImportPolicy" />
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
                                    <name>ENTRY_20:SET-LP-FILTER-RT-SOO</name>
                                    <then>
                                       <local-preference>
                                          <xsl:value-of select="$localPref"/>
                                       </local-preference>
                                       <community>
                                          <delete/>
                                          <community-name>
                                             <xsl:value-of select="'MATCH_RT'" />
                                          </community-name>
                                       </community>
                                       <community>
                                          <delete/>
                                          <community-name>
                                             <xsl:value-of select="'MATCH_SOO'" />
                                          </community-name>
                                       </community>
                                    </then>
                                 </term>
                                 <term>
                                    <name>ENTRY_60:V4-SET-NH-ADD-SOO</name>
                                    <then>
                                       <community>
                                          <add/>
                                          <community-name>
                                             <xsl:value-of select="$sooCommunityName" />
                                          </community-name>
                                       </community>
                                       <accept/>
                                    </then>
                                 </term>
                                 <term>
                                    <name>ENTRY_100:LAST</name>
                                    <then>
                                       <reject/>
                                    </then>
                                 </term>
                                 
                              </policy-statement>
                           </xsl:if>
                           
                           <!-- BGP Export Policy -->
                           
                           <!-- This export policy is for the Customer routes and is applied at the protocols bgp layer of the routing-instance -->
                           
                           <!-- THIS POLICY IS TML3 BGP Export -->
                           <xsl:if test="$endPointServiceType = 'TML3' or $endPointServiceType = 'TML3A'">
                              <policy-statement>
                                 <name>
                                    <xsl:value-of select="$TML3ExportPolicy" />
                                 </name>
                                 
                                 <term>
                                    <name>ENTRY_10:FILTER-SOO</name>
                                    <from>
                                       <community>
                                          <xsl:value-of select="$sooCommunityName" />
                                       </community>
                                    </from>
                                    <then>
                                       <reject/>
                                    </then>
                                 </term>
                                 
                                 <term>
                                    <name>ENTRY_60:V4-DIRECT-FILTER-RT-SOO</name>
                                       <from>
                                          <protocol>direct</protocol>
                                       </from>
                                    <then>
                                       <community>
                                          <delete/>
                                          <community-name>
                                             <xsl:value-of select="'MATCH_RT'" />
                                          </community-name>
                                       </community>
                                       <community>
                                          <delete/>
                                          <community-name>
                                             <xsl:value-of select="'MATCH_SOO'" />
                                          </community-name>
                                       </community>
                                       <accept/>
                                    </then>
                                 </term>
                                 <term>
                                    <name>ENTRY_100:LAST-FILTER-RT-SOO</name>
                                    <then>
                                       <community>
                                          <delete/>
                                          <community-name>
                                             <xsl:value-of select="'MATCH_RT'" />
                                          </community-name>
                                       </community>
                                       <community>
                                          <delete/>
                                          <community-name>
                                             <xsl:value-of select="'MATCH_SOO'" />
                                          </community-name>
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
                                    <xsl:value-of select="$CML3ExportPolicy" />
                                 </name>
                                 <term>
                                    <name>FILTER_SOO</name>
                                    <from>
                                       <community>
                                          <xsl:value-of select="$sooCommunityName" />
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
                                    <name>ENTRY_100:LAST</name> <!-- last -->
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
                                    <!--ge-0/3/4.telus vpn.Mesh-->
                                 <xsl:value-of select="$routingInstanceDescription"/>
                              </description>
                              <instance-type>vrf</instance-type>
                              <interface>
                                 <name>
                                    <xsl:value-of select="$interfaceName"/>
                                 </name>
                              </interface>
                              <route-distinguisher>
                                 <rd-type>
                                   <xsl:choose>
                                       <xsl:when test="$routeDistinguisherCount = '0'">
                                          <!-- LOGIC FOR THE CASE WHERE RD IS NOT DUPLICATED -->
                                          <xsl:value-of select="$RD_TYPE"/>
                                       </xsl:when>
                                       <xsl:otherwise>
                                          <!-- TERMINATE SCRIPT WITH POPUP ERROR MESSAGE IF DUPLICATION EXISTS -->
                                          <xsl:message terminate="yes">ERROR: RD Value Already Exists ...</xsl:message>
                                       </xsl:otherwise>
                                    </xsl:choose>
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
                                          <xsl:value-of select="$groupName"/>
                                       </name>
                                       <type>external</type>
                                       <log-updown/>
                                       <peer-as>
                                          <xsl:value-of select="$peerAS"/>
                                       </peer-as>
                                       <as-override/>
                                       <neighbor>
                                          <name>
                                             <xsl:value-of select="$bgpNeighbourAddress"/>
                                          </name>
                                          <description>
                                             <xsl:value-of select="$routingInstanceBGPDescription"/>
                                          </description>
                                          <metric-out>
                                             <metric-value>
                                                <xsl:value-of select="$med"/>
                                             </metric-value> <!-- MED -->
                                          </metric-out>
                                          <!--<local-preference>
                                             <xsl:value-of select="$localPref"/>
                                          </local-preference>-->
                                         <import>
                                             <xsl:value-of select="$TML3ImportPolicy"/>
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
                                             <xsl:if test="$endPointServiceType = 'TML3' or $endPointServiceType = 'TML3A'">
                                                <xsl:value-of select="$TML3ExportPolicy"/>
                                             </xsl:if>
                                             <xsl:if test="$endPointServiceType = 'CML3'">
                                                <xsl:value-of select="$CML3ExportPolicy"/>
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
                        <!-- This section details the way to reference the above policies -->
                     </configuration>
                  </deviceConfiguration>
                  <!-- "ADD" CONFIGLET ASSEMBLY - END -->
               </xsl:for-each> 
            </serviceRequestConfig>
         </xsl:when>
         
         <!-- IF OPTYPE == "DELETE" -->
         <xsl:when test="$opType = 'DELETE'">
            <serviceRequestConfig>
               <xsl:for-each select="/ns2:ServiceRequest/serviceElementList/serviceElement/ServiceEndpointAttributes[vendorType = 'Juniper']">
                <!-- DEVICE-LEVEL DERIVATIONS - BEGIN -->
   				  <xsl:variable name="CARRIER-FACING-VLAN-ID" select="outerEncap"/>
   				  <xsl:variable name="VLAN_ID" select="outerEncap"/>
                 <xsl:variable name="entityID" select="../entityID"/>
   				  <xsl:variable name="deviceID" select="pedeviceId"/>
                 <xsl:variable name="port" select="Interface"/> 
                 <xsl:variable name="speed" select="speed"/>
                 <xsl:variable name="vendorType" select="vendorType"/>
                  
                  <xsl:variable name="VLAN_ID" select="outerEncap"/>
                  <xsl:variable name="MTU" select="ipMTU"/>
                  <xsl:variable name="efRate" select="efRate"/>
                  <xsl:variable name="AF1" select="af1"/>
                  <xsl:variable name="AF2" select="af2"/>
                  <xsl:variable name="AF3" select="af3"/>
                  
                  <xsl:variable name="efService" select="efService"/>
                  <xsl:variable name="ciuName" select="ciuName"/>
                  <xsl:variable name="pathPreferences" select="pathPreferences"/>
                  
                  <xsl:variable name="pathPreferences">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'Primary'">
                           <xsl:value-of select="'PRI'"/>
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="'SEC'"/>
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                  <xsl:variable name="schedulerMapName">
                     <xsl:value-of select="concat($SCHEDULER_MAP, '-', $AF3, '-', $AF2, '-', $AF1)"/>
                  </xsl:variable>
                  
                  
                  <xsl:variable name="schedulerAF1">
                     <xsl:value-of select="concat($SCH_ST, '-', $AF1)" />
                  </xsl:variable>
                  
                  <xsl:variable name="schedulerAF2">
                     <xsl:value-of select="concat($SCH_BE, '-', $AF2)" />
                  </xsl:variable>
                  
                  <xsl:variable name="schedulerAF3">
                     <xsl:value-of select="concat($SCH_PR, '-', $AF3)" />
                  </xsl:variable>
                  
                 <xsl:variable name="rtCommunityName">
                     <xsl:value-of select="concat($RT, '_' ,  $vrfName, '_VPRN', $SERVICE_ID, '_', $topologyType)" />
                  </xsl:variable>
                  
                  <xsl:variable name="rtPolicyCommunityName">
                     <xsl:value-of select="concat($RT, '_' ,  $vrfName, '_', $topologyType)" />
                  </xsl:variable>
                 
                  <xsl:variable name="sooCommunityName">
                     <xsl:value-of select="concat($SOO,'_' ,$ciuName, '_', $vrfName)" />
                  </xsl:variable>
                  
                  <xsl:variable name="prefixMgmtName">
                     <xsl:value-of select="concat($vrfName,'_VPRN',$SERVICE_ID,  '_', $LB, '_', $MGMT)" />
                  </xsl:variable>
                  
                  <xsl:variable name="prefixPerfName">
                     <xsl:value-of select="concat($ciuName, '_',$vrfName,  '_', $PERF)" />
                  </xsl:variable>
                  
                  <xsl:variable name="VRFImportPolicyName">
                     <xsl:value-of select="concat($vrfName,  '_VPRN',$SERVICE_ID,'_', $topologyType, '_', $IMP)" />
                  </xsl:variable>
                  
                  <xsl:variable name="VRFExportPolicyName">
                     <xsl:value-of select="concat($vrfName,  '_VPRN',$SERVICE_ID,'_', $topologyType, '_', $EXP)" />
                  </xsl:variable>
                  
                  <xsl:variable name="TML3ImportPolicy">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'PRI'">
                           <xsl:value-of select="concat('P','SOO','_',$ciuName,'_' ,$vrfName)" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'SEC'">
                           <xsl:value-of select="concat('S', 'SOO','_',$ciuName,'_' ,$vrfName)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('S' ,'SOO','_',$ciuName,'_' ,$vrfName)" />
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                  <xsl:variable name="TML3ExportPolicy">
                     <xsl:value-of select="concat($ciuName, '_', $vrfName, '_' , 'MGP')" />
                  </xsl:variable>
                  
                  <xsl:variable name="CML3ImportPolicy">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'PRI'">
                           <xsl:value-of select="concat('P','SOO','_',$ciuName,'_' ,$vrfName)" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'SEC'">
                           <xsl:value-of select="concat('S', 'SOO','_',$ciuName,'_' ,$vrfName)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('S' ,'SOO','_',$ciuName,'_' ,$vrfName)" />
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                  <xsl:variable name="CML3ExportPolicy">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'PRI'">
                           <xsl:value-of select="concat($ciuName, '_', $vrfName, '_' , 'MGP')" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'SEC'">
                           <xsl:value-of select="concat($ciuName, '_', $vrfName, '_' , 'NMGP')" />
                        </xsl:when>
                        <xsl:otherwise>
                           
                        </xsl:otherwise>
                     </xsl:choose>
                     
                  </xsl:variable>
                  
                  <xsl:variable name="multiVRF" select="multiVRF"/>
                  
                  <xsl:variable name="interfaceSetQueryXpath">
                     <xsl:value-of select="concat('configuration/interfaces/interface-set[name=&quot;', $ciuName, '&quot;]/interface[name=&quot;', $port, '&quot;]/unit')"/>
                  </xsl:variable>
                  
                  <xsl:variable name="interfaceSetNodeSet" select="ServiceActivationUtils:getSubTreeFromInventory($deviceID, $vendorType,$INVENTORY_TYPE_CONFIGURATION, $interfaceSetQueryXpath)"/>
                  
                  <xsl:variable name="interfaceSetCount">
                     <xsl:value-of select="count($interfaceSetNodeSet)"/>
                  </xsl:variable>
                  
                  <xsl:variable name="interfaceUnitQueryXpath">
                     <xsl:value-of select="concat('configuration/interfaces/interface[name=&quot;', $port, '&quot;]/unit')"/>
                  </xsl:variable>
                  
                  <xsl:variable name="interfaceUnitNodeSet" select="ServiceActivationUtils:getSubTreeFromInventory($deviceID, $vendorType,$INVENTORY_TYPE_CONFIGURATION, $interfaceUnitQueryXpath)"/>
                  
                  <xsl:variable name="interfaceUnitCount">
                     <xsl:value-of select="count($interfaceUnitNodeSet)"/>
                  </xsl:variable>
                  
                  <xsl:variable name="lbMgmtPrefixList">
                     <xsl:value-of select="concat($vrfName,  '_VPRN', $SERVICE_ID,'_', $LB-MGMT)" />
                  </xsl:variable>
                  
                  
                  <xsl:variable name="accessRate" select="accessRate"/>
                  <xsl:variable name="vpnRate" select="vpnRate"/>
                  <xsl:variable name="isAllAFSelected" select="isAllAFSelected"/>
                  <xsl:variable name="isAF1Selected" select="isAF1Selected"/>
                  <xsl:variable name="isAF2Selected" select="isAF2Selected"/>
                  <xsl:variable name="isAF3Selected" select="isAF3Selected"/>
                  
                  <xsl:variable name="traficControlProfile">
                     <xsl:choose>
                        <xsl:when test="$isAllAFSelected='true' and $efService='true'">
                           <xsl:value-of select="concat('IP_NTWKSv2', '_', $accessRate, '_','EF', '_', $AF3, '_', $AF2, '_', $AF1)" />
                         </xsl:when>
                        <xsl:when test="$isAllAFSelected='true' and $efService='false'">
                           <xsl:value-of select="concat('IP_NTWKSv2', '_', $accessRate, '_','NOEF', '_', $AF3, '_', $AF2, '_', $AF1)" />
                        </xsl:when>
                        <xsl:when test="$isAF3Selected='true' and $isAF1Selected='false' and $isAF2Selected='false' and $efService='true'">
                           <xsl:value-of select="concat('IP_NTWKSv2', '_', $accessRate, '_','EF', '_',  '100', '_',  '0', '_',  '0')" />
                        </xsl:when>
                        <xsl:when test="$isAF3Selected='true' and $isAF1Selected='false' and $isAF2Selected='false' and $efService='false'">
                           <xsl:value-of select="concat('IP_NTWKSv2', '_', $accessRate, '_','NOEF', '_',  '100', '_',  '0', '_',  '0')" />
                        </xsl:when>
                        <xsl:when test="$isAF2Selected='true' and $isAF1Selected='false' and $isAF3Selected='false' and $efService='true'">
                           <xsl:value-of select="concat('IP_NTWKSv2', '_', $accessRate, '_','EF', '_', '0', '_', '100', '_', '0')" />
                        </xsl:when>
                        <xsl:when test="$isAF2Selected='true' and $isAF1Selected='false' and $isAF3Selected='false' and $efService='false'">
                           <xsl:value-of select="concat('IP_NTWKSv2', '_', $accessRate, '_','NOEF', '_', '0', '_', '100', '_', '0')" />
                        </xsl:when>
                        <xsl:when test="$isAF1Selected='true' and $isAF2Selected='false' and $isAF3Selected='false' and $efService='true'">
                           <xsl:value-of select="concat('IP_NTWKSv2', '_', $accessRate, '_','EF', '_',  '0', '_', '0', '_',  '100')" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('IP_NTWKSv2', '_', $accessRate, '_','NOEF', '_',  '0', '_', '0', '_',  '100')" />
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
				    <!-- DEVICE-LEVEL DERIVATIONS - END -->
      
                  <!-- "DELETE" CONFIGLET ASSEMBLY - BEGIN -->
                  <deviceConfiguration>
                     <entityID>
                        <xsl:value-of select="$entityID"/>
                     </entityID>
                     <configuration>
                        <interfaces>
                           <interface>
                              <name>
                                 <xsl:value-of select="$port"/>
                              </name>
                             <xsl:choose>
                                <xsl:when test="$interfaceUnitCount > '1'">
                                    
                                 </xsl:when>
                                 <xsl:otherwise>
                                    <description>
                                       <xsl:value-of select="'SPARE'"/>
                                    </description>
                                 </xsl:otherwise>
                              </xsl:choose>
                              
                              <!-- UNIT SUB-STANZA -->
                              <unit operation="delete">
                                 <name>
                                    <xsl:value-of select="$VLAN_ID"/>
                                 </name>		
                              </unit>
                           </interface>
                           <xsl:if test="$qosType = 'QoS per Access'">
                             <xsl:choose>
                                <xsl:when test="$interfaceUnitCount > '1'">
                                    <interface-set>
                                       <name><xsl:value-of select="$ciuName"/></name>
                                       <interface>
                                          <name>
                                             <xsl:value-of select="$port"/>
                                          </name>
                                          <unit operation="delete">
                                             <name><xsl:value-of select="$VLAN_ID"/></name>
                                          </unit>
                                       </interface>
                                    </interface-set>
                                 </xsl:when>
                                 <xsl:otherwise>
                                    <interface-set operation="delete">
                                       <name>
                                          <xsl:value-of select="$ciuName"/>
                                       </name>
                                       </interface-set>
                                 </xsl:otherwise>
                              </xsl:choose>
                           </xsl:if>
                              <!--</xsl:if>-->
                        </interfaces>
                        <routing-instances>
                           <instance operation="delete">
                              <name>
                                 <xsl:value-of select="$SERVICE_ID"/>
                              </name>
                           </instance>
                        </routing-instances>
                        
                       <!-- uncommnet this line if ciuname is unique for each service. -->
                        <policy-options>
                          
                           <policy-statement operation="delete">
                              <name>
                                 <xsl:value-of select="$TML3ImportPolicy" />
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
                                    <xsl:value-of select="$CML3ExportPolicy"/>
                                 </name>
                              </policy-statement>
                           </xsl:if>
                           <xsl:if test="$endPointServiceType = 'TML3' or $endPointServiceType = 'TML3A'">
                              <policy-statement operation="delete">
                                 <name>
                                    <xsl:value-of select="$TML3ExportPolicy"/>
                                 </name>
                              </policy-statement>
                           </xsl:if>
                          
                           <community operation="delete">
                              <name>
                                 <xsl:value-of select="$rtCommunityName" />
                              </name>
                           </community>
                           
                           <xsl:if test="$topology = 'Hub' or $topology = 'Spoke'">
                              <community operation="delete">
                                 <name>
                                    <xsl:value-of select="concat($RT, '_' ,  $vrfName, '_VPRN', $SERVICE_ID, '_', 'HUB')" />
                                 </name>
                              </community>
                           </xsl:if>
                           <xsl:if test="$topology = 'Hub' or $topology = 'Spoke'">
                              <community operation="delete">
                                 <name>
                                    <xsl:value-of select="concat($RT, '_' ,  $vrfName, '_VPRN', $SERVICE_ID, '_', 'SPK')" />
                                 </name>
                              </community>
                           </xsl:if>
                           
                           <community operation="delete">
                              <name>
                                 <xsl:value-of select="$sooCommunityName" />
                              </name>
                           </community>
                           
                           
                           <xsl:if test="$endPointServiceType = 'TML3' or $endPointServiceType = 'TML3A'">
                              <prefix-list operation="delete">
                                 <name>
                                    <xsl:value-of select="$lbMgmtPrefixList" />
                                 </name>
                              </prefix-list>
                             
                             <prefix-list operation="delete">
                                <name>
                                   <xsl:value-of select="$prefixPerfName" />
                                </name>
                             </prefix-list>
                           </xsl:if>     
                        </policy-options>
                        
                        <!-- CLASS-OF-SERVICE STANZA -->
                        
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
                              <!--<xsl:if test="$multiVRF = 'true'">-->
                              <xsl:if test="$qosType = 'QoS per Access'">
                                 <xsl:choose>
                                    <xsl:when test="$interfaceUnitCount > '1'">
                                       
                                    </xsl:when>
                                    <xsl:otherwise>
                                       <interface-set operation="delete">
                                          <name>
                                             <xsl:value-of select="$ciuName"/>
                                          </name>
                                          <!--
                                          <output-traffic-control-profile>
                                             <profile-name>
                                                <xsl:value-of select="$traficControlProfile" /> 
                                             </profile-name>
                                          </output-traffic-control-profile>
                                             -->
                                       </interface-set>
                                    </xsl:otherwise>
                                 </xsl:choose>
                              </xsl:if>
                             </interfaces>
                          </class-of-service>
                        
                        
                     </configuration>
                  </deviceConfiguration>
                  
                  <!-- "DELETE" CONFIGLET ASSEMBLY - END -->
               </xsl:for-each>
            </serviceRequestConfig>
         </xsl:when>
         
         <xsl:otherwise>
         </xsl:otherwise>
      </xsl:choose>
      <!-- CONFIGLET ASSEMBLY - END -->
      
   </xsl:template>
</xsl:stylesheet>
