import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../services/supabase';

export const InventoryScreen = () => {
  const [isCheckedOut, setIsCheckedOut] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleToggleState = async () => {
    setLoading(true);
    const newStatus = isCheckedOut ? 'AVAILABLE' : 'CHECKED-OUT';
    
    try {
      // 1. Update Equipment table mock
      await supabase.from('equipment').update({ status: newStatus }).eq('id', '1');
      
      // 2. Insert event to audit ledger
      await supabase.from('events').insert({
        equipment_id: '1',
        event_type: isCheckedOut ? 'RETURN' : 'CHECK_OUT',
        description: `Asset ${isCheckedOut ? 'Returned' : 'Transferred'} by operator.`,
        recorded_by: 'user-id-placeholder'
      });

      setIsCheckedOut(!isCheckedOut);
      Alert.alert('Success', `Asset is now ${newStatus}`);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* TopNav Mock */}
      <View style={styles.headerTop}>
        <Text style={styles.headerTitle}>SENTINELCHAIN</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Breadcrumb & Header Sections */}
        <View style={styles.topSection}>
          <Text style={styles.breadcrumb}>Inventory {'>'} Communications {'>'} Asset Sovereignty</Text>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.assetName}>RADIO SET R-04</Text>
              <View style={styles.assetSubRow}>
                <Text style={styles.serial}>SN: R04-9928-TX-ALPHA</Text>
                <View style={[styles.statusBadge, !isCheckedOut && { backgroundColor: '#34562e' }]}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>{isCheckedOut ? 'CHECKED-OUT' : 'AVAILABLE'}</Text>
                </View>
              </View>
            </View>
            <View style={styles.healthStats}>
              <Text style={styles.healthLabel}>Health Index</Text>
              <Text style={styles.healthValue}>89.4%</Text>
            </View>
          </View>
        </View>

        {/* Diagnostics & Map Row */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Diagnostics</Text>
          <Text style={styles.cardTitle}>System Integrity Radar</Text>
          
          <View style={styles.radarLayout}>
            {/* Mock Radar Circle */}
            <View style={styles.radarCircle}>
               <Text style={styles.iconMock}>📡</Text>
            </View>
            <View style={styles.metricsCol}>
              <MetricRow label="Battery Level" value="88%" />
              <MetricRow label="Signal Strength" value="92%" />
              <MetricRow label="Mechanical Wear" value="72/100" />
            </View>
          </View>
        </View>

        {/* Custody Chain */}
        <View style={styles.card}>
           <Text style={styles.sectionLabel}>Custody Chain</Text>
           <View style={{flexDirection: 'row', gap: 24, marginTop: 12}}>
             <View>
                <Text style={styles.metricLabel}>{isCheckedOut ? 'Current Custodian' : 'Last Custodian'}</Text>
                <Text style={styles.custodianName}>LT. MEHTA</Text>
             </View>
             <View>
                <Text style={styles.metricLabel}>Location</Text>
                <Text style={styles.custodianLoc}>ZONE ALPHA</Text>
             </View>
           </View>
        </View>

        {/* Lifecycle Timeline */}
        <View style={styles.card}>
           <Text style={styles.sectionLabel}>Lifecycle Timeline</Text>
           <View style={{marginTop: 16}}>
             <TimelineItem date="2023.10.12" title="SERVICED" desc="System frequency recalibration applied." />
             <TimelineItem date="2023.08.05" title="TRANSFERRED" desc="Released from Forward Base Bravo." />
             <TimelineItem date="2022.11.15" title="ASSET PROCURED" desc="Inventory logging initialized." />
           </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={[styles.btn, styles.btnOutline]}><Text style={styles.btnOutlineText}>FLAG ISSUE</Text></TouchableOpacity>
        <TouchableOpacity 
           style={[styles.btn, {backgroundColor: isCheckedOut ? '#34562e' : '#7f3b00', marginLeft: 'auto'}]}
           onPress={handleToggleState}
           disabled={loading}
        >
           <Text style={styles.btnText}>{loading ? 'PROCESSING...' : (isCheckedOut ? 'CHECK-IN' : 'CHECK-OUT')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const MetricRow = ({label, value}: {label: string, value: string}) => (
  <View style={styles.metricRow}>
    <Text style={styles.metricLabel}>{label}</Text>
    <Text style={styles.metricValue}>{value}</Text>
  </View>
);

const TimelineItem = ({date, title, desc}: {date: string, title: string, desc: string}) => (
  <View style={styles.timelineItem}>
    <View style={styles.timelineDot} />
    <View style={styles.timelineContent}>
      <View style={styles.rowBetween}>
        <Text style={styles.timelineTitle}>{title}</Text>
        <Text style={styles.timelineDate}>{date}</Text>
      </View>
      <Text style={styles.timelineDesc}>{desc}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdf9ee' },
  headerTop: { padding: 20, borderBottomWidth: 2, borderBottomColor: '#f2eee3', backgroundColor: '#ffffff' },
  headerTitle: { fontSize: 20, fontWeight: '900', color: '#34562e' },
  scrollContent: { padding: 16, paddingBottom: 100 },
  topSection: { marginBottom: 24, padding: 8 },
  breadcrumb: { fontSize: 10, fontWeight: 'bold', color: '#5a5f65', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  assetName: { fontSize: 32, fontWeight: '900', color: '#34562e' },
  assetSubRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  serial: { fontSize: 14, fontWeight: 'bold', color: '#5a5f65', marginRight: 16 },
  statusBadge: { backgroundColor: '#7f3b00', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, flexDirection: 'row', alignItems: 'center' },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#fff', opacity: 0.5, marginRight: 6 },
  statusText: { fontSize: 10, color: '#fff', fontWeight: 'bold', letterSpacing: 1 },
  healthStats: { alignItems: 'flex-end' },
  healthLabel: { fontSize: 10, fontWeight: 'bold', color: '#5a5f65', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 },
  healthValue: { fontSize: 24, fontWeight: '900', color: '#34562e' },
  card: { backgroundColor: '#ffffff', padding: 20, borderRadius: 8, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: {width: 0, height: 2}, elevation: 2 },
  sectionLabel: { fontSize: 10, fontWeight: 'bold', color: '#5a5f65', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#34562e', textTransform: 'uppercase', marginBottom: 16 },
  radarLayout: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  radarCircle: { width: 120, height: 120, borderRadius: 60, borderWidth: 4, borderColor: '#f2eee3', alignItems: 'center', justifyContent: 'center' },
  iconMock: { fontSize: 40 },
  metricsCol: { flex: 1, justifyContent: 'center' },
  metricRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', borderBottomWidth: 1, borderBottomColor: '#f2eee3', paddingBottom: 8, marginBottom: 12 },
  metricLabel: { fontSize: 10, fontWeight: 'bold', color: '#5a5f65', letterSpacing: 1, textTransform: 'uppercase' },
  metricValue: { fontSize: 16, fontWeight: 'bold', color: '#34562e' },
  custodianName: { fontSize: 16, fontWeight: '900', color: '#34562e', marginTop: 4 },
  custodianLoc: { fontSize: 14, fontWeight: 'bold', color: '#34562e', marginTop: 4 },
  timelineItem: { flexDirection: 'row', marginBottom: 20 },
  timelineDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#34562e', marginTop: 4, marginRight: 16 },
  timelineContent: { flex: 1, borderBottomWidth: 1, borderBottomColor: '#f2eee3', paddingBottom: 16 },
  timelineTitle: { fontSize: 12, fontWeight: 'bold', color: '#34562e', textTransform: 'uppercase' },
  timelineDate: { fontSize: 10, fontWeight: 'bold', color: '#5a5f65' },
  timelineDesc: { fontSize: 12, color: '#42483f', marginTop: 4, lineHeight: 18 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 70, backgroundColor: '#e6e2d7', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, borderTopWidth: 2, borderTopColor: '#dcd8cc' },
  btn: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
  btnText: { color: '#fff', fontSize: 12, fontWeight: 'bold', letterSpacing: 1, textTransform: 'uppercase' },
  btnOutline: { borderWidth: 2, borderColor: '#5a5f65', marginRight: 12 },
  btnOutlineText: { color: '#5a5f65', fontSize: 12, fontWeight: 'bold', letterSpacing: 1, textTransform: 'uppercase' },
});
