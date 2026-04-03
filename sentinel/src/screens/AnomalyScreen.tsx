import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const AnomalyScreen = () => {
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerTop}>
        <Text style={styles.headerTitle}>SENTINELCHAIN</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header Sector */}
        <View style={styles.headerSection}>
          <Text style={styles.subtext}>Surveillance Core</Text>
          <Text style={styles.title}>AI ANOMALY DETECTION</Text>

          <View style={styles.alertBox}>
            <Text style={styles.alertLabel}>CRITICAL INCIDENT</Text>
            <Text style={styles.alertDesc}>⚠ Unauthorized access detected in Vault Cluster 4</Text>
          </View>
        </View>

        {/* Dashboard Grid Simulation */}
        <View style={styles.grid}>
          {/* Threat Intensity & Scanner */}
          <View style={styles.col}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Threat Intensity</Text>
              <View style={styles.gaugeContainer}>
                <View style={styles.gaugeMock}>
                  <Text style={styles.gaugeVal}>74</Text>
                  <Text style={styles.gaugeLabel}>HIGH RISK</Text>
                </View>
              </View>
            </View>

            <View style={[styles.card, { borderTopWidth: 4, borderTopColor: '#34562e' }]}>
              <Text style={styles.cardTitle}>Scan Asset ID</Text>
              <View style={styles.mockCamera}>
                <Text style={{color: '#fff', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase'}}>
                   {scanning ? 'VERIFYING...' : 'CAMERA FEED MOCK'}
                </Text>
              </View>
              <TouchableOpacity style={styles.scanBtn} onPress={handleScan} disabled={scanning}>
                <Text style={styles.scanBtnText}>{scanning ? 'SCANNING...' : 'SCAN ASSET'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Anomalies List */}
          <View style={styles.col}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Suspicious Patterns</Text>
              <PatternItem title="Late night access" desc="Unauthorized cluster engagement between 02:00 - 04:00 UTC." hits="3 Hits" score="Score 82" color="#7f3b00" />
              <PatternItem title="Role usage" desc="Admin privileges invoked without valid mission ID ticket." hits="12 Hits" score="Score 65" color="#34562e" />
              <PatternItem title="Bulk withdrawals" desc="Rapid asset transfer exceeding tactical threshold of 5.0m." hits="1 Hit" score="Score 98" color="#ba1a1a" />
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Active Alerts</Text>
              <View style={styles.activeAlertRow}>
                <Text style={styles.activeAlertLabel}>🚨 Mass decryption attempt</Text>
              </View>
              <View style={styles.activeAlertRowGray}>
                <Text style={styles.activeAlertLabelGray}>Accountability Flagged</Text>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const PatternItem = ({title, desc, hits, score, color}: any) => (
  <View style={[styles.patternItem, { borderLeftColor: color }]}>
    <Text style={styles.patternTitle}>{title}</Text>
    <Text style={styles.patternDesc}>{desc}</Text>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
      <Text style={styles.patternMeta}>{hits}</Text>
      <Text style={[styles.patternMeta, {fontWeight: '900', color: '#1c1c15'}]}>{score}</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdf9ee' },
  headerTop: { padding: 20, backgroundColor: '#ffffff', borderBottomWidth: 2, borderBottomColor: '#f2eee3' },
  headerTitle: { fontSize: 20, fontWeight: '900', color: '#34562e' },
  scroll: { padding: 16 },
  headerSection: { marginBottom: 24 },
  subtext: { fontSize: 10, fontWeight: '900', color: '#7f3b00', textTransform: 'uppercase', letterSpacing: 2 },
  title: { fontSize: 28, fontWeight: '900', color: '#34562e', marginBottom: 16 },
  alertBox: { backgroundColor: '#ba1a1a', padding: 16, borderRadius: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 4 },
  alertLabel: { fontSize: 10, fontWeight: 'bold', color: '#fff', letterSpacing: 1 },
  alertDesc: { fontSize: 14, fontWeight: '500', color: '#fff', marginTop: 4 },
  grid: { gap: 16 },
  col: { gap: 16 },
  card: { backgroundColor: '#ffffff', padding: 16, borderRadius: 8, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  cardTitle: { fontSize: 10, fontWeight: 'bold', color: '#5a5f65', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 },
  gaugeContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 16 },
  gaugeMock: { width: 140, height: 140, borderRadius: 70, borderWidth: 12, borderColor: '#ffdad6', borderTopColor: '#ba1a1a', borderRightColor: '#ba1a1a', alignItems: 'center', justifyContent: 'center' },
  gaugeVal: { fontSize: 36, fontWeight: '900', color: '#1c1c15' },
  gaugeLabel: { fontSize: 10, fontWeight: 'bold', color: '#ba1a1a', letterSpacing: 1, marginTop: 4 },
  mockCamera: { width: '100%', height: 200, backgroundColor: '#1c1c15', alignItems: 'center', justifyContent: 'center', borderRadius: 4, marginBottom: 12 },
  scanBtn: { backgroundColor: '#34562e', padding: 16, borderRadius: 4, alignItems: 'center' },
  scanBtnText: { color: '#fff', fontSize: 12, fontWeight: '900', letterSpacing: 2 },
  patternItem: { padding: 16, backgroundColor: '#f7f3e8', borderLeftWidth: 4, marginBottom: 12, borderRadius: 4 },
  patternTitle: { fontSize: 12, fontWeight: '900', color: '#1c1c15', textTransform: 'uppercase', marginBottom: 4 },
  patternDesc: { fontSize: 10, color: '#5a5f65', lineHeight: 14 },
  patternMeta: { fontSize: 9, fontWeight: 'bold', color: '#5a5f65', textTransform: 'uppercase', letterSpacing: 1 },
  activeAlertRow: { backgroundColor: '#ffdad6', padding: 12, borderLeftWidth: 4, borderLeftColor: '#ba1a1a', marginBottom: 8 },
  activeAlertLabel: { color: '#ba1a1a', fontSize: 10, fontWeight: '900', textTransform: 'uppercase' },
  activeAlertRowGray: { backgroundColor: '#e6e2d7', padding: 12, borderLeftWidth: 4, borderLeftColor: '#7f3b00' },
  activeAlertLabelGray: { color: '#7f3b00', fontSize: 10, fontWeight: '900', textTransform: 'uppercase' }
});
