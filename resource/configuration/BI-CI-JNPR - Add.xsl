<?xml version='1.0' ?>
<!-- 
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

<ns2:ServiceRequest xmlns:ns2="http://provisioning.jmp.juniper.net/servicerequest/dto">
  <ID>11273204</ID>
  <Name>3086555</Name>
  <TypeOfRequest>Provisioning</TypeOfRequest>
  <Description/>
  <ServiceType>FLEX</ServiceType>
  <RecoveryState>Default</RecoveryState>
  <OpType>ADD</OpType>
  <ServiceID>0</ServiceID>
  <Createdby>bhanus</Createdby>
  <CreatedDate>2014-12-23T15:04:30.949Z</CreatedDate>
  <LastModifiedDate>2014-12-23T15:04:30.928Z</LastModifiedDate>
  <State>Requested</State>
  <Customer/>
  <ServiceCommonAttributes>
    <e>
      <accounting>true</accounting>
      <architecture>JCE</architecture>
      <customer>
        <e>
          <description>Default customer</description>
          <email>N/A</email>
          <id>1</id>
          <name> HSIA &amp; TTV</name>
        </e>
      </customer>
      <operationalMode>TST</operationalMode>
      <serviceName>SO1234</serviceName>
      <serviceOrderId>3086555</serviceOrderId>
    </e>
  </ServiceCommonAttributes>
  <Policy>
    <ID>11272287</ID>
    <Name>BI-CI</Name>
  </Policy>
  <ExtRef>1</ExtRef>
  <serviceElementList>
    <serviceElement>
      <deviceID>11337875</deviceID>
      <deviceName>EDTN-LAB-CG01-RE1</deviceName>
      <vendorType>Juniper</vendorType>
      <operation>ADD</operation>
      <entityID>11273205</entityID>
      <seID>0</seID>
      <elementState>0</elementState>
      <elementRecoveryState>Default</elementRecoveryState>
      <ServiceEndpointAttributes>
        <Interface>ge-0/3/4</Interface>
        <accessType>HS</accessType>
        <addressPool null="true"/>
        <ciuAlias>test</ciuAlias>
        <ciuLoopback>13.1.1.1</ciuLoopback>
        <ciuName>test</ciuName>
        <connectionType>RE Direct</connectionType>
        <csId>3421</csId>
        <egressRate>23</egressRate>
        <endPointServiceType>BI</endPointServiceType>
        <ingressRate>12</ingressRate>
        <innerEncap>1</innerEncap>
        <ipAddress>12</ipAddress>
        <ipAddress1>1</ipAddress1>
        <ipAddress2>1</ipAddress2>
        <ipAddress3>1</ipAddress3>
        <ipMTU>1500</ipMTU>
        <ipv6Address/>
        <ipv6NeighAddress/>
        <ipv6Peer>false</ipv6Peer>
        <localPref>350</localPref>
        <loopbackSubnetMask>32</loopbackSubnetMask>
        <med>80</med>
        <neighbourAddress null="true"/>
        <neighbourAddress1 null="true"/>
        <neighbourAddress2 null="true"/>
        <neighbourAddress3 null="true"/>
        <operation>ADD</operation>
        <outerEncap>789</outerEncap>
        <pathPreferences>PRI</pathPreferences>
        <pedeviceId>11337875</pedeviceId>
        <peerAS null="true"/>
        <recordOPType>ADD</recordOPType>
        <routingProtocol>Static</routingProtocol>
        <seId>0</seId>
        <site>EDTN-LAB-CG01-RE1</site>
        <staticRoutes>
          <e>
            <destinationPrefix>21.21.21.21</destinationPrefix>
            <nextHop>22.2.22.22</nextHop>
          </e>
          <e>
            <destinationPrefix>23.23.23.23</destinationPrefix>
            <nextHop>24.23.23.24</nextHop>
          </e>
        </staticRoutes>
        <subnetMask>30</subnetMask>
        <vendorType>Juniper</vendorType>
        <vlanId>789</vlanId>
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
      <xsl:variable name="qosType" select="/*/ServiceCommonAttributes/e/qosType"/>
      <xsl:variable name="schedulerMapForMultiVRF" select="/*/ServiceCommonAttributes/e/schedulerMapForMultiVRF"/>
      
      <xsl:variable name="isAF1Selected" select="/*/ServiceCommonAttributes/e/isAF1Selected"/>
      <xsl:variable name="isAF2Selected" select="/*/ServiceCommonAttributes/e/isAF2Selected"/>
      <xsl:variable name="isAF3Selected" select="/*/ServiceCommonAttributes/e/isAF3Selected"/>
      <xsl:variable name="isAllAFSelected" select="/*/ServiceCommonAttributes/e/isAllAFSelected"/>
      
      <xsl:variable name="af1" select="/*/ServiceCommonAttributes/e/af1"/>
      <xsl:variable name="af2" select="/*/ServiceCommonAttributes/e/af2"/>
      <xsl:variable name="af3" select="/*/ServiceCommonAttributes/e/af3"/>
      
      <xsl:variable name="application" select="/*/ServiceCommonAttributes/e/application"/>
      <xsl:variable name="flowSampling" select="/*/ServiceCommonAttributes/e/flowSampling"/>
      <xsl:variable name="operationalMode1" select="/*/ServiceCommonAttributes/e/operationalMode"/>
      <xsl:variable name="architecture" select="/*/ServiceCommonAttributes/e/architecture"/>
      <xsl:variable name="qosType" select="/*/ServiceCommonAttributes/e/qosType"/>
      <xsl:variable name="redistConnRoutes" select="/*/ServiceCommonAttributes/e/redistConnRoutes"/>
      <xsl:variable name="opType" select="/ns2:ServiceRequest/OpType"/>
      <xsl:variable name="pathId" select="/*/ServiceCommonAttributes/e/pathId"/>
      <xsl:variable name="serviceDefinitionName" select="/ns2:ServiceRequest/Policy/Name"/>
      <xsl:variable name="serviceOrderName" select="/ns2:ServiceRequest/Name"/>
      <xsl:variable name="serviceOrderDescription" select="/ns2:ServiceRequest/Description"/>
      <xsl:variable name="speed" select="/*/ServiceCommonAttributes/e/speed"/>
      <xsl:variable name="userId" select="/ns2:ServiceRequest/Createdby"/>
      
  <!-- TOP-LEVEL DERIVATIONS - END -->
      
      
      <!-- CONSTANT PARAMS ... -->
      <xsl:variable name="smallcase" select="'abcdefghijklmnopqrstuvwxyz'" />
      <xsl:variable name="uppercase" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'" />
      <xsl:variable name="INVENTORY_TYPE_CONFIGURATION" select="'configuration'"/>
      <xsl:variable name="AS_NUMBER" select="'852'"/>
      <xsl:variable name="RT_SCHEDULER_BUFFER_SIZE" select="'10k'"/>
      <xsl:variable name="QoSEnable" select="'true'"/>
   
      <!-- CONFIGLET ASSEMBLY - BEGIN -->
      <xsl:choose>
         <xsl:when test="$opType = 'ADD'">
            <serviceRequestConfig>
               <!-- JNPR PE ENDPOINT CONFIG -->
               <xsl:for-each select="/ns2:ServiceRequest/serviceElementList/serviceElement/ServiceEndpointAttributes[vendorType = 'Juniper']">
               
                  <!-- DEVICE-LEVEL DERIVATIONS - BEGIN -->
			         <xsl:variable name="VLAN_ID" select="outerEncap"/>
                  <xsl:variable name="MTU" select="ipMTU"/>
                  <xsl:variable name="IP-V4-ADDRESS" select="ipAddress"/>
                  <xsl:variable name="IP-V4-MASK" select="subnetMask"/>
                  <xsl:variable name="isIPv6Selected" select="ipv6Peer"/>
                  <xsl:variable name="ipv6IntfAddress" select="ipv6Address"/>
                  <xsl:variable name="peerAS" select="peerAS"/>
                  <xsl:variable name="RD_ID" select="rd"/>
                  <xsl:variable name="neighbourAddress" select="neighbourAddress"/>
                  <xsl:variable name="med" select="med"/>
                  <xsl:variable name="localPref" select="localPref"/>
                  <xsl:variable name="maxRoute" select="maxRoute"/>
                 <xsl:variable name="rpType" select="rpType"/>
                  <xsl:variable name="rpAddress" select="rpAddress"/>
                  <xsl:variable name="vendorType" select="vendorType"/>
                  <xsl:variable name="entityID" select="../entityID"/>
                  <xsl:variable name="deviceID" select="pedeviceId"/>
                  <xsl:variable name="port" select="Interface"/>
                  <xsl:variable name="speed" select="speed"/>
   				   <xsl:variable name="siteDesc" select="site"/>
                  <xsl:variable name="efRate" select="efRate"/>
                 <xsl:variable name="ipv6Peer" select="ipv6Peer"/>
                  <xsl:variable name="enforceRoute" select="enforceRoute"/>
                  
                  <xsl:variable name="csId" select="csId"/>
                  <xsl:variable name="ciuName" select="ciuName"/>
                  <xsl:variable name="pathPreferences" select="pathPreferences"/>
                  <xsl:variable name="accessType" select="accessType"/>
                 
                  <xsl:variable name="serviceType" select="serviceType"/>
                  
                  <xsl:variable name="connectionType" select="connectionType"/>
                  <xsl:variable name="ciuName" select="ciuName"/>
                  <xsl:variable name="ciuAlias" select="ciuAlias"/>
                  
                 <xsl:variable name="siteName" select="site"/>
                  <xsl:variable name="deviceName" select="deviceName"/>
                  <xsl:variable name="endPointServiceType" select="endPointServiceType"/>
                  
                  <xsl:variable name="routingProtocol" select="routingProtocol"/>
                  <xsl:variable name="multiVRF" select="multiVRF"/>
                  <xsl:variable name="firstUnitForVRF" select="firstUnitForVRF"/>
                  <xsl:variable name="traficControlProfile" select="traficControlProfile"/>
                  <xsl:variable name="addressPool1" select="addressPool"/>
                  <xsl:variable name="staticCustExport" select="staticCustExport"/>
                  <xsl:variable name="staticTelusNoExport" select="staticTelusNoExport"/>
                  <xsl:variable name="bgpPrefixListCustExport" select="bgpPrefixListCustExport"/>
                  <xsl:variable name="bgpPrefixListTelusNoExport" select="bgpPrefixListTelusNoExport"/>
                  <xsl:variable name="staticExport" select="staticExport"/>
                  <xsl:variable name="staticNoExport" select="staticNoExport"/>
                  <xsl:variable name="bgpExport" select="bgpExport"/>
                  <xsl:variable name="bgpNoExport" select="bgpNoExport"/>
                  <xsl:variable name="nextHopCustExport" select="nextHopVal"/>
                  <xsl:variable name="nextHopTelusNoExport" select="nextHopTelusSupplier"/>
                  
                  <xsl:variable name="egressRate" select="egressRate"/>
                  <xsl:variable name="operationalMode" select="operationalMode"/>
                  <xsl:variable name="isGEPort">
                     <xsl:value-of select="starts-with($port,'ge')"/>
                  </xsl:variable>
                  <xsl:variable name="adminState" select="adminState"/>
                  <xsl:variable name="portSpeed" select="portSpeed"/>
                  <xsl:variable name="rate">
                     <xsl:value-of select="$egressRate"/> 
                  </xsl:variable>
                  
                  
                  
                  <xsl:variable name="ip4NetworkAddress" select="ip4NetworkAddress"/>
                  
                  <xsl:variable name="ip4NetworkAddressAndMask">
                     <xsl:value-of select="concat($ip4NetworkAddress, '/', $IP-V4-MASK)"/>
                  </xsl:variable>
                  
                  <xsl:variable name="interfaceUnitVlanRE">
                     <xsl:value-of select="$VLAN_ID"/>
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
                        <xsl:when test="$isIPv6Selected = 'true'">
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
                 
                  <xsl:variable name="efRateUpperCase">
                     <xsl:value-of select="translate($efRate, $smallcase, $uppercase)" />
                  </xsl:variable>
                  
                  <xsl:variable name="egressRateUpperCase">
                     <xsl:value-of select="translate($egressRate, $smallcase, $uppercase)" />
                  </xsl:variable>
                
                  <xsl:variable name="interfaceName">
                     <xsl:value-of select="concat($port, '.', $VLAN_ID)" />
                  </xsl:variable>  
                  
                 <xsl:variable name="routingInstanceBGPDescription">
                     <xsl:value-of select="concat($csId, '.', $ciuName, '.', $vpnName, '.', $pathPreferences)" />
                  </xsl:variable>
                  
                  <xsl:variable name="vpnSpeed">
                     <xsl:value-of select="'V0M'" />
                  </xsl:variable>
                                  
                  <xsl:variable name="portDescription">
                     <xsl:value-of select="concat($csId,  '.', $ciuName, '.', $egressRateUpperCase)" />
                  </xsl:variable>
                   <xsl:variable name="customerV4ImportPolicy">
                     <xsl:choose>
                        <xsl:when test="$endPointServiceType = 'BI'">
                           <xsl:value-of select="'CUSTOMER-IN-BI-V4-V6'" />
                        </xsl:when>
                        <xsl:when test="$endPointServiceType = 'CI'">
                           <xsl:value-of select="'CUSTOMER-IN-CI-V4-V6'" />
                        </xsl:when>
                        <xsl:otherwise>
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                   <xsl:variable name="interfaceUnitDescription">
                      <xsl:value-of select="concat($csId, '.', $ciuName, '.' , $accessType, '.', '0M', '.', 'BICI' , '..',  $protocol, '..', $pathPreferences,  '..', $architecture, '.', $accessOptionConnectionType,  '...', $ciuAlias)" />
                    </xsl:variable>
                  
                  <xsl:variable name="interfaceNeighDescription">
                     <xsl:value-of select="concat($csId, '.', $ciuName, '...', 'BICI' , '..',  $protocol, '..', $pathPreferences)" />
                  </xsl:variable>
                  <!-- IMPORT POLICIES for any IPv4-ONLY Customers -->
                  <xsl:variable name="CUSTIN-V4">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'PRI'">
                           <xsl:value-of select="concat('CUSTIN-V4',  '_',  $ciuName, '_', 'PRI')" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'SEC'">
                           <xsl:value-of select="concat('CUSTIN-V4',  '_',  $ciuName, '_', 'SEC')" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('CUSTIN-V4',  '_',  $ciuName, '_', 'PRI')" />
                        </xsl:otherwise>
                     </xsl:choose>
                   </xsl:variable>
                  
                  <xsl:variable name="DEFAULT-ONLY">
                     <xsl:value-of select="'DEFAULT-ONLY'" />
                  </xsl:variable>
                  
                  <xsl:variable name="CUST-FULL-OUT">
                     <xsl:value-of select="'CUST-FULL-OUT'" />
                  </xsl:variable>
                  
                  <!--IMPORT POLICIES for ANY IPv6-enabled Customers -->
                  <xsl:variable name="CUSTIN-V4V6">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'PRI'">
                           <xsl:value-of select="concat('CUSTIN-V4V6',  '_',  $ciuName, '_', 'PRI')" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'SEC'">
                           <xsl:value-of select="concat('CUSTIN-V4V6',  '_',  $ciuName, '_', 'SEC')" />
                        </xsl:when>
                       <xsl:otherwise>
                           <xsl:value-of select="concat('CUSTIN-V4V6',  '_',  $ciuName, '_', 'PRI')" />
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                  <!--EXPORT POLICIES for DEFAULT ONLY for IPv6-enabled Customers-->
                  <xsl:variable name="DEFAULTONLYV6">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'PRI'">
                           <xsl:value-of select="concat('DEFAULTONLYV6',  '_',  $ciuName, '_', 'P')" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'SEC'">
                           <xsl:value-of select="concat('DEFAULTONLYV6',  '_',  $ciuName, '_', 'S')" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('DEFAULTONLYV6',  '_',  $ciuName, '_', 'P')" />
                        </xsl:otherwise>
                     </xsl:choose>
                     
                  </xsl:variable>
                   <!--EXPORT POLICIES for FULL ROUTES for IPv6-enabled Customers-->
                  <xsl:variable name="CUSTFULLOUTV6">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'PRI'">
                           <xsl:value-of select="concat('CUSTFULLOUTV6',  '_',  $ciuName, '_', 'P')" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'SEC'">
                           <xsl:value-of select="concat('CUSTFULLOUTV6',  '_',  $ciuName, '_', 'S')" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('CUSTFULLOUTV6',  '_',  $ciuName, '_', 'P')" />
                        </xsl:otherwise>
                     </xsl:choose>
                     
                  </xsl:variable>
                  
                  <xsl:variable name="DEFAULT-ONLY-V4-V6">
                     <xsl:value-of select="'DEFAULT-ONLY-V4-V6'" />
                  </xsl:variable>
                  
                  <xsl:variable name="CUST-FULL-OUT-V4-V6">
                     <xsl:value-of select="'CUST-FULL-OUT-V4-V6'" />
                  </xsl:variable>
                  
                  <xsl:variable name="STATIC-V4-E">
                    <xsl:choose>
                        <xsl:when test="$pathPreferences = 'PRI'">
                           <xsl:value-of select="concat('STATIC-V4-E-LP350',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'SEC'">
                           <xsl:value-of select="concat('STATIC-V4-E-LP340',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('STATIC-V4-E-LP350',  '-',  $deviceName)" />
                        </xsl:otherwise>
                     </xsl:choose>
                   </xsl:variable>
                  
                  <xsl:variable name="STATIC-V4-NE">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'PRI'">
                           <xsl:value-of select="concat('STATIC-V4-NE-LP350',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'SEC'">
                           <xsl:value-of select="concat('STATIC-V4-NE-LP340',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('STATIC-V4-NE-LP350',  '-',  $deviceName)" />
                        </xsl:otherwise>
                     </xsl:choose>
                     
                     
                  </xsl:variable>
                  
                  <xsl:variable name="STATIC-V6-E">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'PRI'">
                           <xsl:value-of select="concat('STATIC-V6-E-LP350',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'SEC'">
                           <xsl:value-of select="concat('STATIC-V6-E-LP340',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('STATIC-V6-E-LP350',  '-',  $deviceName)" />
                        </xsl:otherwise>
                     </xsl:choose>
                     
                     
                  </xsl:variable>
                  
                  <xsl:variable name="STATIC-V6-NE">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'PRI'">
                           <xsl:value-of select="concat('STATIC-V6-NE-LP350',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'SEC'">
                           <xsl:value-of select="concat('STATIC-V6-NE-LP340',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('STATIC-V6-NE-LP350',  '-',  $deviceName)" />
                        </xsl:otherwise>
                     </xsl:choose>
                     
                  </xsl:variable>
                  
                  <xsl:variable name="PREFIX-IPV4">
                     <xsl:value-of select="concat('PREFIX-IPV4',  '_',  $ciuName)" />
                  </xsl:variable>
                  
                  <xsl:variable name="DIRECT-BGP-V6">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'PRI'">
                           <xsl:value-of select="concat('DIRECT-BGP-V6-LP350',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'SEC'">
                           <xsl:value-of select="concat('DIRECT-BGP-V6-LP340',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('DIRECT-BGP-V6-LP350',  '-',  $deviceName)" />
                        </xsl:otherwise>
                     </xsl:choose>
                     
                     
                  </xsl:variable>
                  
                  <xsl:variable name="PREFIX-IPV6">
                     <xsl:value-of select="concat('PREFIX-IPV6',  '_',  $ciuName)" />
                  </xsl:variable>
                  
                  <!-- search for the interface description-->
                  <!--
                  <xsl:variable name="interface_XPath">
                     <xsl:value-of select="concat('configuration/interfaces[name=&quot;', $port, '&quot;]')"/>
                  </xsl:variable> 
                  
                  <xsl:variable name="interfaceSearch_NodeSet" select="ServiceActivationUtils:getSubTreeFromInventory($deviceID, $vendorType, $INVENTORY_TYPE_CONFIGURATION, $interface_XPath)"/>
                  
                  <xsl:variable name="interfaceDescription">
                     <xsl:value-of select="$interfaceSearch_NodeSet/description"/>
                  </xsl:variable>  -->
                  
                 <!-- DEVICE-LEVEL DERIVATIONS - END -->
               
               
                  <!-- "ADD" CONFIGLET ASSEMBLY - BEGIN -->
                  
                  <deviceConfiguration>
                     <entityID>
                        <xsl:value-of select="$entityID"/>
                    </entityID>
                     <configuration>
                        <interfaces>
                           <xsl:if test="$accessOptionConnectionType = 'REDI'">
                            <interface>
                                 <name>
                                    <xsl:value-of select="$port"/>
                                 </name>
                               <!-- if BIGS detected, dont override -->
                               <xsl:if test="$qosType != 'QoS per Access' and $qosType != 'QoS per VPN'">
                                <description>
                                    <xsl:value-of select="$portDescription"/>
                                 </description>
                               </xsl:if>
                               <xsl:if test="$isGEPort = 'true'">
                                  <speed>
                                     <xsl:value-of select="$portSpeed"/> 
                                  </speed>
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
                                       <xsl:value-of select="$interfaceUnitVlanRE"/>
                                    </name>
                                    
                                    <description>
                                       <xsl:value-of select="$interfaceUnitDescription"/>
                                    </description>
                                    
                                    <xsl:if test="$endPointServiceType = 'BI'">
                                     <vlan-id>
                                        <xsl:value-of select="$interfaceUnitVlanRE"/>
                                      </vlan-id>
                                    </xsl:if>
                                    <family>
                                       <inet>
                                          <filter>
                                             <input-list>
                                                <filter-name>500</filter-name>
                                             </input-list>
                                             <input-list>
                                                 <filter-name>INTERNET_CLASSIFIER</filter-name>
                                             </input-list>
                                            <output>
                                                <filter-name>OUT_TO_BI</filter-name><!--ONLY for TELUS MANAGE BI-->
                                             </output>
                                          </filter>
                                         <address>
                                           <name>
                                              <xsl:value-of select="$IPv4AddressMask"/>
                                           </name>
                                          </address>
                                       </inet>
                                    </family>
                                 </unit>
                              </interface>
                           </xsl:if>
                           <xsl:if test="$accessOptionConnectionType = 'REDU'"><!-- CPE connect to RE through DE or DSLAM .-->
     						       <interface>
                                <name>
                                   <xsl:value-of select="$port"/>
                                </name>
     						          <!-- if BIGS detected, dont override -->
     						          <xsl:if test="$qosType != 'QoS per Access' and qosType != 'QoS per VPN'">
     						             <description>
     						                <xsl:value-of select="$portDescription"/>
     						             </description>
     						          </xsl:if>
     						          <xsl:if test="$isGEPort = 'true'">
     						             <speed>
     						                <xsl:value-of select="$portSpeed"/> 
     						             </speed>
     						          </xsl:if>
     						          <xsl:if test="$adminState = 'Down'">
     						             <disable/> 
     						          </xsl:if>
     						          <xsl:if test="$adminState = 'Up'">
     						             <disable operation="delete">
     						             </disable> 
     						          </xsl:if>
     						          
                                <!--<flexible-vlan-tagging>
                                </flexible-vlan-tagging>
                                -->
                                <unit>
                                   <name>
                                      <xsl:value-of select="$VLAN_ID"/>
                                   </name>
                                    <vlan-id>
                                       <xsl:value-of select="$VLAN_ID"/>
                                     </vlan-id>
                                   
                                   <family>
                                      <inet>
                                         <filter>
                                            <input-list>
                                               <filter-name>500</filter-name>
                                            </input-list>
                                            <input-list>
                                               <filter-name>INTERNET_CLASSIFIER</filter-name>
                                            </input-list>
                                            <output>
                                               <filter-name>OUT_TO_BI</filter-name><!--ONLY for TELUS MANAGE BI-->
                                            </output>
                                         </filter>
                                        <address>
                                          <name>
                                             <xsl:value-of select="$IPv4AddressMask"/>
                                          </name>
                                         </address>
                                      </inet>
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
                        
                        
                       <class-of-service>
                          
                         
                           <xsl:choose>
                               <xsl:when test="$qosType = 'QoS per Access'">
                                  <scheduler-maps>
                                  <name>
                                     <xsl:value-of select="concat($schedulerMapForMultiVRF,  '_',  'BE')" /> 
                                  </name>
                                  
                                  <forwarding-class>
                                     <name>FC_TOLL_VOICE_AND_SIGNALING</name>
                                     <scheduler>RP</scheduler>
                                  </forwarding-class>
                                  <xsl:if test="$isAF3Selected = 'true'">
                                     <forwarding-class>
                                        <name>FC_LOW_LATENCY_DATA_GREEN</name>
                                        <scheduler>
                                           <xsl:value-of select="concat('AF',  '_',  $af3)" />
                                        </scheduler>
                                     </forwarding-class>
                                  </xsl:if>
                                  <xsl:if test="$isAF2Selected = 'true'">
                                     <forwarding-class>
                                        <name>FC_HIGH_THROUGHPUT_DATA_GREEN</name>
                                        <scheduler>
                                           <xsl:value-of select="concat('AF',  '_',  $af2)" />
                                        </scheduler>
                                     </forwarding-class>
                                  </xsl:if>
                                  <xsl:if test="$isAF1Selected = 'true'">
                                     <forwarding-class>
                                        <name>FC_LOW_PRIORITY_DATA_GREEN</name>
                                        <scheduler>
                                           <xsl:value-of select="concat('AF',  '_',  $af1)" />
                                        </scheduler>
                                     </forwarding-class>
                                  </xsl:if>
                                  </scheduler-maps>
                               </xsl:when>
                               <xsl:otherwise>
                                  
                               </xsl:otherwise>
                            </xsl:choose>
                            
                           
                          <traffic-control-profiles>
                             
                                <xsl:choose>
                                   <!-- if multivrf, use the same scheduler with the _BE -->
                                   <xsl:when test="$qosType = 'QoS per Access'">
                                      <name>
                                        <xsl:value-of select="concat($traficControlProfile,  '_BE')" /> 
                                      </name>
                                      <scheduler-map>
                                         <xsl:value-of select="concat($schedulerMapForMultiVRF,  '_',  'BE')" /> 
                                      </scheduler-map>
                                      <shaping-rate>
                                         <rate>
                                            <xsl:value-of select="$rate" /> <!--<100m>-->
                                         </rate>
                                      </shaping-rate>
                                   </xsl:when>
                                   <xsl:otherwise>
                                      <name>
                                       <xsl:value-of select="concat('BI',  '_',  $rate)" /> 
                                      </name>
                                      <scheduler-map>BICI-SCHED</scheduler-map>
                                      <shaping-rate>
                                         <rate>
                                            <xsl:value-of select="$rate" /> <!--<100m>-->
                                         </rate>
                                      </shaping-rate>
                                   </xsl:otherwise>
                                </xsl:choose>
                             
                          </traffic-control-profiles>
                           
                           <!--# depend on the connection type, if CPE directly connect to RE, 
                          	# the interface type will be ge- or xe-; if CPE connect through DE or
                          	# DSLAM ,the interface type will be ae<1> TODO: confirm why is repeat??--> 
                           
                           <interfaces>
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
                                          <xsl:choose>
                                             <xsl:when test="$qosType = 'QoS per Access'">
                                                <xsl:value-of select="concat($traficControlProfile,  '_BE')" /> 
                                             </xsl:when>
                                             <xsl:otherwise>
                                                <xsl:value-of select="concat('BI',  '_',  $rate)" /> 
                                             </xsl:otherwise>
                                          </xsl:choose>
                                       </profile-name>
                                    </output-traffic-control-profile>
                                 </unit>
                              </interface>
                              <xsl:if test="$qosType = 'QoS per Access'">
                                 <interface-set>
                                    <name>
                                       <xsl:value-of select="$ciuName"/>
                                    </name>
                                    <output-traffic-control-profile>
                                       <profile-name>
                                          <xsl:value-of select="concat($traficControlProfile,  '_BE')" /> 
                                       </profile-name>
                                    </output-traffic-control-profile>
                                 </interface-set>
                              </xsl:if>
                           </interfaces>					
                        </class-of-service>
                       
                    <!--ROUTING_OPTIONS started-->
						  <!-- For IPv4 ONLY.  Add the static routes for the CIU.  Repeat this for every subnet that is entered.  -->
							<xsl:if test="$routingProtocol = 'Static' ">
							   
      						<routing-options>
      						   <xsl:if test="$staticExport = 'true'">
           							<static>
           							   <xsl:for-each select="staticRoutes/staticRoutes/e">
           							      <xsl:variable name="route" select="destinationPrefix" />
           							     <route>
               								   <name>
               								     <xsl:value-of select="$route" />
               								   </name>
               									<next-hop>
               									   <xsl:value-of select="$nextHopCustExport" />
               									</next-hop>
               								</route>
           							   </xsl:for-each>
           							</static>
      						   </xsl:if>
      						   <xsl:if test="$staticNoExport = 'true'">
      						   <static>
      						      <xsl:for-each select="StaticRoutesNoExport/staticRoutesTelusNoExport/e">
      						         <xsl:variable name="route" select="destinationPrefix" />
      						         <route>
      						            <name>
      						              <xsl:value-of select="$route" />
      						            </name>
      						            <next-hop>
      						               <xsl:value-of select="$nextHopCustExport" />
      						            </next-hop>
      						         </route>
      						      </xsl:for-each>
      						   </static>
      						   </xsl:if>
      						</routing-options>
                        
                    <!-- For IPv6 enable - Add the static routes for the CIU.  Repeat this for every subnet that is entered.  -->
                        <xsl:if test="$isIPv6Selected = 'true'">
                           <routing-options>
                              <rib>
                                 <name>inet6.0</name>
                                 <static>
                                    <xsl:for-each select="staticRoutesForIPv6/staticRoutesForIPv6/e">
                                       <xsl:variable name="route" select="destinationPrefix" />
                                       <xsl:variable name="nextHop" select="nextHop" />
                                       <route>
                                          <name>
                                             <xsl:value-of select="concat($route,'/','32')" /><!--{IPv6 subnet}/{prefix length}-->
                                          </name>
                                          <next-hop>
                                             <xsl:value-of select="$nextHop" /><!--{Peer IPv6 address}-->
                                          </next-hop>
                                       </route>
                                    </xsl:for-each>
                                 </static>
                              </rib>
                           </routing-options>
                        </xsl:if> 
                     </xsl:if>
						
						<!-- For IPv4 ONLY.  Add each subnet to this prefix-list when Address Pool is Customer Provided  -->
					    
                        <policy-options>
                           <xsl:if test="$routingProtocol = 'Static' ">
                              <xsl:if test="$staticExport = 'true'">
      							     <prefix-list>
      									<name>
      									   <xsl:value-of select="$STATIC-V4-E" />
      									</name>
      							       <xsl:for-each select="staticRoutes/staticRoutes/e">
      									      <prefix-list-item>
      									      <xsl:variable name="route" select="destinationPrefix" />
           										
      									      <name> 
      									         <xsl:value-of select="$route" />
      									      </name>
      									      </prefix-list-item>
      									     </xsl:for-each>
      							        
      								    </prefix-list>
   					             </xsl:if>
						
							<!-- For IPv4 ONLY.  Add each subnet to this prefix-list when Address Pool is TELUS Provided  -->
                              <xsl:if test="$staticNoExport = 'true'">
     							     <prefix-list>
     									<name>
     									   <xsl:value-of select="$STATIC-V4-NE" /><!--STATIC-V4-NE-LP350-{RE-device-name}-->
     									</name>
     							        <xsl:for-each select="StaticRoutesNoExport/staticRoutesTelusNoExport/e">
     									      <prefix-list-item>
     									      <xsl:variable name="route" select="destinationPrefix" />
     									      <name> 
     									         <xsl:value-of select="$route" />
     									      </name>
     									      </prefix-list-item>
     									    </xsl:for-each>
     										
     								    </prefix-list>
     						       </xsl:if>
                              
					   <!-- For IPv6 enable - Add each subnet to this prefix-list when Address Pool is Customer Provided .-->
					    
                         <xsl:if test="$isIPv6Selected = 'true' and $staticCustExport > '0'">			
    								<prefix-list>
    								  <name>
    									   <xsl:value-of select="$STATIC-V6-E" /><!--STATIC-V6-E-LP350-{RE-device-name}-->
    									</name>
    									
    								   <xsl:for-each select="staticRoutesForIPv6/staticRoutesForIPv6/e">
    									      <prefix-list-item>
    									      <xsl:variable name="route" select="destinationPrefix" />
    									      <xsl:variable name="nextHop" select="nextHop" />
    									      <name> 
    									         <!--<xsl:value-of select="concat($route,'/','32')" />-->
    									         <xsl:value-of select="$route" />
    									      </name>
    									      </prefix-list-item>
    										</xsl:for-each>
    										
    									
    								</prefix-list>
    						</xsl:if>
                      
						<!-- For IPv6 enable - Add each subnet to this prefix-list when Address Pool is Customer Provided .  -->
                              <xsl:if test="$isIPv6Selected = 'true' and $staticTelusNoExport > '0'">
                                 <prefix-list>
                                    <name>
                                       <xsl:value-of select="$STATIC-V6-NE"/>
                                       <!--STATIC-V6-NE-LP350-{RE-device-name}-->
                                    </name>

                                    <xsl:for-each select="staticRoutesForIPv6/staticRoutesForIPv6/e">
                                       <prefix-list-item>
                                          <xsl:variable name="route" select="destinationPrefix"/>
                                          <xsl:variable name="nextHop" select="nextHop"/>
                                          <name>
                                             <!--<xsl:value-of select="concat($route,'/','32')" />-->
                                             <xsl:value-of select="$route"/>
                                          </name>
                                       </prefix-list-item>
                                    </xsl:for-each>

                                 </prefix-list>
						</xsl:if>
				     </xsl:if>
                           
                 <xsl:if test="$routingProtocol != 'Static' "> 
                        <xsl:if test="$bgpExport = 'true'">
                           <prefix-list>
                              <name>
                                 <xsl:value-of select="concat('PREFIX-IPV4', '_', 'E',  '_',  $ciuName)" />
                              </name>
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
                        <xsl:if test="$bgpNoExport = 'true'">
                           <prefix-list>
                              <name>
                                 <xsl:value-of select="concat('PREFIX-IPV4', '_', 'NE',  '_',  $ciuName)" />
                              </name>
                              <xsl:for-each select="prefixListTelusSupplier/prefixListTelusSupplier/e">
                                 <prefix-list-item>
                                    <xsl:variable name="route" select="prefixList" />
                                    <name> 
                                       <xsl:value-of select="$route" />
                                    </name>
                                 </prefix-list-item>
                              </xsl:for-each>
                           </prefix-list>
                        </xsl:if>
                    </xsl:if>
					  
					  <!-- For IPv6 enable - Mandatory add of the customer interface to the pre-defined policy  -->
                 <xsl:if test="$routingProtocol != 'Static' and $isIPv6Selected = 'true'"> <!-- for BGP only and IPv6 -->
						 	<prefix-list>
								<name>
								   <xsl:value-of select="$DIRECT-BGP-V6" /><!--DIRECT-BGP-V6-LP350-{RE-device-name}-->
								</name>
						 	  
						 	   <xsl:for-each select="ipv6PrefixList/ipv6PrefixList/e">
								         <prefix-list-item>
								         <xsl:variable name="route" select="ipv6PrefixList" />
								         <name> 
								            <xsl:value-of select="$route" />
								         </name>
								         </prefix-list-item>
								      </xsl:for-each>
								  
							</prefix-list>
						   <xsl:if test="$routingProtocol = 'Default' ">
						     <prefix-list>
						         <name>
						            <xsl:value-of select="$PREFIX-IPV6" /><!--PREFIX-IPV6_<CIU Name>-->
						         </name>
						         
						            <!--
						            <name>
						               <xsl:value-of select="$ciuLoopbackAndSubnetMask" />
						            </name> -->
						               <xsl:choose>
						                  <xsl:when test="$isIPv6Selected = 'false'">
						                     <xsl:for-each select="prefixList/prefixList/e">
						                        <prefix-list-item>
						                        <xsl:variable name="route" select="prefixList" />
						                        <name> 
						                           <xsl:value-of select="$route" />
						                        </name>
						                        </prefix-list-item>
						                     </xsl:for-each>
						                  </xsl:when>
						                  <xsl:otherwise>
						                     <xsl:for-each select="ipv6PrefixList/ipv6PrefixList/e">
						                        <prefix-list-item>
						                        <xsl:variable name="route" select="ipv6PrefixList" />
						                        <name> 
						                           <xsl:value-of select="$route" />
						                        </name>
						                        </prefix-list-item>
						                     </xsl:for-each>
						                  </xsl:otherwise>
						               </xsl:choose>
						         
						      </prefix-list>
						   </xsl:if>
						</xsl:if>
                        
                     <!-- IPv4 and IPV6 Enabled , Default-Only , Export Policy Configuration , Generic Policy used to export IPV4 default route -->
                      <xsl:if test="$isIPv6Selected = 'true' and $routingProtocol = 'Default' ">
                         <!-- Customer specific policy to export IPV6 default route also check for primary and secondary--> 
                         <policy-statement>
                            <name>
                               <xsl:value-of select="$DEFAULTONLYV6" /><!--DEFAULTONLYV6_<CIU NAME>_P-->
                            </name>
                            <term>
                               <name>10</name>
                               <from>
                                  <family>inet6</family><!-- ipv6 -->
                                  <prefix-list>DEFAULT-IPV6</prefix-list>
                               </from>
                               <to>
                                  <protocol>bgp</protocol>
                               </to>
                               <then>
                                  <!--IPV6 route exported to customer must have Next Hop set to REs IPV6 address -->
                                  <next-hop>
                                     <xsl:value-of select="$ipv6IntfAddress" />
                                  </next-hop> <!--TODO:  - fe80::ac00:b8a0:c844 - IPV6 address of primary or second REs interface facing customer CPE> --> <!-- TODO - is next-hop is inside term. dont see it in the API??-->
                                  
                                  <accept/>
                               </then>
                              </term>
                            <term>
                               <name>1000</name>
                               <then>
                                  <reject/>
                               </then>
                            </term>
                         </policy-statement>
                      </xsl:if>
                      
                       <xsl:if test="$isIPv6Selected = 'true' and $routingProtocol = 'Full' or $routingProtocol = 'Default-Full' ">
                         <!-- IPV6 specific policy that contains customer site specific parameters-->
                           <policy-statement>
                              <name>
                                 <xsl:value-of select="$CUSTFULLOUTV6" /> <!--CUSTFULLOUTV6_<CIU NAME>_P-->
                              </name>
                              <term>
                                 <name>10</name>
                                 <from>
                                    <family>inet6</family>
                                    <community>CUST</community>
                                 </from>
                                 <then>
                                    <!-- <community>replace</community> TODO: dont find replace inside the community in the junos XML API. confirm?  replace with 200 -->
                                    <!--IPV6 route exported to customer must have NextHop set to REs IPV6 address -->
                                    
                                    <community>
                                       <set/>
                                       <community-name>200</community-name>
                                    </community>
                                    
                                    <next-hop>
                                       <xsl:value-of select="$ipv6IntfAddress" />
                                    </next-hop><!--fe80::f0e1:1d38:2459 - <IPV6 address of REs interface facing customer CPE> -->
                                    <origin>igp</origin>
                                    <accept/>
                                 </then>
                              </term>
                              <term>
                                 <name>20</name>
                                 <from>
                                    <family>inet6</family>
                                    <community>PEER</community>
                                 </from>
                                 <then>
                                    <community>
                                       <set/>
                                       <community-name>180</community-name>
                                    </community>
                                    <!--IPV6 route exported to customer must have Next Hop set to REs IPV6 address -->
                                    <next-hop>
                                       <xsl:value-of select="$ipv6IntfAddress" />
                                    </next-hop><!--<fe80::f0e1:1d38:2459 = IPV6 address of REs interface facing customer CPE> -->
                                    <origin>igp</origin>
                                    <accept/>
                                 </then>
                              </term>
                              <!--advertise TELUS transit routes with external community tag  -->
                              <term>
                                 <name>30</name>
                                 <from>
                                    <family>inet6</family>
                                 </from>
                                 <then>
                                    <community>
                                       <set/>
                                       <community-name>170</community-name>
                                    </community>
                                    <!--IPV6 route exported to customer must have Next Hop set to REs IPV6 address -->
                                    <next-hop>
                                       <xsl:value-of select="$ipv6IntfAddress" />
                                    </next-hop>
                                    <origin>igp</origin>
                                    <accept/>
                                 </then>
                              </term>
                           </policy-statement>
                         </xsl:if>
                        
                      <!-- ipv4 only Default only import policy configuration -->
                           <!-- not using so far..wating for TELUS on this -->
                       <!--<xsl:if test="$isIPv6Selected = 'true' and $routingProtocol = 'Default'"> -->
                       <xsl:if test="$routingProtocol != 'Static'">
                         <policy-statement>
                            <name>
                               <xsl:value-of select="$CUSTIN-V4V6" />
                            </name>
                            <xsl:if test="$bgpNoExport = 'true'">
                            <term>
                               <name>ENTRY_10:V4-NO-EXPORT</name>
                               <from>
                                  <prefix-list>
                                     <xsl:value-of select="concat('PREFIX-IPV4', '_', 'NE',  '_',  $ciuName)" />
                                  </prefix-list>
                               </from>
                               <then>
                                  <community>
                                     <add/>
                                        <community-name>NO-EXPORT</community-name>
                                    
                                  </community>
                               </then>
                            </term>
                            <xsl:if test="$isIPv6Selected = 'true'">
                            <term>
                               <name>ENTRY_20:V6-NO-EXPORT</name>
                               <from>
                                  <prefix-list>
                                     <xsl:value-of select="concat('PREFIX-IPV6', '_', 'NE',  '_',  $ciuName)" />
                                  </prefix-list>
                               </from>
                               <then>
                                  <community>
                                     <add/>
                                        <community-name>NO-EXPORT</community-name>
                                    
                                  </community>
                                  <accept/>
                               </then>
                            </term>
                            </xsl:if>
                            </xsl:if>
                            <!--  Allow only Customer IPV4 prefixes -->
                            <xsl:if test="$bgpNoExport = 'true'">
                            <term>
                               <name>ENTRY_30:V4-NO-EXPORT</name>
                               <from>
                                  <prefix-list>
                                     <xsl:value-of select="concat('PREFIX-IPV4', '_', 'NE',  '_',  $ciuName)" />
                                  </prefix-list>
                               </from>
                               <then>
                                  <community>
                                     <add/>
                                          <community-name>
                                           <xsl:value-of select="concat('BICI-NO-EXPORT', '-', $deviceName)" />
                                           </community-name>
                                     </community>
                                  <accept/>
                               </then>
                            </term>
                            </xsl:if>
                            <xsl:if test="$bgpExport = 'true'">
                               <term>
                                  <name>ENTRY_35:V4-EXPORT</name>
                                  <from>
                                     <prefix-list>
                                        <xsl:value-of select="concat('PREFIX-IPV4', '_', 'E',  '_',  $ciuName)" />
                                     </prefix-list>
                                  </from>
                                  <then>
                                     <community>
                                        <add/>
                                           <community-name>
                                              <xsl:value-of select="concat('BICI-EXPORT', '-', $deviceName)" />
                                           </community-name>
                                        <!--< BICI-NO-EXPORT-<RE Device Name> | BICI-EXPORT-<RE Device Name> >    TODO - discuss with mark -->
                                     </community>
                                     <accept/>
                                  </then>
                               </term>
                            </xsl:if>
                            <!-- tag Customer IPV6 prefixes with 852:40000 -->
                            <xsl:if test="$isIPv6Selected = 'true' and $bgpNoExport = 'true'">
                            <term>
                               <name>ENTRY_40:V6-ANY</name>
                               <from>
                                  <prefix-list>
                                     <xsl:value-of select="concat('PREFIX-IPV6', '_', 'NE',  '_',  $ciuName)" />
                                  </prefix-list>
                               </from>
                               <then>
                                  <community>
                                     <add/>
                                        <community-name>IPV6</community-name>
                                    </community>
                                  <accept/>
                               </then>
                            </term>
                           
                             <term>
                                <name>ENTRY_50:V6-NO-EXPORT</name>
                                 <from>
                                    <prefix-list>
                                       <xsl:value-of select="concat('PREFIX-IPV6', '_', 'NE',  '_',  $ciuName)" />
                                    </prefix-list>
                                 </from>
                                 <then>
                                    <community>
                                       <add/>
                                          <community-name>
                                             <xsl:value-of select="concat('BICI-NO-EXPORT', '-', $deviceName)" />
                                          </community-name>
                                    </community>
                                    <!-- IPv6 routes received from the customer must have their NH set to CPEss WAN V6 address-->
                                    <next-hop>
                                       <xsl:value-of select="$ipv6IntfAddress" />
                                    </next-hop> <!--V6 address of CPEs WAN interface -->
                                    <accept/>
                                 </then>
                              </term>
                               <term>
                                  <name>ENTRY_50:V6-NO-EXPORT</name>
                                  <from>
                                     <prefix-list>
                                        <xsl:value-of select="concat('PREFIX-IPV6', '_', 'NE',  '_',  $ciuName)" />
                                     </prefix-list>
                                  </from>
                                  <then>
                                     <community>
                                        <add/>
                                        <community-name>
                                           <xsl:value-of select="concat('BICI-NO-EXPORT', '-', $deviceName)" />
                                        </community-name>
                                     </community>
                                     <!-- IPv6 routes received from the customer must have their NH set to CPEss WAN V6 address-->
                                     <next-hop>
                                        <xsl:value-of select="$ipv6IntfAddress" />
                                     </next-hop> <!--V6 address of CPEs WAN interface -->
                                     <accept/>
                                  </then>
                               </term>
                            </xsl:if>
                            <xsl:if test="$isIPv6Selected = 'true' and $bgpNoExport = 'true'">
                               <term>
                                  <name>ENTRY_55:V6-EXPORT</name>
                                  <from>
                                     <prefix-list>
                                        <xsl:value-of select="concat('PREFIX-IPV6', '_', 'E',  '_',  $ciuName)" />
                                     </prefix-list>
                                  </from>
                                  <then>
                                     <community>
                                        <add/>
                                        <community-name>
                                           <xsl:value-of select="concat('BICI-EXPORT', '-', $deviceName)" />
                                        </community-name>
                                     </community>
                                     <!-- IPv6 routes received from the customer must have their NH set to CPEss WAN V6 address-->
                                     <next-hop>
                                        <xsl:value-of select="$ipv6IntfAddress" />
                                     </next-hop> <!--V6 address of CPEs WAN interface -->
                                     <accept/>
                                  </then>
                               </term>
                            </xsl:if>
                            <term>
                               <name>ENTRY_100:LAST</name>
                               <then>
                                  <reject/>
                               </then>
                            </term>			
                         </policy-statement>
                        </xsl:if>
					  </policy-options> 
                              
                        <!-- PROTOCOL STANZA -->
                        <!--BGP Default Route selection from UI -->               
                        <!-- no protocol for static... -->
                        <xsl:if test="$routingProtocol != 'Static'">
                        <protocols>
                           <bgp>
                              <group>
                                 <xsl:if test="$routingProtocol = 'Default'">  <!-- TODO: Default - chacke later for Static -->
                                    <name>CUSTOMER-DEFAULT</name>
                                    <type>external</type>
                                    <description>eBGP customers with only a default route</description>
                                    <metric-out>
                                       <metric-value>
                                          <xsl:value-of select="$med"/><!-- 0 -->
                                       </metric-value>
                                    </metric-out>
                                    <local-preference>
                                       <xsl:value-of select="$localPref"/><!--120-->
                                    </local-preference>
                                    <hold-time>90</hold-time>
                                    <remove-private>
                                    </remove-private>
                                    
                                    <neighbor>
                                       <!--<name>10.1.1.1</name>-->
                                       <name>
                                         <xsl:value-of select="$neighbourAddress"/><!--{peer IP address}
                                          10.1.1.1/32-->
                                       </name>
                                       <description>
                                          <xsl:value-of select="$interfaceNeighDescription"/><!--{CSID}.{CIU Name}-->
                                       </description>
                                       
                                       <peer-as>
                                          <xsl:value-of select="$peerAS"/><!---{Peer AS #}-->
                                       </peer-as>
                                       <authentication-key>
                                          <xsl:value-of select="$csId"/><!--{auth key from UI}-->
                                       </authentication-key>
                                       
                                       <!-- Import & Export Policy used for IPv4 ONLY - uncomment it if created   -->
                                       <import>
                                          <xsl:value-of select="$customerV4ImportPolicy"/>
                                       </import>
                                       <xsl:if test="$routingProtocol != 'Static'">
                                       <import>
                                          <xsl:value-of select="$CUSTIN-V4V6"/>
                                       </import>
                                       </xsl:if>
                                       
                                       <export>
                                          <xsl:value-of select="$DEFAULT-ONLY"/>
                                       </export>
                                       
                                       <!-- Import & Export Policy used for IPv6 enable  -->
                                       <xsl:if test="$isIPv6Selected = 'true'">
                                        <export>
                                             <xsl:value-of select="$DEFAULTONLYV6"/>
                                          </export>
                                          <export>
                                                <xsl:value-of select="$DEFAULT-ONLY-V4-V6"/>
                                          </export>
                                       </xsl:if>
                                    </neighbor>
                                 </xsl:if>
                                 <xsl:if test="$routingProtocol = 'Full' or $routingProtocol = 'Default-Full'">
                                    <name>CUSTOMER-FULL</name>
                                    <type>external</type>
                                    <description>eBGP customers with full routes</description>
                                    
                                    <neighbor>
                                       <name>
                                          <xsl:value-of select="$neighbourAddress"/>
                                       </name>
                                       <description>
                                          <xsl:value-of select="$interfaceNeighDescription"/>
                                       </description>
                                       <peer-as>
                                          <xsl:value-of select="$peerAS"/>
                                       </peer-as>
                                       <authentication-key>
                                          <xsl:value-of select="$csId"/>
                                       </authentication-key>
                                       
                                       <!-- Import & Export Policy used for IPv4 ONLY  -->
                                       
                                       <import>
                                          <xsl:value-of select="$customerV4ImportPolicy"/>
                                       </import>
                                       <xsl:if test="$routingProtocol != 'Static'">
                                          <import>
                                             <xsl:value-of select="$CUSTIN-V4V6"/>
                                          </import>
                                       </xsl:if>
                                       <export>
                                            <xsl:value-of select="$CUST-FULL-OUT"/>
                                       </export>
                                       
                                       <!-- Import & Export Policy used for IPv6 enable  -->
                                       
                                       <xsl:if test="$isIPv6Selected = 'true'">
                                        <import>
                                               <xsl:value-of select="$CUSTIN-V4V6"/>
                                          </import>
                                          <xsl:if test="$routingProtocol = 'Default-Full'">
                                             <export>
                                                <xsl:value-of select="$DEFAULT-ONLY-V4-V6"/>
                                             </export>
                                          </xsl:if>
                                          <export>
                                               <xsl:value-of select="$CUSTFULLOUTV6"/>
                                          </export>
                                          <export>
                                                <xsl:value-of select="$CUST-FULL-OUT-V4-V6"/>
                                          </export>
                                       </xsl:if>
                                    </neighbor>
                                 </xsl:if>
                                 
                              </group>
                           </bgp>
                        </protocols>   
                        </xsl:if>
                        <!-- This section details the way to reference the above policies -->
                     </configuration>
                  </deviceConfiguration>
                  <!-- "ADD" CONFIGLET ASSEMBLY - END -->
               </xsl:for-each> 
            </serviceRequestConfig>
         </xsl:when>
         
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
                  <xsl:variable name="efService" select="efService"/>
                  <xsl:variable name="topology" select="topology"/>
                  <xsl:variable name="endPointType" select="endPointType"/>
                  <xsl:variable name="ciuName" select="ciuName"/>
                  <xsl:variable name="pathPreferences" select="pathPreferences"/>
                  <xsl:variable name="endPointServiceType" select="endPointServiceType"/>
                  <xsl:variable name="connectionType" select="connectionType"/>
                  <xsl:variable name="deviceName" select="deviceName"/>
                  <xsl:variable name="routingProtocol" select="routingProtocol"/>
                  
                  <xsl:variable name="addressPool" select="addressPool"/>
                  <xsl:variable name="isIPv6Selected" select="ipv6Peer"/>
                  <xsl:variable name="neighbourAddress" select="neighbourAddress"/>
                  
                  <xsl:variable name="bgpExport" select="bgpExport"/>
                  <xsl:variable name="bgpNoExport" select="bgpNoExport"/>
                  
                  <xsl:variable name="efRateUpperCase">
                     <xsl:value-of select="translate($efRate, $smallcase, $uppercase)" />
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
                  <xsl:variable name="interfaceUnitVlanRE">
                     <xsl:value-of select="$VLAN_ID"/>
                     <!-- TODO: pass from UI -->
                    <!-- <xsl:choose>
                        <xsl:when test="$endPointServiceType = 'CI'">
                           <xsl:value-of select="'0'"/>
                        </xsl:when>
                        <xsl:when test="$endPointServiceType = 'BI' and $pathPreferences='PRI'">
                           <xsl:value-of select="'1500'"/>
                        </xsl:when>
                        <xsl:when test="$endPointServiceType = 'BI' and $pathPreferences='SEC'">
                           <xsl:value-of select="'1501'"/>
                        </xsl:when>
                        <xsl:otherwise>
                           
                        </xsl:otherwise>
                     </xsl:choose>
                     -->
                  </xsl:variable>
                  
                  <!-- IMPORT POLICIES for any IPv4-ONLY Customers -->
                  <xsl:variable name="CUSTIN-V4">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'PRI'">
                           <xsl:value-of select="concat('CUSTIN-V4',  '_',  $ciuName, '_', 'PRI')" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'SEC'">
                           <xsl:value-of select="concat('CUSTIN-V4',  '_',  $ciuName, '_', 'SEC')" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('CUSTIN-V4',  '_',  $ciuName, '_', 'PRI')" />
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                  <xsl:variable name="DEFAULT-ONLY">
                     <xsl:value-of select="'DEFAULT-ONLY'" />
                  </xsl:variable>
                  
                  <xsl:variable name="CUST-FULL-OUT">
                     <xsl:value-of select="'CUST-FULL-OUT'" />
                  </xsl:variable>
                  
                  <!--IMPORT POLICIES for ANY IPv6-enabled Customers -->
                  <xsl:variable name="CUSTIN-V4V6">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'PRI'">
                           <xsl:value-of select="concat('CUSTIN-V4V6',  '_',  $ciuName, '_', 'PRI')" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'SEC'">
                           <xsl:value-of select="concat('CUSTIN-V4V6',  '_',  $ciuName, '_', 'SEC')" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('CUSTIN-V4V6',  '_',  $ciuName, '_', 'PRI')" />
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                  <xsl:variable name="DEFAULTONLYV6">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'PRI'">
                           <xsl:value-of select="concat('DEFAULTONLYV6',  '_',  $ciuName, '_', 'P')" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'SEC'">
                           <xsl:value-of select="concat('DEFAULTONLYV6',  '_',  $ciuName, '_', 'S')" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('DEFAULTONLYV6',  '_',  $ciuName, '_', 'P')" />
                        </xsl:otherwise>
                     </xsl:choose>
                     
                  </xsl:variable>
                  
                  <xsl:variable name="CUSTFULLOUTV6">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'PRI'">
                           <xsl:value-of select="concat('CUSTFULLOUTV6',  '_',  $ciuName, '_', 'P')" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'SEC'">
                           <xsl:value-of select="concat('CUSTFULLOUTV6',  '_',  $ciuName, '_', 'S')" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('CUSTFULLOUTV6',  '_',  $ciuName, '_', 'P')" />
                        </xsl:otherwise>
                     </xsl:choose>
                     
                  </xsl:variable>
                  
                  <xsl:variable name="DEFAULT-ONLY-V4-V6">
                     <xsl:value-of select="'DEFAULT-ONLY-V4-V6'" />
                  </xsl:variable>
                  
                  <xsl:variable name="CUST-FULL-OUT-V4-V6">
                     <xsl:value-of select="'CUST-FULL-OUT-V4-V6'" />
                  </xsl:variable>
                  
                 
                  <xsl:variable name="STATIC-V4-NE">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'PRI'">
                           <xsl:value-of select="concat('STATIC-V4-NE-LP350',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'SEC'">
                           <xsl:value-of select="concat('STATIC-V4-NE-LP340',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('STATIC-V4-NE-LP350',  '-',  $deviceName)" />
                        </xsl:otherwise>
                     </xsl:choose>
                     
                     
                  </xsl:variable>
                  
                  <xsl:variable name="STATIC-V6-E">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'PRI'">
                           <xsl:value-of select="concat('STATIC-V6-E-LP350',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'SEC'">
                           <xsl:value-of select="concat('STATIC-V6-E-LP340',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('STATIC-V6-E-LP350',  '-',  $deviceName)" />
                        </xsl:otherwise>
                     </xsl:choose>
                     
                     
                  </xsl:variable>
                  
                  <xsl:variable name="STATIC-V6-NE">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'PRI'">
                           <xsl:value-of select="concat('STATIC-V6-NE-LP350',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'SEC'">
                           <xsl:value-of select="concat('STATIC-V6-NE-LP340',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('STATIC-V6-NE-LP350',  '-',  $deviceName)" />
                        </xsl:otherwise>
                     </xsl:choose>
                     
                  </xsl:variable>
                  
                  <xsl:variable name="DIRECT-BGP-V4">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'PRI'">
                           <xsl:value-of select="concat('DIRECT-BGP-V4-LP350',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'SEC'">
                           <xsl:value-of select="concat('DIRECT-BGP-V4-LP340',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('DIRECT-BGP-V4-LP350',  '-',  $deviceName)" />
                        </xsl:otherwise>
                     </xsl:choose>
                     
                     
                  </xsl:variable>
                  
                  <xsl:variable name="PREFIX-IPV4">
                     <xsl:value-of select="concat('PREFIX-IPV4',  '_',  $ciuName)" />
                  </xsl:variable>
                  
                  <xsl:variable name="DIRECT-BGP-V6">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'PRI'">
                           <xsl:value-of select="concat('DIRECT-BGP-V6-LP350',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'SEC'">
                           <xsl:value-of select="concat('DIRECT-BGP-V6-LP340',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('DIRECT-BGP-V6-LP350',  '-',  $deviceName)" />
                        </xsl:otherwise>
                     </xsl:choose>
                     
                     
                  </xsl:variable>
                  
                  <xsl:variable name="PREFIX-IPV6">
                     <xsl:value-of select="concat('PREFIX-IPV6',  '_',  $ciuName)" />
                  </xsl:variable>
                  
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
                        </interfaces>
                        <xsl:if test="$routingProtocol != 'Static' ">
                       <policy-options>
                            
                           
                          <xsl:if test="$isIPv6Selected = 'false' and $routingProtocol != 'Static' "> 
                             <policy-statement operation="delete">
                                <name>
                                   <xsl:value-of select="$CUSTIN-V4V6" />
                                </name>
                             </policy-statement>
                          </xsl:if>
                          
                           <xsl:if test="$routingProtocol = 'Static' "> 
                              <!--
                              <xsl:if test="$isIPv6Selected = 'true' and $addressPool='Customer'">
                              <prefix-list operation="delete">
                                 <name>
                                    <xsl:value-of select="$STATIC-V6-E" />
                                 </name>
                              </prefix-list>
                           </xsl:if>
                           
                            <xsl:if test="$isIPv6Selected = 'true' and $addressPool='TELUS'">
                              <prefix-list operation="delete">
                                 <name>
                                    <xsl:value-of select="$STATIC-V6-NE" />
                                 </name>
                              </prefix-list>
                           </xsl:if>
                           -->
                           </xsl:if>
                         
                           <xsl:if test="$routingProtocol != 'Static'">
                              <xsl:if test="$bgpExport = 'true'">
                              <prefix-list operation="delete">
                                 <name>
                                    <xsl:value-of select="concat('PREFIX-IPV4', '_', 'E',  '_',  $ciuName)" /> 
                                 </name>
                              </prefix-list>
                           </xsl:if>
                           
                          
                          <xsl:if test="$bgpNoExport = 'true'">
                             <prefix-list operation="delete">
                                <name>
                                   <xsl:value-of select="concat('PREFIX-IPV4', '_', 'NE',  '_',  $ciuName)" /> 
                                </name>
                             </prefix-list>
                          </xsl:if>
                           </xsl:if>
                           <xsl:if test="$routingProtocol != 'Static' and $isIPv6Selected = 'true'">
                              <prefix-list operation="delete">
                                 <name>
                                    <xsl:value-of select="$DIRECT-BGP-V6" />
                                 </name>
                              </prefix-list>
                           </xsl:if> 
                          </policy-options>
                        </xsl:if>
                        <xsl:if test="$routingProtocol != 'Static'">
                           <protocols>
                              <bgp>
                                 <group>
                                    
                                    <xsl:if test="$routingProtocol = 'Default'"> 
                                       <name>CUSTOMER-DEFAULT</name>
                                       <neighbor operation="delete">
                                          <name>
                                             <xsl:value-of select="$neighbourAddress"/>
                                          </name>
                                       </neighbor>
                                    </xsl:if>
                                    <xsl:if test="$routingProtocol = 'Full' or $routingProtocol = 'Default-Full'">
                                       <name>CUSTOMER-FULL</name>
                                       <neighbor operation="delete">
                                          <name>
                                             <xsl:value-of select="$neighbourAddress"/>
                                          </name>
                                       </neighbor>
                                    </xsl:if>
                                 </group>
                              </bgp>
                           </protocols>   
                        </xsl:if>
                        
                        <!-- CLASS-OF-SERVICE STANZA -->
                        
                        <class-of-service>
                           <interfaces>
                              <xsl:if test="$qosType = 'QoS per Access'">
                                 <xsl:choose>
                                    <xsl:when test="$interfaceUnitCount > '1'">
                                       
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
                              <interface>
                                 <name>
                                    <xsl:value-of select="$port"/> 
                                 </name>
                                 <unit operation="delete">
                                    <name>
                                       <xsl:value-of select="$VLAN_ID"/>
                                    </name>		
                                 </unit>
                                 
                              </interface>
                           
                           </interfaces>
                          </class-of-service>
                        
                        <xsl:if test="$routingProtocol = 'Static' ">
                           <routing-options>
                              <static>
                                 <xsl:for-each select="staticRoutes/staticRoutes/e">
                                    <xsl:variable name="route" select="destinationPrefix" />
                                    <xsl:variable name="nextHop" select="nextHop" />
                                    <route>
                                       <name operation="delete">
                                          <xsl:value-of select="$route" />
                                       </name>
                                       <next-hop operation="delete">
                                          <xsl:value-of select="$nextHop" />
                                       </next-hop>
                                    </route>
                                 </xsl:for-each>
                              </static>
                           </routing-options>
                        </xsl:if>
                           
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
