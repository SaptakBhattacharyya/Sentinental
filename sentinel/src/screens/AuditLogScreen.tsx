import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const AuditLogScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* TopNav Mock */}
      <View style={styles.headerTop}>
        <Text style={styles.headerTitle}>SENTINELCHAIN</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.subtitle}>System Ledger</Text>
          <Text style={styles.title}>AUDIT CHAIN</Text>
          <Text style={styles.desc}>Immutable transaction log for all field assets. Chain integrity is verified every 60 seconds.</Text>

          <View style={styles.actionCard}>
            <View style={styles.statusRow}>
              <View style={styles.statusDot} />
              <View>
                <Text style={styles.statusLabel}>Integrity Status</Text>
                <Text style={styles.statusValue}>CHAIN SECURED</Text>
              </View>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.btnOutline}><Text style={styles.btnOutlineText}>VERIFY CHAIN</Text></TouchableOpacity>
              <TouchableOpacity style={styles.btn}><Text style={styles.btnText}>SIMULATE TAMPER</Text></TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Audit Blocks */}
        <View style={styles.timeline}>
          <AuditBlock 
            assetName="XM-842 RIFLE" assetId="SN-7729-DELTA" 
            action="RETURNED" time="14:02:44 UTC" 
            user="SGT. KOVALSKY" userInitials="S.K" 
            hash="8f3b2a91c7e4d5f0b1a2c3d4e5f6a7b8" 
          />
          <AuditBlock 
            assetName="MQ-9 REAPER" assetId="DR-990-SEC" 
            action="CHECK-OUT" time="11:15:20 UTC" 
            user="CPT. MILLER" userInitials="C.M" 
            hash="e3b0c44298fc1c149afbf4c8996fb924" 
          />
          <AuditBlock 
            assetName="GENESIS BLOCK" assetId="SYSTEM STARTUP" 
            action="ENCRYPTED" time="00:00:01 UTC" 
            user="ROOT SYSTEM" userInitials="ADM" 
            hash="00000000000000000000000000000000" 
            isGenesis 
          />
        </View>
        
        {/* Metadata Footer */}
        <View style={styles.metadataCard}>
           <Text style={styles.metadataTitle}>Chain Metadata</Text>
           <View style={styles.metadataGrid}>
             <View><Text style={styles.metaLabel}>Block Count</Text><Text style={styles.metaValue}>42,901</Text></View>
             <View><Text style={styles.metaLabel}>Avg Time</Text><Text style={styles.metaValue}>0.42s</Text></View>
             <View><Text style={styles.metaLabel}>Difficulty</Text><Text style={styles.metaValue}>8.4P</Text></View>
             <View><Text style={styles.metaLabel}>Size</Text><Text style={styles.metaValue}>1.2 TB</Text></View>
           </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const AuditBlock = ({assetName, assetId, action, time, user, userInitials, hash, isGenesis = false}: any) => (
  <View style={[styles.blockCard, isGenesis && { borderColor: '#34562e', borderWidth: 2 }]}>
    <View style={[styles.blockAccent, isGenesis && { backgroundColor: '#34562e' }]} />
    <View style={styles.blockContent}>
      
      <View style={styles.blockSection}>
        <Text style={styles.blockLabel}>Asset Identity</Text>
        <Text style={styles.assetName}>{assetName}</Text>
        <Text style={styles.assetId}>{assetId}</Text>
      </View>
      
      <View style={styles.blockSection}>
        <Text style={styles.blockLabel}>Action</Text>
        <Text style={styles.actionText}>{action}</Text>
        <Text style={styles.timeText}>{time}</Text>
      </View>

      <View style={styles.blockSection}>
        <Text style={styles.blockLabel}>Authorized User</Text>
        <View style={styles.userRow}>
          <View style={styles.userAvatar}><Text style={styles.avatarText}>{userInitials}</Text></View>
          <Text style={styles.userName}>{user}</Text>
        </View>
      </View>

      <View style={styles.hashBox}>
        <Text style={styles.blockLabel}>Current Hash (SHA-256)</Text>
        <Text style={styles.hashText} numberOfLines={1} ellipsizeMode="middle">{hash}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdf9ee' },
  headerTop: { padding: 20, borderBottomWidth: 2, borderBottomColor: '#f2eee3', backgroundColor: '#ffffff' },
  headerTitle: { fontSize: 20, fontWeight: '900', color: '#34562e' },
  scrollContent: { padding: 16 },
  headerSection: { marginBottom: 24 },
  subtitle: { fontSize: 10, fontWeight: '900', color: '#5a5f65', letterSpacing: 2, textTransform: 'uppercase' },
  title: { fontSize: 32, fontWeight: '900', color: '#34562e', textTransform: 'uppercase', marginVertical: 4 },
  desc: { fontSize: 14, color: '#5a5f65', lineHeight: 20, marginBottom: 16 },
  actionCard: { backgroundColor: '#ffffff', padding: 16, borderRadius: 8, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  statusRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f2eee3', padding: 12, borderRadius: 4, borderLeftWidth: 4, borderLeftColor: '#2F7A4D', marginBottom: 16 },
  statusDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#2F7A4D', marginRight: 12 },
  statusLabel: { fontSize: 10, fontWeight: 'bold', color: '#5a5f65', textTransform: 'uppercase' },
  statusValue: { fontSize: 14, fontWeight: '900', color: '#2F7A4D' },
  buttonRow: { flexDirection: 'row', gap: 12 },
  btnOutline: { flex: 1, borderWidth: 2, borderColor: '#5a5f65', padding: 12, borderRadius: 4, alignItems: 'center' },
  btnOutlineText: { color: '#5a5f65', fontWeight: 'bold', fontSize: 12, letterSpacing: 1 },
  btn: { flex: 1, backgroundColor: '#7f3b00', padding: 12, borderRadius: 4, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 12, letterSpacing: 1 },
  timeline: { paddingLeft: 8, borderLeftWidth: 2, borderLeftColor: '#f2eee3' },
  blockCard: { backgroundColor: '#ffffff', borderRadius: 8, marginBottom: 16, flexDirection: 'row', overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  blockAccent: { width: 4, backgroundColor: '#2F7A4D' },
  blockContent: { flex: 1, padding: 16, gap: 12 },
  blockSection: { marginBottom: 4 },
  blockLabel: { fontSize: 10, fontWeight: 'bold', color: '#5a5f65', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  assetName: { fontSize: 16, fontWeight: '900', color: '#34562e' },
  assetId: { fontSize: 12, color: '#5a5f65', marginTop: 2 },
  actionText: { fontSize: 14, fontWeight: 'bold', color: '#34562e' },
  timeText: { fontSize: 12, color: '#5a5f65' },
  userRow: { flexDirection: 'row', alignItems: 'center' },
  userAvatar: { width: 24, height: 24, borderRadius: 4, backgroundColor: '#f2eee3', alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  avatarText: { fontSize: 10, fontWeight: 'bold', color: '#1c1c15' },
  userName: { fontSize: 14, fontWeight: 'bold', color: '#1c1c15' },
  hashBox: { backgroundColor: '#f2eee3', padding: 12, borderRadius: 4 },
  hashText: { fontSize: 12, fontFamily: 'monospace', color: '#34562e' },
  metadataCard: { backgroundColor: '#ffffff', padding: 16, borderBottomWidth: 4, borderBottomColor: '#f2eee3', borderRadius: 8, marginTop: 16 },
  metadataTitle: { fontSize: 12, fontWeight: '900', color: '#5a5f65', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 },
  metadataGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16 },
  metaLabel: { fontSize: 10, fontWeight: 'bold', color: '#5a5f65', textTransform: 'uppercase' },
  metaValue: { fontSize: 20, fontWeight: '900', color: '#34562e', marginTop: 4 }
});
