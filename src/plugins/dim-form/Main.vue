<template>
  <div>
    <v-container fluid>
      <v-layout row v-for="(content, i) in content" :key="`${keyName}-${i}`">
        <v-layout wrap v-if="content.subheader" class="mt-2">
          <v-flex xs12>
            <v-subheader class="pl-1 body-2 font-weight-black">{{
              content.subheader
            }}</v-subheader>
          </v-flex>
        </v-layout>
        <v-layout wrap v-if="content.divider">
          <v-flex xs12>
            <v-divider class="mb-2"></v-divider>
          </v-flex>
        </v-layout>
        <v-layout class="my-2" v-else>
          <v-flex xs3 v-if="!dense">
            <v-subheader class="body-2 px-1" style="height: 36px;">{{
              content.title
            }}</v-subheader>
          </v-flex>
          <v-flex :class="dense ? `xs12` : `xs9`">
            <!-- text-field -->
            <v-text-field
              v-if="content.type === 'text-field'"
              dense
              v-model="target[content.name]"
              :disabled="content.disabled || disabled"
              :label="dense ? `${content.title}` : ``"
              :readonly="content.readonly"
              :single-line="dense ? false : true"
              :type="content.inputType"
              :rules="content.rules"
              :prepend-icon="content.prependIcon"
              :append-icon="content.appendIcon"
              @change="content.changeFunc ? content.changeFunc() : () => {}"
              outlined
              class="body-2"
              hide-details
            ></v-text-field>

            <!-- text-area -->
            <v-textarea
              v-else-if="content.type === 'text-area'"
              dense
              class="body-2"
              :rules="content.rules"
              :readonly="content.readonly"
              v-model="target[content.name]"
              :disabled="content.disabled || disabled"
              @change="content.changeFunc ? content.changeFunc() : () => {}"
              :label="dense ? `${content.title}` : ``"
              outlined
              hide-details
            ></v-textarea>

            <!-- switch -->
            <v-switch
              v-else-if="content.type === `switch`"
              :label="dense ? `${content.title}` : ``"
              class="mt-0 body-2"
              color="primary"
              :rules="content.rules"
              :readonly="content.readonly"
              @change="content.changeFunc ? content.changeFunc() : () => {}"
              :true-value="
                content.trueValue != undefined ? content.trueValue : 'true'
              "
              :false-value="
                content.falseValue != undefined ? content.falseValue : 'false'
              "
              hide-details
              v-model="target[content.name]"
              :disabled="content.disabled || disabled"
            ></v-switch>

            <!-- radio -->
            <v-radio-group
              v-else-if="content.type === `radio`"
              v-model="target[content.name]"
              :disabled="content.disabled || disabled"
              :row="content.row"
              :readonly="content.readonly"
              @change="content.changeFunc ? content.changeFunc() : () => {}"
            >
              <template v-slot:label>
                <div>{{ content.label }}</div>
              </template>
              <v-radio
                v-for="(n, i) in content.list"
                :key="i"
                :label="n[content.text]"
                :value="n[content.value]"
              ></v-radio>
            </v-radio-group>

            <!-- tags -->
            <v-combobox
              v-else-if="content.type === 'tags'"
              dense
              class="body-2"
              :label="dense ? `${content.title}` : ``"
              outlined
              :rules="content.rules"
              :readonly="content.readonly"
              :disabled="content.disabled || disabled"
              v-model="target[content.name].data"
              multiple
              @change="content.changeFunc ? content.changeFunc() : () => {}"
              chips
              hide-details
            ></v-combobox>
            <!-- file-input-->
            <v-file-input
              v-else-if="content.type === 'file-input'"
              :disabled="content.disabled || disabled"
              class="body-2"
              :rules="content.rules"
              :readonly="content.readonly"
              :label="dense ? `${content.title}` : ``"
              :hint="
                target[content.name] !== ''
                  ? `已上传 ${target[content.name]}`
                  : `未上传`
              "
              persistent-hint
              :placeholder="
                target[content.name] !== ''
                  ? `...
                  ${(target[content.name] || '').slice(-20)}`
                  : `上传文件`
              "
              dense
              prepend-icon=""
              prepend-inner-icon="mdi-upload-outline"
              append-outer-icon="mdi-download-outline"
              @change="content.changeFunc"
              @click:append-outer="
                content.downFunc ? content.downFunc() : () => {}
              "
              outlined
              :display-size="1000"
            >
            </v-file-input>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  components: {},
  name: 'dim-form',
  props: {
    dense: Boolean,
    keyName: String,
    content: Array,
    target: Object,
    disabled: Boolean,
  },
  data() {
    return {};
  },
  mounted() {},
};
</script>

<style></style>
