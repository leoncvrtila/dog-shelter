<template>
  <q-table
    :rows="dogs"
    :columns="columns"
    row-key="name"
    binary-state-sort
    v-if="!$q.screen.xs && !$q.screen.sm"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="name" :props="props">{{ props.row.name }}</q-td>
        <q-td key="breed" :props="props">{{ props.row.breed_group }}</q-td>
        <q-td key="lifeSpan" :props="props">{{ props.row.life_span }}</q-td>
        <q-td key="origin" :props="props">{{ props.row.origin }}</q-td>
        <q-td key="bredFor" :props="props">{{ props.row.bred_for }}</q-td>
      </q-tr>
    </template>
  </q-table>

  <q-table
    :rows="dogs"
    :columns="columns"
    row-key="name"
    binary-state-sort
    v-if="$q.screen.xs || $q.screen.sm"
    grid
  >
    <template v-slot:item="props">
      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
        <q-card>
          <q-card-section :class="cardSectionClass">
            <label>Name</label>
            <br />
            {{ props.row.name }}
          </q-card-section>
          <q-card-section :class="cardSectionClass">
            <label>Breed</label>
            <br />
            {{ props.row.breed_group }}
          </q-card-section>
          <q-card-section :class="cardSectionClass">
            <label>Lifespan</label>
            <br />
            {{ props.row.life_span }}
          </q-card-section>
          <q-card-section :class="cardSectionClass">
            <label>Origin</label>
            <br />
            {{ props.row.origin }}
          </q-card-section>
          <q-card-section :class="cardSectionClass">
            <label>Bred for</label>
            <br />
            {{ props.row.bred_for }}
          </q-card-section>
        </q-card>
      </div>
    </template>
  </q-table>
</template>

<script lang="ts">
export default {
  props: {
    columns: {
      type: Array,
      required: true,
    },
    dogs: {
      type: Array,
      required: true,
    },
  },
  setup() {
    return {
      cardSectionClass: "q-pl-md q-pb-none q-pt-sm text-caption",
      cardSectionActionsClass: "q-pl-md q-pb-md q-pt-sm text-caption",
    };
  },
};
</script>

<style scoped>
label {
  color: #696969;
}
</style>
