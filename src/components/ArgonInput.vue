<template>
  <div class="form-group">
    <div :class="hasIcon(icon)">
      <span
        v-if="iconDir === 'left'"
        class="input-group-text"
        @click="toggleShowIcon"
      >
        <i :class="getIcon(icon)"></i>
      </span>
      <input
        :type="type"
        class="form-control"
        :class="getClasses(size, valid)"
        :name="name"
        :id="id"
        :placeholder="placeholder"
        :isRequired="isRequired"
        :value="value"
        @input="updateInputValue($event.target.value)"
        :max="max"
      />
      <span
        v-if="iconDir === 'right'"
        class="input-group-text cursor-pointer"
        @click="$emit('toggleIcon')"
      >
        <i :class="getIcon(icon)"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "argon-input",
  data() {
    return {
      value_copy: this.value,
    };
  },
  props: {
    size: {
      type: String,
      default: "default",
    },
    valid: {
      type: Boolean,
      default: false,
    },
    hoverCursor: {
      type: Boolean,
      default: false,
    },
    icon: String,
    iconDir: String,
    name: String,
    id: String,
    value: String,
    placeholder: String,
    type: String,
    isRequired: Boolean,
    max: String,
  },
  methods: {
    toggleShowIcon() {
      console.log("hi");
      this.$emit("toggleIcon");
    },
    getClasses: (size, valid) => {
      let sizeValue, isValidValue;

      sizeValue = size ? `form-control-${size}` : null;

      isValidValue = valid ? `${valid}` : "invalid";

      return `${sizeValue} ${isValidValue}`;
    },
    getIcon: (icon) => (icon ? icon : null),
    hasIcon: (icon) => (icon ? "input-group" : null),
    updateInputValue(value) {
      this.$emit("update:modelValue", value);
    },
  },
};
</script>
