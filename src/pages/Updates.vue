<template>
    <div class="updates">
      <patch-note v-for="note in notes" :title="note.title" :notes="note.notes" :key="note.title" :date="note.date"></patch-note>
    </div>
</template>

<script>
import PatchNote from './../components/PatchNote';

export default {
  components: {
    PatchNote,
  },
  data() {
    return {
      notes: [
        {
          title: 'Bug Fix - preview highest spread %',
          notes: ['Fixed bug where highest spread was left until page reload'],
          date: '03/17/2018',
        },
        {
          title: 'Preview of highest spread % added',
          notes: ['Chip next to exchanges added to find the highest spread'],
          date: '03/12/2018',
        },
        {
          title: 'Quick Select Buttons for Graph Ranges added',
          notes: [
            'Buttons for Today, Yesterday, Last 7 Days, This Month, Last 30 Days, and Year to Date added',
            'Click a button to reload graph with predefined ranges',
          ],
          date: '03/12/2018',
        },
        {
          title: 'Date Range Picker added',
          notes: [
            'Date range picker was added for custom graph ranges',
            'Select a start date and end date to reload graph with data inbetween those ranges if it exists',
            'Max range is a 365/366 days or 1 year',
          ],
          date: '03/12/2018',
        },
        {
          title: 'Update timing for data change',
          notes: [
            'Each Symbol now updates twice every 10 minutes. Up from once every 10 minutes',
            'Data is stored once every hour',
          ],
          date: '03/11/2018',
        },
      ],
    };
  },
  created() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.updates {
  display: flex;
  flex-direction: column;
  align-content: space-between;
  align-items: center;
  justify-content: space-between;
}
</style>
