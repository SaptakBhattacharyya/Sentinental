import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../services/supabase';
import { useAuth } from '../context/AuthContext';

export const DashboardScreen = () => {
  const { profile } = useAuth();
  const [stats, setStats] = useState({ total: 0, alerts: 0, missing: 0, online: 0 });
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<any[]>([]);
  const [equipmentStatus, setEquipmentStatus] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();

    // Setup realtime subscription
    const channel = supabase
      .channel('events-feed')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'events' }, (payload) => {
        setActivities((prev) => [payload.new, ...prev].slice(0, 10));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    // Mocking fetch for now or we can do actual Supabase queries
    const { count: totalCount } = await supabase.from('equipment').select('*', { count: 'exact', head: true });
    
    // Default mock data if empty DB
    setStats({
      total: totalCount || 1284,
      alerts: 3,
      missing: 1,
      online: 94,
    });

    setActivities([
      { id: 1, type: 'ALERT', title: 'BREACH: EQ-0119 North Perimeter', desc: 'Asset signal lost for 45s.', time: '14:02:45' },
      { id: 2, type: 'WARNING', title: 'GEOFENCE WARN: EQ-0042', desc: 'Approaching secondary containment.', time: '13:58:12' },
      { id: 3, type: 'SYSTEM', title: 'BLOCKCHAIN SYNC COMPLETE', desc: 'Ledger verified.', time: '13:45:00' }
    ]);
    
    setEquipmentStatus([
      { id: 'EQ-0001', status: 'Normal', loc: 'Base Alpha', assignee: 'Officer Singh', risk: 2, color: '#2F7A4D' },
      { id: 'EQ-0042', status: 'Suspicious', loc: 'Sector 7', assignee: 'Soldier Kumar', risk: 48, color: '#E07A2F' },
      { id: 'EQ-0119', status: 'Critical', loc: 'North Perimeter', assignee: 'Unassigned', risk: 92, color: '#B23A3A' },
    ]);

    setLoading(false);
  };

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#34562e" /></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SENTINELCHAIN</Text>
        <Text style={styles.headerSubtitle}>Command Deck - Unit 01</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Stats Row */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsContainer}>
          <StatCard title="TOTAL ASSETS" value={stats.total.toString()} color="#34562e" />
          <StatCard title="ACTIVE ALERTS" value={`0${stats.alerts}`} color="#7f3b00" />
          <StatCard title="MISSING UNITS" value={`0${stats.missing}`} color="#ba1a1a" />
          <StatCard title="NODES ONLINE" value={stats.online.toString()} color="#5a5f65" />
        </ScrollView>

        {/* Real-time Status Table */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>REAL-TIME ASSET STATUS</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.th, {flex: 1}]}>ASSET ID</Text>
            <Text style={[styles.th, {flex: 1.5}]}>STATUS</Text>
            <Text style={[styles.th, {flex: 1}]}>RISK</Text>
          </View>
          {equipmentStatus.map((item, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={[styles.td, {flex: 1, fontWeight: 'bold'}]}>{item.id}</Text>
              <View style={[{flex: 1.5, flexDirection: 'row', alignItems: 'center'}]}>
                <View style={[styles.dot, {backgroundColor: item.color}]} />
                <Text style={{fontSize: 12, color: item.color, fontWeight: 'bold'}}>{item.status}</Text>
              </View>
              <Text style={[styles.td, {flex: 1, textAlign: 'right', color: item.color, fontWeight: 'bold'}]}>{item.risk}</Text>
            </View>
          ))}
        </View>

        {/* Activity Feed */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>LIVE ACTIVITY FEED</Text>
          {activities.map((act, index) => (
            <View key={index} style={styles.feedItem}>
              <Text style={styles.feedTime}>{act.time} — {act.type}</Text>
              <Text style={styles.feedTitle}>{act.title}</Text>
              <Text style={styles.feedDesc}>{act.desc}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const StatCard = ({ title, value, color }: { title: string, value: string, color: string }) => (
  <View style={[styles.statCard, { borderLeftColor: color }]}>
    <Text style={styles.statTitle}>{title}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdf9ee' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { padding: 20, borderBottomWidth: 2, borderBottomColor: '#f2eee3', backgroundColor: '#ffffff' },
  headerTitle: { fontSize: 24, fontWeight: '900', color: '#34562e' },
  headerSubtitle: { fontSize: 12, color: '#5a5f65', letterSpacing: 1, textTransform: 'uppercase', marginTop: 4 },
  scrollContent: { padding: 16 },
  statsContainer: { flexDirection: 'row', marginBottom: 24 },
  statCard: { backgroundColor: '#ffffff', padding: 16, marginRight: 16, borderRadius: 8, borderLeftWidth: 4, minWidth: 140, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  statTitle: { fontSize: 10, fontWeight: 'bold', color: '#5a5f65', marginTop: 4, letterSpacing: 1 },
  statValue: { fontSize: 28, fontWeight: '900', color: '#1c1c15', marginTop: 8 },
  sectionCard: { backgroundColor: '#ffffff', padding: 16, borderRadius: 8, marginBottom: 24, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  sectionTitle: { fontSize: 14, fontWeight: '900', color: '#34562e', marginBottom: 16, letterSpacing: 1 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#f2eee3', padding: 12, borderRadius: 4 },
  th: { fontSize: 10, fontWeight: 'bold', color: '#5a5f65', letterSpacing: 1 },
  tableRow: { flexDirection: 'row', padding: 12, borderBottomWidth: 1, borderBottomColor: '#f2eee3', alignItems: 'center' },
  td: { fontSize: 12, color: '#1c1c15' },
  dot: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
  feedItem: { borderLeftWidth: 2, borderLeftColor: '#c2c8bc', paddingLeft: 16, paddingBottom: 24, marginLeft: 8 },
  feedTime: { fontSize: 10, fontWeight: 'bold', color: '#5a5f65', letterSpacing: 1, marginBottom: 4 },
  feedTitle: { fontSize: 14, fontWeight: 'bold', color: '#1c1c15', marginBottom: 4 },
  feedDesc: { fontSize: 12, color: '#5a5f65', lineHeight: 18 },
});
