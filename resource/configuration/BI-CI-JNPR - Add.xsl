<?xml version='1.0' ?>
<!-- 
***********************************************************
   JNPR RE Device Turnup XSLT TRANSFORMATION SCRIPT
   
      > Support: Bhanu Singh
      > Company: Juniper Networks
      > Contact: bhanus@juniper.net    
      > Version: 0.1           
      > Revision Date: 2014-12-04
      
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
        <pathPreferences>Primary</pathPreferences>
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
                  <xsl:variable name="addressPool" select="addressPool"/>
                  <xsl:variable name="egressRate" select="egressRate"/> <!--'100m'  egressRate -->
                  
                  <xsl:variable name="rate">
                     <xsl:value-of select="concat($egressRate, 'k')"/> 
                  </xsl:variable>
                  
                  
                  <xsl:variable name="ip4NetworkAddress" select="ip4NetworkAddress"/>
                  
                  <xsl:variable name="ip4NetworkAddressAndMask">
                     <xsl:value-of select="concat($ip4NetworkAddress, '/', $IP-V4-MASK)"/>
                  </xsl:variable>
                  
                  <xsl:variable name="interfaceUnitVlanRE">
                     <xsl:choose>
                        <xsl:when test="$endPointServiceType = 'CI'">
                           <xsl:value-of select="'0'"/>
                        </xsl:when>
                        <xsl:when test="$endPointServiceType = 'BI' and $pathPreferences='Primary'">
                           <xsl:value-of select="'1500'"/>
                        </xsl:when>
                        <xsl:when test="$endPointServiceType = 'BI' and $pathPreferences='Secondary'">
                           <xsl:value-of select="'1501'"/>
                        </xsl:when>
                        <xsl:otherwise>
                          
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
                
                  <xsl:variable name="interfaceName">
                     <xsl:value-of select="concat($port, '.', $VLAN_ID)" />
                  </xsl:variable>  
                  
                 <xsl:variable name="routingInstanceBGPDescription">
                     <xsl:value-of select="concat($csId, '.', $ciuName, '.', $vpnName, '.', $pathPreferences)" />
                  </xsl:variable>
                  
                  <xsl:variable name="vpnSpeed">
                     <xsl:value-of select="'V0M'" />
                  </xsl:variable>
                                  
                  <xsl:variable name="interfaceUnitDescription">
                     <xsl:value-of select="concat($csId,  '.', $ciuName, '.', $egressRate)" />
                  </xsl:variable>
                   <xsl:variable name="customerDefaultImportPolicy">
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
                  
                  <!-- IMPORT POLICIES for any IPv4-ONLY Customers -->
                  <xsl:variable name="importPolicyForIPv4">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'Primary'">
                           <xsl:value-of select="concat('CUSTIN-V4',  '_',  $ciuName, '_', 'PRI')" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'Secondary'">
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
                  <xsl:variable name="importPolicyForIPv6">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'Primary'">
                           <xsl:value-of select="concat('CUSTIN-V4V6',  '_',  $ciuName, '_', 'PRI')" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'Secondary'">
                           <xsl:value-of select="concat('CUSTIN-V4V6',  '_',  $ciuName, '_', 'SEC')" />
                        </xsl:when>
                       <xsl:otherwise>
                           <xsl:value-of select="concat('CUSTIN-V4V6',  '_',  $ciuName, '_', 'PRI')" />
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                  <xsl:variable name="defaultOnlyForIPV6">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'Primary'">
                           <xsl:value-of select="concat('DEFAULTONLYV6',  '_',  $ciuName, '_', 'P')" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'Secondary'">
                           <xsl:value-of select="concat('DEFAULTONLYV6',  '_',  $ciuName, '_', 'S')" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('DEFAULTONLYV6',  '_',  $ciuName, '_', 'P')" />
                        </xsl:otherwise>
                     </xsl:choose>
                     
                  </xsl:variable>
                  
                  <xsl:variable name="FullOnlyForIPV6">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'Primary'">
                           <xsl:value-of select="concat('CUSTFULLOUTV6',  '_',  $ciuName, '_', 'P')" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'Secondary'">
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
                  
                  <xsl:variable name="ipv4CustomerPrifixName">
                    <xsl:choose>
                        <xsl:when test="$pathPreferences = 'Primary'">
                           <xsl:value-of select="concat('STATIC-V4-E-LP350',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'Secondary'">
                           <xsl:value-of select="concat('STATIC-V4-E-LP340',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('STATIC-V4-E-LP350',  '-',  $deviceName)" />
                        </xsl:otherwise>
                     </xsl:choose>
                   </xsl:variable>
                  
                  <xsl:variable name="ipv4TelusPrifixName">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'Primary'">
                           <xsl:value-of select="concat('STATIC-V4-NE-LP350',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'Secondary'">
                           <xsl:value-of select="concat('STATIC-V4-NE-LP340',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('STATIC-V4-NE-LP350',  '-',  $deviceName)" />
                        </xsl:otherwise>
                     </xsl:choose>
                     
                     
                  </xsl:variable>
                  
                  <xsl:variable name="ipv6CustomerPrifixName">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'Primary'">
                           <xsl:value-of select="concat('STATIC-V6-E-LP350',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'Secondary'">
                           <xsl:value-of select="concat('STATIC-V6-E-LP340',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('STATIC-V6-E-LP350',  '-',  $deviceName)" />
                        </xsl:otherwise>
                     </xsl:choose>
                     
                     
                  </xsl:variable>
                  
                  <xsl:variable name="ipv6TelusPrifixName">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'Primary'">
                           <xsl:value-of select="concat('STATIC-V6-NE-LP350',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'Secondary'">
                           <xsl:value-of select="concat('STATIC-V6-NE-LP340',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('STATIC-V6-NE-LP350',  '-',  $deviceName)" />
                        </xsl:otherwise>
                     </xsl:choose>
                     
                  </xsl:variable>
                  
                  <xsl:variable name="ipv4DirectPrefixName">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'Primary'">
                           <xsl:value-of select="concat('DIRECT-BGP-V4-LP350',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'Secondary'">
                           <xsl:value-of select="concat('DIRECT-BGP-V4-LP340',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('DIRECT-BGP-V4-LP350',  '-',  $deviceName)" />
                        </xsl:otherwise>
                     </xsl:choose>
                     
                     
                  </xsl:variable>
                  
                  <xsl:variable name="ipV4PrefixName">
                     <xsl:value-of select="concat('PREFIX-IPV4',  '_',  $ciuName)" />
                  </xsl:variable>
                  
                  <xsl:variable name="ipv6DirectPrefixName">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'Primary'">
                           <xsl:value-of select="concat('DIRECT-BGP-V6-LP350',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'Secondary'">
                           <xsl:value-of select="concat('DIRECT-BGP-V6-LP340',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('DIRECT-BGP-V6-LP350',  '-',  $deviceName)" />
                        </xsl:otherwise>
                     </xsl:choose>
                     
                     
                  </xsl:variable>
                  
                  <xsl:variable name="ipV6PrefixName">
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
                                <!-- <description>
                                    <xsl:value-of select="$interfaceUnitDescription"/>
                                 </description>-->
                                 <flexible-vlan-tagging>
                                 </flexible-vlan-tagging>
                                 <unit>
                                    <name>
                                       <xsl:value-of select="$interfaceUnitVlanRE"/>
                                    </name>
                                   
                                    <xsl:if test="$endPointServiceType = 'BI'">
                                     <vlan-id>
                                        <xsl:value-of select="$interfaceUnitVlanRE"/>
                                      </vlan-id>
                                    </xsl:if>
                                    <family>
                                       <inet>
                                          <filter>
                                             <input>
                                                <filter-name>MARK_INTERNET_PRIORITY_LOW</filter-name>
                                             </input>
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
                           <xsl:if test="$accessOptionConnectionType = 'REDU'"><!-- CPE connect to RE through DE or DSLAM . what key to use validate..confirm with john/mark-->
     						       <interface>
                                <name>
                                   <xsl:value-of select="$port"/>
                                </name>
                                <!--<description>
                                   
                                   
                                   <xsl:value-of select="$interfaceUnitDescription"/>
                                   </description>-->
                                <flexible-vlan-tagging>
                                </flexible-vlan-tagging>
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
                                            <input>
                                               <filter-name>MARK_INTERNET_PRIORITY_LOW</filter-name>
                                            </input>
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
                           <xsl:if test="$multiVRF = 'true'">
                              <interface-set>
                                 <name><xsl:value-of select="$ciuName"/></name>
                                 <interface>
                                    <name><xsl:value-of select="$port"/></name>
                                    <xsl:if test="$firstUnitForVRF != ''">
                                       <unit>
                                          <name><xsl:value-of select="$firstUnitForVRF"/></name>
                                       </unit>
                                    </xsl:if>
                                    <unit>
                                       <name><xsl:value-of select="$VLAN_ID"/></name>
                                    </unit>
                                    
                                    <!-- Add/delete additional units here for the 3rd + services  -->
                                    
                                 </interface>
                              </interface-set>
                           </xsl:if>
                        </interfaces>
                       <class-of-service>
                          
                         <scheduler-maps>
                              <name>BICI-SCHED</name>
                              <forwarding-class>
                                 <name>FC_PROTOCOL_SIGNALING</name>
                                 <scheduler>RP</scheduler>
                              </forwarding-class>
                              <forwarding-class>
                                 <name>FC_BEST_EFFORT_DATA_GREEN</name>
                                 <scheduler>BE</scheduler>
                              </forwarding-class>
                           </scheduler-maps>
                           
                           <traffic-control-profiles>
                              <name>
                                 <xsl:value-of select="concat('BI',  '_',  $rate)" /> <!-- BI_<rate>-->
                              </name>
                              <scheduler-map>BICI-SCHED</scheduler-map>
                              <shaping-rate>
                                 <rate>
                                    <xsl:value-of select="$rate" /> <!--<100m>-->
                                 </rate>
                              </shaping-rate>
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
                                       <xsl:if test="$accessOptionConnectionType = 'REDI'">
                                          <xsl:value-of select="$interfaceUnitVlanRE"/>
                                       </xsl:if>
                                       <xsl:if test="$accessOptionConnectionType = 'REDU'">
                                          <xsl:value-of select="$VLAN_ID"/>
                                       </xsl:if>
                                    </name>
                                    <output-traffic-control-profile>
                                       <profile-name>
                                          <xsl:value-of select="concat('BI',  '_',  $rate)" /> <!-- BI_<rate>-->
                                       </profile-name>
                                    </output-traffic-control-profile>
                                 </unit>
                              </interface>
                              <xsl:if test="$multiVRF = 'true'">
                                 <interface-set>
                                    <name>
                                       <xsl:value-of select="$ciuName"/>
                                    </name>
                                    <output-traffic-control-profile>
                                       <profile-name>
                                          <xsl:value-of select="$traficControlProfile" /><!-- concat('BI',  '_',  $rate) --> 
                                       </profile-name> <!-- {L3VPN_Access_x} -->
                                    </output-traffic-control-profile>
                                 </interface-set>
                              </xsl:if>
                           </interfaces>					
                        </class-of-service>
                       
                    <!--ROUTING_OPTIONS started-->
						  <!-- For IPv4 ONLY.  Add the static routes for the CIU.  Repeat this for every subnet that is entered.  -->
							<xsl:if test="$routingProtocol = 'Static' ">
      						<routing-options>
      							<static>
      							   <xsl:for-each select="staticRoutes/e">
      							      <xsl:variable name="route" select="destinationPrefix" />
      							      <xsl:variable name="nextHop" select="nextHop" />
          								<route>
          								   <name>
          								      <!--<xsl:value-of select="concat($route,'/','32')" />-->
          								      <xsl:value-of select="$route" />
          								   </name>
          									<next-hop>
          									   <xsl:value-of select="$nextHop" />
          									</next-hop>
          								</route>
      							   </xsl:for-each>
      							</static>
      						</routing-options>
                        
                    <!-- For IPv6 enable - Add the static routes for the CIU.  Repeat this for every subnet that is entered.  -->
                        <xsl:if test="$isIPv6Selected = 'true'">
                           <routing-options>
                              <rib>
                                 <name>inet6.0</name>
                                 <static>
                                    <xsl:for-each select="staticRoutesForIPv6/e">
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
                              <xsl:if test="$addressPool = 'Customer'"><!-- TODO: check... -->	
      							     <prefix-list>
      									<name>
      									   <xsl:value-of select="$ipv4CustomerPrifixName" /><!--STATIC-V4-E-LP350-{RE-device-name}-->
      									</name>
      							        <!--
      							        <prefix-list-item>
      							           <xsl:value-of select="$ip4NetworkAddressAndMask" />
      							        </prefix-list-item>-->
      							       
      									   <xsl:for-each select="staticRoutes/e">
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
						
							<!-- For IPv4 ONLY.  Add each subnet to this prefix-list when Address Pool is TELUS Provided  -->
                           <xsl:if test="$addressPool = 'TELUS'"> <!-- TODO: check... -->	
     							     <prefix-list>
     									<name>
     									   <xsl:value-of select="$ipv4TelusPrifixName" /><!--STATIC-V4-NE-LP350-{RE-device-name}-->
     									</name>
     							        
     									
     									   <!--<xsl:value-of select="$ip4NetworkAddressAndMask" />-->
     									   <xsl:for-each select="staticRoutes/e">
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
                              
					   <!-- For IPv6 enable - Add each subnet to this prefix-list when Address Pool is Customer Provided .-->
					    
    						  <xsl:if test="$isIPv6Selected = 'true' and $addressPool='Customer'"><!-- TODO: check... -->			
    								<prefix-list>
    								  <name>
    									   <xsl:value-of select="$ipv6CustomerPrifixName" /><!--STATIC-V6-E-LP350-{RE-device-name}-->
    									</name>
    									
    									   <xsl:for-each select="staticRoutesForIPv6/e">
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
						<xsl:if test="$isIPv6Selected = 'true' and $addressPool='TELUS'">
                                 <prefix-list>
                                    <name>
                                       <xsl:value-of select="$ipv6TelusPrifixName"/>
                                       <!--STATIC-V6-NE-LP350-{RE-device-name}-->
                                    </name>

                                    <xsl:for-each select="staticRoutesForIPv6/e">
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
                           
                  <prefix-list>
                     <name>DEFAULT-IPV6</name>
                  </prefix-list>
						<!-- For IPv4 ONLY - Mandatory add of the customer interface to the pre-defined policy  -->
                  
                    <xsl:if test="$routingProtocol != 'Static' and $isIPv6Selected = 'false'"> <!-- for BGP only and IPv4 -->
      						<prefix-list>
      							<name>
      							   <xsl:value-of select="$ipv4DirectPrefixName" /><!--DIRECT-BGP-V4-LP350-{RE-device-name}-->
      							</name>
      						   <!--  DOBBUT here..why not multiple list item here..TODO: -->
      							
      								<!-- <xsl:value-of select="$ip4NetworkAddressAndMask" /> -->
      								   <xsl:for-each select="prefixList/e">
      								      <prefix-list-item>
      								      <xsl:variable name="route" select="prefixList" />
      								      
      								      <name> 
      								         <xsl:value-of select="$route" />
      								      </name>
      								      </prefix-list-item>
      								 </xsl:for-each>
      								 
      						</prefix-list>
                      </xsl:if>
                     <xsl:if test="$routingProtocol = 'Default' ">        
     					     <prefix-list>
                             <name>
                                 <xsl:value-of select="$ipV4PrefixName" /><!--PREFIX-IPV4_<CIU Name>-->
                             </name>
                             
                                   <!-- DOBUT here..wheere will get interface ipv6 subnet TODO:-->
                                  <!-- <xsl:value-of select="$ip4NetworkAddressAndMask" /> -->
                                   <!-- if selected ipv6 from UI then sending ipv4 and ipv6 prefixes in the list otherwise just ipv4 only. -->
                                   <xsl:choose>
                                      <xsl:when test="$isIPv6Selected = 'false'">
                                         <xsl:for-each select="prefixList/e">
                                            <prefix-list-item>
                                            <xsl:variable name="route" select="prefixList" />
                                            <name> 
                                               <xsl:value-of select="$route" />
                                            </name>
                                            </prefix-list-item>
                                         </xsl:for-each>
                                      </xsl:when>
                                      <xsl:otherwise>
                                         <xsl:for-each select="ipv6PrefixList/e">
                                            <prefix-list-item>
                                            <xsl:variable name="route" select="prefixList" />
                                            <name> 
                                               <xsl:value-of select="$route" />
                                            </name>
                                            </prefix-list-item>
                                         </xsl:for-each>
                                      </xsl:otherwise>
                                   </xsl:choose>
                                </prefix-list>
                    </xsl:if>
					  
					  <!-- For IPv6 enable - Mandatory add of the customer interface to the pre-defined policy  -->
                 <xsl:if test="$routingProtocol != 'Static' and $isIPv6Selected = 'true'"> <!-- for BGP only and IPv6 -->
						 	<prefix-list>
								<name>
								   <xsl:value-of select="$ipv6DirectPrefixName" /><!--DIRECT-BGP-V6-LP350-{RE-device-name}-->
								</name>
						 	  
								      <xsl:for-each select="ipv6PrefixList/e">
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
						            <xsl:value-of select="$ipV6PrefixName" /><!--PREFIX-IPV6_<CIU Name>-->
						         </name>
						         
						            <!--
						            <name>
						               <xsl:value-of select="$ciuLoopbackAndSubnetMask" />
						            </name> -->
						               <xsl:choose>
						                  <xsl:when test="$isIPv6Selected = 'false'">
						                     <xsl:for-each select="prefixList/e">
						                        <prefix-list-item>
						                        <xsl:variable name="route" select="prefixList" />
						                        <name> 
						                           <xsl:value-of select="$route" />
						                        </name>
						                        </prefix-list-item>
						                     </xsl:for-each>
						                  </xsl:when>
						                  <xsl:otherwise>
						                     <xsl:for-each select="ipv6PrefixList/e">
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
                      <xsl:if test="$routingProtocol = 'Default' ">
                        <policy-statement>
                          <name>
                             <xsl:value-of select="$DEFAULT-ONLY-V4-V6"/>
                          </name>
                          <term>
                             <name>10</name>
                             <from>
                                <prefix-list>DEFAULT</prefix-list>
                             </from>
                             <to>
                                <protocol>bgp</protocol>
                             </to>
                             <then>
                                <accept/>
                             </then>
                          </term>
                          <term>
                             <name>20</name>
                             <then>
                                <next>policy</next>
                              </then>
                          </term>
                       </policy-statement> 
                      </xsl:if>
                      <xsl:if test="$isIPv6Selected = 'true' and $routingProtocol = 'Default' ">
                         <!-- Customer specific policy to export IPV6 default route also check for primary and secondary--> 
                         <policy-statement>
                            <name>
                               <xsl:value-of select="$defaultOnlyForIPV6" /><!--DEFAULTONLYV6_<CIU NAME>_P-->
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
                      <!-- IPv4-Only , Full Routes , Export Policy Configuration -->
                      <xsl:if test="$routingProtocol = 'Full' ">
                        <policy-statement>
                           <name>
                              <xsl:value-of select="$CUST-FULL-OUT" />
                            </name>
                           <!-- deny bogus routes -->
                           <term>
                              <name>10</name>
                              <from>
                                 <prefix-list>DEFAULT</prefix-list>
                              </from>
                              <then>
                                 <reject/>
                              </then>
                           </term>
                           <!-- deny bogus routes -->
                           <term>
                              <name>20</name>
                              <from>
                                 <prefix-list>IANA-RESERVED</prefix-list>
                              </from>
                              <then>
                                 <reject/>
                              </then>
                           </term>
                           <!-- deny bogus routes -->
                           <term>
                              <name>30</name>
                              <from>
                                 <prefix-list>RFC1918</prefix-list>
                              </from>
                              <then>
                                 <reject/>
                              </then>
                           </term>
                           <!-- deny small routes -->
                           <term>
                              <name>40</name>
                              <from>
                                 <route-filter>
                                    <address>0.0.0.0/0</address> <!--TODO: check if it is a default address 0.0.0.0/0-->
                                    <prefix-length-range>/25-/32</prefix-length-range>
                                 </route-filter>
                              </from>
                              <then>
                                 <reject/>
                              </then>
                           </term>
                           <!-- advertise TELUS customer routes with external community tag -->
                           <term>
                              <name>50</name>
                              <from>
                                 <community>CUST</community>
                              </from>
                              <then>
                                 <origin>igp</origin>
                                 <community>
                                    <set/>
                                    <community-name>200</community-name>
                                 </community>
                                 <accept/>
                              </then>
                              
                           </term>
                           <!-- advertise TELUS peering routes with external community tag -->
                           <term>
                              <name>60</name>
                              <from>
                                 <community>CUST</community>
                              </from>
                              <then>
                                 <origin>igp</origin>
                                 <community>
                                    <set/>
                                    <community-name>180</community-name>
                                 </community>
                                 <accept/>
                              </then>
                           </term>
                           <!-- advertise TELUS peering routes with external community tag -->
                           <term>
                              <name>70</name>
                              <then>
                                 <origin>igp</origin>
                                 <community>
                                    <set/>
                                    <community-name>170</community-name>
                                 </community>
                                 <accept/>
                              </then>
                           </term>
                        </policy-statement>
                      </xsl:if>
                       <xsl:if test="$isIPv6Selected = 'true' and $routingProtocol = 'Full' ">
                         <!-- IPV6 specific policy that contains customer site specific parameters-->
                           <policy-statement>
                              <name>
                                 <xsl:value-of select="$FullOnlyForIPV6" /> <!--CUSTFULLOUTV6_<CIU NAME>_P-->
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
                        
                         
                         <!--Customer specific policy to export IPV6 default route-->
                        
                      <!-- ipv4 only Default only import policy configuration -->
                      <!--  PRI and SEC suffixes are to allow different BI/CI community 
                  		assignment based on Primary and Secondary RE device names
                  		 -->
                        <xsl:if test="$routingProtocol = 'Default'">
                        <policy-statement>
                           <name>
                              <xsl:value-of select="$importPolicyForIPv4" /> <!--CUSTIN-V4_<CIU Name>_PRI>-->
                           </name>
                           <!-- use term 10 if customer prefix is provided by TELUS,
                          			as all peers have default route or full routes, so it
                          			 would not block any local peer to peer traffic - TODO: confirm it as address pool is a 
                          			 part of BGP
                          			 -->
                           <term>
                              <name>10</name>
                              <from>
                                 <prefix-list>
                                    <xsl:value-of select="$ipV4PrefixName" /><!--PREFIX-IPV4_<CIU Name>-->
                                 </prefix-list>
                              </from>
                              <then>
                                 
                                 <community>
                                    <add/>
                                      <community-name>NO-EXPORT</community-name>
                                    
                                 </community>
                              
                              </then>
                           </term>
                           <term>
                              <name>20</name>
                              <from>
                                 <prefix-list>
                                    <xsl:value-of select="$ipV4PrefixName" /><!--PREFIX-IPV4_<CIU Name>-->
                                 </prefix-list>
                              </from>
                              <then>
                                 <community>
                                    <add/> <!--TODO confirm with mark-->
                                    <xsl:if test="$addressPool = 'TELUS'">
                                          <community-name>
                                             <xsl:value-of select="concat('BICI-NO-EXPORT', '-', $deviceName)" /> <!-- EDTN-LAB-CG01-RE1 -->
                                          </community-name>
                                       </xsl:if>
                                    <xsl:if test="$addressPool = 'Customer'">
                                          <community-name>
                                             <xsl:value-of select="concat('BICI-EXPORT', '-', $deviceName)" /> <!-- EDTN-LAB-CG01-RE1 -->
                                          </community-name>
                                       </xsl:if>
                                   
                                 </community>
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
                      <!-- IPv4 Only , Default Only , Export Policy Configuration-->
                      
                      <policy-statement>
                         <name>
                            <xsl:value-of select="'DEFAULT-ONLY'" /> 
                         </name>
                         <term>
                            <name>10</name>
                            <from>
                               <prefix-list>
                                  <xsl:value-of select="'DEFAULT'" />
                               </prefix-list>
                            </from>
                            <to>
                               <protocol>bgp</protocol>
                            </to>
                            <then>
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
                        <!--IPv4 and IPv6 Enable ,Default Only, Import Policy Configuration -->
                         <!-- PRI and SEC suffixes are to allow different BI/CI community 
                      		assignment based on Primary and Secondary RE device names
                      		-->
                        <xsl:if test="$isIPv6Selected = 'true' and $routingProtocol = 'Default'"> 
                         <policy-statement>
                            <name>
                               <xsl:value-of select="$importPolicyForIPv6" /> <!--CUSTIN-V4V6_<CIU Name>_PRI>-->
                            </name>
                            <!-- use term 10 if customer prefix is provided by TELUS,
                        			 as all peers have default route or full routes, so it
                        			would not block any local peer to peer traffic
                        		-->
                            <term>
                               <name>10</name>
                               <from>
                                  <prefix-list>
                                     <xsl:value-of select="$ipV4PrefixName" /><!--PREFIX-IPV4_<CIU Name>-->
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
                               <name>20</name>
                               <from>
                                  <prefix-list>
                                     <xsl:value-of select="$ipV6PrefixName" /><!--PREFIX-IPV6_<CIU Name>-->
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
                            <!--  Allow only Customer IPV4 prefixes -->
                            <term>
                               <name>30</name>
                               <from>
                                  <prefix-list>
                                     <xsl:value-of select="$ipV4PrefixName" /><!--PREFIX-IPV4_<CIU Name>-->
                                  </prefix-list>
                               </from>
                               <then>
                                  <community>
                                     <add/>
                                     <xsl:if test="$addressPool = 'TELUS'">
                                           <community-name>
                                           <xsl:value-of select="concat('BICI-NO-EXPORT', '-', $deviceName)" />
                                           </community-name>
                                        </xsl:if>
                                     <xsl:if test="$addressPool = 'Customer'">
                                           <community-name>
                                           <xsl:value-of select="concat('BICI-EXPORT', '-', $deviceName)" />
                                           </community-name>
                                        </xsl:if>
                                        <!--< BICI-NO-EXPORT-<RE Device Name> | BICI-EXPORT-<RE Device Name> >    TODO - discuss with mark -->
                                  </community>
                                  <accept/>
                               </then>
                            </term>
                            <!-- tag Customer IPV6 prefixes with 852:40000 -->
                            <xsl:if test="$isIPv6Selected = 'true'">
                            <term>
                               <name>40</name>
                               <from>
                                  <prefix-list>
                                     <xsl:value-of select="$ipV6PrefixName" /><!--PREFIX-IPV6_<CIU Name>-->
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
                            </xsl:if>
                            <!--  Allow only Customer IPV6 prefixes -->
                            <xsl:if test="$isIPv6Selected = 'true'">
                             <term>
                                 <name>50</name>
                                 <from>
                                    <prefix-list>
                                       <xsl:value-of select="$ipV6PrefixName" /><!--PREFIX-IPV6_<CIU Name>-->
                                    </prefix-list>
                                 </from>
                                 <then>
                                    <community>
                                       <add/>
                                          <!--<xsl:if test="$endPointServiceType = 'BI'">-->
                                         <xsl:if test="$addressPool = 'TELUS'">
                                             <community-name>
                                             <xsl:value-of select="concat('BICI-NO-EXPORT', '-', $deviceName)" />
                                             </community-name>
                                          </xsl:if>
                                       <xsl:if test="$addressPool = 'Customer'">
                                             <community-name>
                                             <xsl:value-of select="concat('BICI-EXPORT', '-', $deviceName)" />
                                             </community-name>
                                          </xsl:if>
                                          <!--< BICI-NO-EXPORT-<RE Device Name> | BICI-EXPORT-<RE Device Name> >-->
                                       
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
                               <name>1000</name>
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
                        <xsl:if test="$routingProtocol  = 'Default'">  
                        <protocols>
                           <bgp>
                              <group>
                                 <xsl:if test="$routingProtocol = 'Default'">  <!-- TODO: Default - chacke later for Static -->
                                    <name>CUSTOMER_DEFAULT</name>
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
                                          <xsl:value-of select="$interfaceUnitDescription"/><!--{CSID}.{CIU Name}-->
                                       </description>
                                       
                                       <peer-as>
                                          <xsl:value-of select="$peerAS"/><!---{Peer AS #}-->
                                       </peer-as>
                                       <authentication-key>
                                          <xsl:value-of select="$csId"/><!--{auth key from UI}-->
                                       </authentication-key>
                                       
                                       <!-- Import & Export Policy used for IPv4 ONLY - uncomment it if created   -->
                                       <!--import>
                                          <xsl:value-of select="$customerDefaultImportPolicy"/>
                                       </import-->
                                       <import>
                                          <xsl:value-of select="$importPolicyForIPv4"/>
                                       </import>
                                       <export>
                                          <xsl:value-of select="$DEFAULT-ONLY"/>
                                       </export>
                                       
                                       <!-- Import & Export Policy used for IPv6 enable  -->
                                       <xsl:if test="$isIPv6Selected = 'true'">
                                         <!-- <import>
                                             <xsl:value-of select="$customerDefaultImportPolicy"/>
                                          </import>-->
                                          <import>
                                                <xsl:value-of select="$importPolicyForIPv6"/>
                                          </import>
                                          <export>
                                             <xsl:value-of select="$defaultOnlyForIPV6"/>
                                          </export>
                                          <export>
                                                <xsl:value-of select="$DEFAULT-ONLY-V4-V6"/>
                                          </export>
                                       </xsl:if>
                                    </neighbor>
                                 </xsl:if>
                                 <xsl:if test="$routingProtocol = 'Full'">
                                    <name>CUSTOMER_FULL</name>
                                    <type>external</type>
                                    <description>eBGP customers with full routes</description>
                                    
                                    <neighbor>
                                       <name>
                                          <xsl:value-of select="$neighbourAddress"/><!--{peer IP address}-->
                                       </name>
                                       <description>
                                          <xsl:value-of select="$interfaceUnitDescription"/><!--{CSID}.{CIU Name}-->
                                       </description>
                                       <peer-as>
                                          <xsl:value-of select="$peerAS"/><!--{Peer AS #}-->
                                       </peer-as>
                                       <authentication-key>
                                          <xsl:value-of select="$csId"/><!--{auth key from UI}-->
                                       </authentication-key>
                                       
                                       <!-- Import & Export Policy used for IPv4 ONLY  -->
                                       
                                       <import>
                                          <xsl:value-of select="$customerDefaultImportPolicy"/>
                                       </import>
                                       <import>
                                          <xsl:value-of select="$importPolicyForIPv4"/>
                                       </import>
                                       <export>
                                            <xsl:value-of select="$CUST-FULL-OUT"/>
                                       </export>
                                       
                                       <!-- Import & Export Policy used for IPv6 enable  -->
                                       
                                       <xsl:if test="$isIPv6Selected = 'true'">
                                         <!--
                                          <import>
                                             <xsl:value-of select="$customerDefaultImportPolicy"/>
                                          </import>
                                          -->
                                          <import>
                                               <xsl:value-of select="$importPolicyForIPv6"/>
                                          </import>
                                          <export>
                                               <xsl:value-of select="$FullOnlyForIPV6"/>
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
                     <xsl:choose>
                        <xsl:when test="$endPointServiceType = 'CI'">
                           <xsl:value-of select="'0'"/>
                        </xsl:when>
                        <xsl:when test="$endPointServiceType = 'BI' and $pathPreferences='Primary'">
                           <xsl:value-of select="'1500'"/>
                        </xsl:when>
                        <xsl:when test="$endPointServiceType = 'BI' and $pathPreferences='Secondary'">
                           <xsl:value-of select="'1501'"/>
                        </xsl:when>
                        <xsl:otherwise>
                           
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                  <!-- IMPORT POLICIES for any IPv4-ONLY Customers -->
                  <xsl:variable name="importPolicyForIPv4">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'Primary'">
                           <xsl:value-of select="concat('CUSTIN-V4',  '_',  $ciuName, '_', 'PRI')" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'Secondary'">
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
                  <xsl:variable name="importPolicyForIPv6">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'Primary'">
                           <xsl:value-of select="concat('CUSTIN-V4V6',  '_',  $ciuName, '_', 'PRI')" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'Secondary'">
                           <xsl:value-of select="concat('CUSTIN-V4V6',  '_',  $ciuName, '_', 'SEC')" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('CUSTIN-V4V6',  '_',  $ciuName, '_', 'PRI')" />
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                  <xsl:variable name="defaultOnlyForIPV6">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'Primary'">
                           <xsl:value-of select="concat('DEFAULTONLYV6',  '_',  $ciuName, '_', 'P')" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'Secondary'">
                           <xsl:value-of select="concat('DEFAULTONLYV6',  '_',  $ciuName, '_', 'S')" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('DEFAULTONLYV6',  '_',  $ciuName, '_', 'P')" />
                        </xsl:otherwise>
                     </xsl:choose>
                     
                  </xsl:variable>
                  
                  <xsl:variable name="FullOnlyForIPV6">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'Primary'">
                           <xsl:value-of select="concat('CUSTFULLOUTV6',  '_',  $ciuName, '_', 'P')" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'Secondary'">
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
                  
                  <xsl:variable name="ipv4CustomerPrifixName">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'Primary'">
                           <xsl:value-of select="concat('STATIC-V4-E-LP350',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'Secondary'">
                           <xsl:value-of select="concat('STATIC-V4-E-LP340',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('STATIC-V4-E-LP350',  '-',  $deviceName)" />
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  
                  <xsl:variable name="ipv4TelusPrifixName">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'Primary'">
                           <xsl:value-of select="concat('STATIC-V4-NE-LP350',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'Secondary'">
                           <xsl:value-of select="concat('STATIC-V4-NE-LP340',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('STATIC-V4-NE-LP350',  '-',  $deviceName)" />
                        </xsl:otherwise>
                     </xsl:choose>
                     
                     
                  </xsl:variable>
                  
                  <xsl:variable name="ipv6CustomerPrifixName">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'Primary'">
                           <xsl:value-of select="concat('STATIC-V6-E-LP350',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'Secondary'">
                           <xsl:value-of select="concat('STATIC-V6-E-LP340',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('STATIC-V6-E-LP350',  '-',  $deviceName)" />
                        </xsl:otherwise>
                     </xsl:choose>
                     
                     
                  </xsl:variable>
                  
                  <xsl:variable name="ipv6TelusPrifixName">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'Primary'">
                           <xsl:value-of select="concat('STATIC-V6-NE-LP350',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'Secondary'">
                           <xsl:value-of select="concat('STATIC-V6-NE-LP340',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('STATIC-V6-NE-LP350',  '-',  $deviceName)" />
                        </xsl:otherwise>
                     </xsl:choose>
                     
                  </xsl:variable>
                  
                  <xsl:variable name="ipv4DirectPrefixName">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'Primary'">
                           <xsl:value-of select="concat('DIRECT-BGP-V4-LP350',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'Secondary'">
                           <xsl:value-of select="concat('DIRECT-BGP-V4-LP340',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('DIRECT-BGP-V4-LP350',  '-',  $deviceName)" />
                        </xsl:otherwise>
                     </xsl:choose>
                     
                     
                  </xsl:variable>
                  
                  <xsl:variable name="ipV4PrefixName">
                     <xsl:value-of select="concat('PREFIX-IPV4',  '_',  $ciuName)" />
                  </xsl:variable>
                  
                  <xsl:variable name="ipv6DirectPrefixName">
                     <xsl:choose>
                        <xsl:when test="$pathPreferences = 'Primary'">
                           <xsl:value-of select="concat('DIRECT-BGP-V6-LP350',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:when test="$pathPreferences = 'Secondary'">
                           <xsl:value-of select="concat('DIRECT-BGP-V6-LP340',  '-',  $deviceName)" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:value-of select="concat('DIRECT-BGP-V6-LP350',  '-',  $deviceName)" />
                        </xsl:otherwise>
                     </xsl:choose>
                     
                     
                  </xsl:variable>
                  
                  <xsl:variable name="ipV6PrefixName">
                     <xsl:value-of select="concat('PREFIX-IPV6',  '_',  $ciuName)" />
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
                                   
                              <!-- UNIT SUB-STANZA -->
                              <unit operation="delete">
                                 <name>
                                    <xsl:choose>
                                    <xsl:when test="$accessOptionConnectionType = 'REDI' and $endPointServiceType = 'BI'">
                                       <xsl:value-of select="$interfaceUnitVlanRE"/>
                                    </xsl:when>
                                       <xsl:otherwise>
                                          <xsl:value-of select="$VLAN_ID"/>
                                       </xsl:otherwise>
                                    </xsl:choose>
                                 </name>		
                              </unit>
                           </interface>
                        </interfaces>
                        <routing-instances>
                           <instance operation="delete">
                              <name>
                                 <xsl:value-of select="$SERVICE_ID"/> <!-- service id is a routing instance name -->
                              </name>
                           </instance>
                        </routing-instances>
                       
                        <policy-options>
                           <!-- <xsl:if test="$isIPv6Selected = 'true' and $routingProtocol = 'Default' ">
                              <policy-statement operation="delete">
                                 <name>
                                    <xsl:value-of select="$defaultOnlyForIPV6" />
                                 </name>
                              </policy-statement>
                           </xsl:if>
                           <xsl:if test="$isIPv6Selected = 'true' and $routingProtocol = 'Full' ">
                              <policy-statement operation="delete">
                                 <name>
                                    <xsl:value-of select="$FullOnlyForIPV6"/>
                                 </name>
                              </policy-statement>
                           </xsl:if>
                           
                           <xsl:if test="$routingProtocol = 'Default' or $routingProtocol = 'Full'">
                              <policy-statement operation="delete">
                                 <name>
                                    <xsl:value-of select="$importPolicyForIPv4"/>
                                 </name>
                              </policy-statement>
                           </xsl:if>
                           
                          
                           <xsl:if test="$isIPv6Selected = 'true' and $routingProtocol != 'Static' "> 
                              <policy-statement operation="delete">
                               <name>
                                  <xsl:value-of select="$importPolicyForIPv6" />
                               </name>
                              </policy-statement>
                           </xsl:if>
                           
                           <xsl:if test="$addressPool = 'Customer'">
                              <prefix-list operation="delete">
                                 <name>
                                    <xsl:value-of select="$ipv4CustomerPrifixName" />
                                 </name>
                              </prefix-list>
                           </xsl:if>
                          
                           <xsl:if test="$addressPool = 'TELUS'"> 
                              <prefix-list operation="delete">
                                 <name>
                                    <xsl:value-of select="$ipv4TelusPrifixName" />
                                 </name>
                              </prefix-list>
                           </xsl:if>
                           -->
                           <!--
                           <xsl:if test="$routingProtocol = 'Static' "> 
                           
                              <xsl:if test="$isIPv6Selected = 'true' and $addressPool='Customer'">
                              <prefix-list operation="delete">
                                 <name>
                                    <xsl:value-of select="$ipv6CustomerPrifixName" />
                                 </name>
                              </prefix-list>
                           </xsl:if>
                           
                          
                              <xsl:if test="$isIPv6Selected = 'true' and $addressPool='TELUS'">
                              <prefix-list operation="delete">
                                 <name>
                                    <xsl:value-of select="$ipv6TelusPrifixName" />
                                 </name>
                              </prefix-list>
                           </xsl:if>
                           </xsl:if>
                           -->
                          
                          <!--
                           <prefix-list operation="delete">
                              <name>
                                 <xsl:value-of select="$ipv4DirectPrefixName" />
                              </name>
                           </prefix-list>
                                                     
                           <prefix-list operation="delete">
                              <name>
                                 <xsl:value-of select="$ipV4PrefixName" />
                              </name>
                           </prefix-list>-->
                           <!--
                           <xsl:if test="$isIPv6Selected = 'true'">
                              <prefix-list operation="delete">
                                 <name>
                                    <xsl:value-of select="$ipv6DirectPrefixName" />
                                 </name>
                              </prefix-list>
                           </xsl:if> 
                           -->
                         </policy-options>
                        
                        <!-- CLASS-OF-SERVICE STANZA -->
                        
                        <class-of-service>
                           <interfaces>
                              <interface>
                                 <name>
                                    <xsl:value-of select="$port"/> 
                                 </name>
                                 
                                 <unit operation="delete">
                                    <name>
                                       <xsl:choose>
                                          <xsl:when test="$accessOptionConnectionType = 'REDI'">
                                             <xsl:value-of select="$interfaceUnitVlanRE"/>
                                          </xsl:when>
                                          <xsl:otherwise>
                                             <xsl:value-of select="$VLAN_ID"/>
                                          </xsl:otherwise>
                                       </xsl:choose>
                                    </name>		
                                 </unit>
                                 
                              </interface>
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
