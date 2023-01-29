<template>
  <q-table
    :rows="dogs"
    :columns="columns"
    row-key="name"
    binary-state-sort
    grid
    v-if="viewType === ViewType.Cards"
  >
    <template v-slot:item="props">
      <div class="q-pa-xs col-xs-12 col-sm-5 col-md-4">
        <q-card :class="cardClass" :key="props.row.id">
          <q-card-section>
            <div
              :class="` ${
                !$q.screen.xs && !$q.screen.sm && !$q.screen.md
                  ? 'text-h6'
                  : 'text-subtitle2'
              }  text-center title`"
            >
              {{ props.row.name }}
            </div>
          </q-card-section>

          <img
            :src="props.row.image.url"
            :style="`height: ${imageSize} ; width: ${imageSize}; margin: auto`"
          />

          <q-card-section
            :class="`q-ml-md ${isBigScreen ? '' : 'q-py-sm q-px-none'}`"
          >
            <div :class="titleType">
              Breed: {{ props.row.breed_group ? props.row.breed_group : "/" }}
            </div>
            <div :class="titleType">
              Lifespan: {{ props.row.life_span ? props.row.life_span : "/" }}
            </div>
            <div :class="titleType">
              Origin: {{ props.row.origin ? props.row.origin : "/" }}
            </div>
            <div :class="titleType">
              Bred for: {{ props.row.bred_for ? props.row.bred_for : "/" }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </template>
  </q-table>

  <q-table
    :rows="dogs"
    :columns="columns"
    row-key="name"
    binary-state-sort
    grid
    v-if="viewType === ViewType.MiniCards"
  >
    <template v-slot:item="props">
      <div class="q-pa-xs col-xs-12 col-sm-5 col-md-4">
        <q-card :class="cardClass" :key="props.row.id">
          <q-card-section>
            <div class="text-subtitle2 text-center title">
              {{ props.row.name }}
            </div>
          </q-card-section>

          <img
            :src="props.row.image.url"
            style="height: 100px; width: 100px; margin: auto"
          />
        </q-card>
      </div>
    </template>
  </q-table>
</template>

<script lang="ts">
import { useQuasar } from "quasar";
import { ViewType } from "src/core/enums/view-types.enum";
import { computed, reactive } from "vue";

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
    viewType: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const $q = useQuasar();

    const dogs = computed(() => props.dogs);

    const viewTypeProps = computed(() => props.viewType);

    const reactiveScreenSize = reactive({
      xs: $q.screen.xs,
      sm: $q.screen.sm,
      md: $q.screen.md,
      lg: $q.screen.lg,
      xl: $q.screen.xl,
    });

    const isBigScreen =
      !reactiveScreenSize.xs &&
      !reactiveScreenSize.sm &&
      !reactiveScreenSize.md;

    return {
      cardSectionClass: "q-pl-md q-pb-none q-pt-sm text-caption",
      cardSectionActionsClass: "q-pl-md q-pb-md q-pt-sm text-caption",
      cardClass:
        !reactiveScreenSize.xs && !reactiveScreenSize.sm
          ? "col-3 q-pa-sm q-ma-md"
          : "q-pa-xs col-xs-12 col-sm-5 col-md-4 q-ma-sm",
      imageSize: isBigScreen ? "200px" : "100px",
      titleType: isBigScreen ? "text-subtitle2" : "text-caption",
      isBigScreen,
      dogs,
      ViewType,
      viewTypeProps,
    };
  },
};
</script>

<style scoped>
label {
  color: #696969;
}
</style>
