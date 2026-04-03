import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const MapScreen = () => {
  return (
    <View style={styles.container}>
      {/* TopNav Mock */}
      <SafeAreaView style={styles.headerTop} edges={['top']}>
        <Text style={styles.headerTitle}>SENTINELCHAIN</Text>
      </SafeAreaView>

      <View style={styles.mapContainer}>
        {/* Mock Map Background Layer */}
        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: '#c2c8bc', opacity: 0.5 }]} />
        
        {/* Map Grid Layer */}
        <View style={styles.gridOverlay} />

        {/* Tactical Data Chips Overlay */}
        <View style={styles.overlayTopLeft}>
          <View style={styles.chipLarge}>
            <Text style={styles.chipSub}>Regional Status</Text>
            <View style={{flexDirection: 'row', alignItems: 'flex-end', gap: 8}}>
              <Text style={styles.chipMain}>SECTOR-07</Text>
              <Text style={styles.chipStatus}>STABLE</Text>
            </View>
          </View>
          <View style={styles.overlayRow}>
            <View style={styles.chipSmall}>
              <View style={[styles.dot, {backgroundColor: '#34562e'}]} />
              <Text style={styles.chipSmallText}>ACTIVE: 142</Text>
            </View>
            <View style={styles.chipSmall}>
               <View style={[styles.dot, {backgroundColor: '#ba1a1a'}]} />
               <Text style={[styles.chipSmallText, {color: '#ba1a1a'}]}>ALERTS: 03</Text>
            </View>
          </View>
        </View>

        {/* Map Markers Overlay */}
        <View style={[styles.marker, { top: '30%', left: '30%' }]}>
           <View style={styles.markerInnerSafe} />
        </View>
        
        <View style={[styles.marker, { top: '45%', left: '55%' }]}>
           <View style={styles.markerInnerAlert} />
           <View style={styles.markerTooltip}>
             <Text style={styles.markerTooltipText}>ANOMALY_DET_77</Text>
           </View>
        </View>

        {/* Inspection Sidebar / Panel (Mock Mobile Bottom Sheet Style) */}
        <View style={styles.inspectorPanel}>
           <ScrollView contentContainerStyle={{padding: 20}}>
              <Text style={styles.inspectorLabel}>Asset Inspector</Text>
              <Text style={styles.inspectorTitle}>ANOMALY_DET_77</Text>
              <View style={styles.riskBadge}><Text style={styles.riskBadgeText}>HIGH RISK</Text></View>
              
              <View style={styles.dataStrip}>
                 <Text style={styles.inspectorLabel}>Telemetry Analysis</Text>
                 <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
                    <View>
                      <Text style={styles.statLabel}>Risk Score</Text>
                      <Text style={styles.statError}>88.4%</Text>
                    </View>
                    <View>
                      <Text style={styles.statLabel}>Confidence</Text>
                      <Text style={styles.statVal}>0.992</Text>
                    </View>
                 </View>
              </View>

              <View style={styles.table}>
                <TableRow label="Last Activity" val="1.2s AGO" />
                <TableRow label="Protocol Status" val="SUSPENDED" />
                <TableRow label="Deployment" val="TACTICAL_NODE" />
              </View>

              <TouchableOpacity style={styles.btnDanger}>
                <Text style={styles.btnDangerText}>INITIALIZE LOCKDOWN</Text>
              </TouchableOpacity>
           </ScrollView>
        </View>
        
        {/* Floating Map Controls */}
        <View style={styles.mapControls}>
           <Text style={styles.controlBtn}>+</Text>
           <Text style={styles.controlBtn}>-</Text>
        </View>
      </View>
    </View>
  );
};

const TableRow = ({label, val}: any) => (
  <View style={styles.tableRow}>
    <Text style={styles.tableLabel}>{label}</Text>
    <Text style={styles.tableVal}>{val}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdf9ee' },
  headerTop: { padding: 20, backgroundColor: '#ffffff', zIndex: 10, borderBottomWidth: 2, borderBottomColor: '#f2eee3' },
  headerTitle: { fontSize: 20, fontWeight: '900', color: '#34562e' },
  mapContainer: { flex: 1, position: 'relative' },
  gridOverlay: { ...StyleSheet.absoluteFillObject, borderWidth: 1, borderColor: '#e6e2d7', borderStyle: 'dashed', opacity: 0.3 },
  overlayTopLeft: { position: 'absolute', top: 20, left: 20, right: 20, zIndex: 10, alignItems: 'flex-start' },
  chipLarge: { backgroundColor: 'rgba(255,255,255,0.9)', padding: 16, borderRadius: 8, borderLeftWidth: 4, borderLeftColor: '#34562e', marginBottom: 8, width: 250 },
  chipSub: { fontSize: 10, fontWeight: 'bold', color: '#5a5f65', textTransform: 'uppercase', letterSpacing: 1 },
  chipMain: { fontSize: 24, fontWeight: '900', color: '#34562e' },
  chipStatus: { fontSize: 12, fontWeight: 'bold', color: '#4b6f44' },
  overlayRow: { flexDirection: 'row', gap: 8 },
  chipSmall: { backgroundColor: 'rgba(255,255,255,0.9)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 4, flexDirection: 'row', alignItems: 'center', borderColor: '#c2c8bc', borderWidth: 1 },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  chipSmallText: { fontSize: 10, fontWeight: 'bold', color: '#1c1c15', letterSpacing: 1 },
  marker: { position: 'absolute', alignItems: 'center' },
  markerInnerSafe: { width: 16, height: 16, backgroundColor: '#2F7A4D', transform: [{rotate: '45deg'}], borderWidth: 2, borderColor: '#fff' },
  markerInnerAlert: { width: 24, height: 24, backgroundColor: '#ba1a1a', transform: [{rotate: '45deg'}], borderWidth: 2, borderColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  markerTooltip: { marginTop: 12, backgroundColor: '#ba1a1a', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  markerTooltipText: { color: '#fff', fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
  inspectorPanel: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(253, 249, 238, 0.95)', borderTopLeftRadius: 16, borderTopRightRadius: 16, maxHeight: '50%', borderTopWidth: 2, borderTopColor: '#e6e2d7' },
  inspectorLabel: { fontSize: 10, fontWeight: 'bold', color: '#5a5f65', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 },
  inspectorTitle: { fontSize: 24, fontWeight: '900', color: '#34562e', marginBottom: 8 },
  riskBadge: { alignSelf: 'flex-start', backgroundColor: '#ffdad6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  riskBadgeText: { color: '#ba1a1a', fontSize: 10, fontWeight: 'bold' },
  dataStrip: { backgroundColor: '#f2eee3', padding: 16, borderRadius: 8, marginTop: 16, borderBottomWidth: 2, borderBottomColor: '#ba1a1a' },
  statLabel: { fontSize: 12, color: '#5a5f65', fontWeight: 'bold' },
  statError: { fontSize: 32, fontWeight: '900', color: '#ba1a1a' },
  statVal: { fontSize: 18, fontWeight: 'bold', color: '#34562e' },
  table: { marginTop: 16, marginBottom: 24 },
  tableRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#e6e2d7' },
  tableLabel: { fontSize: 10, fontWeight: 'bold', color: '#5a5f65', letterSpacing: 1, textTransform: 'uppercase' },
  tableVal: { fontSize: 12, fontWeight: 'bold', color: '#1c1c15' },
  btnDanger: { backgroundColor: '#ba1a1a', paddingVertical: 16, borderRadius: 8, alignItems: 'center' },
  btnDangerText: { color: '#fff', fontSize: 12, fontWeight: '900', letterSpacing: 1 },
  mapControls: { position: 'absolute', bottom: '55%', right: 20, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 20, padding: 8, gap: 16 },
  controlBtn: { fontSize: 24, color: '#34562e', fontWeight: 'bold', textAlign: 'center' }
});
