<template>
  <!-- 外层容器：添加自定义样式/布局 -->
  <div class="my-input-container">
    <!-- 透传原 Input 的 props、事件、插槽 -->
    <a-input
      v-bind="mergeProps"  <!-- 合并默认 props 和业务 props -->
      v-on="$attrs"        <!-- 透传事件（Vue 3） -->
      :class="customClass"
    >
      <!-- 扩展默认插槽：添加搜索图标 -->
      <template #prefix>
        <SearchOutlined class="my-input-icon" />
        <!-- 透传用户自定义的 prefix 插槽 -->
        <slot name="prefix" />
      </template>
      <!-- 透传其他所有插槽 -->
      <slot v-for="(slot, name) in $slots" :name="name" :key="name" />
    </a-input>

    <!-- 额外业务逻辑：非空校验提示 -->
    <div v-if="showError" class="my-input-error">
      {{ errorMessage || '请输入必填项' }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Input as AInput, SearchOutlined } from 'ant-design-vue';

// 1. 声明业务所需 props（原组件 props 无需重复声明，通过 $attrs 透传）
const props = defineProps({
  // 覆盖原组件默认值：默认占位提示
  placeholder: {
    type: String,
    default: '请输入内容',
  },
  // 新增业务 props：是否必填
  required: {
    type: Boolean,
    default: false,
  },
  // 新增业务 props：错误提示
  errorMessage: String,
  // 新增业务 props：自定义样式
  customClass: String,
});

// 2. 合并默认 props 和用户传入的 props（用户 props 优先级更高）
const mergeProps = computed(() => ({
  // 原组件默认值（如 size: 'middle'）
  size: 'middle',
  // 业务默认值（如 placeholder）
  ...props,
  // 用户传入的其他 props（透传原组件未声明的 props，如 disabled、maxLength）
  ...$attrs,
}));

// 3. 业务逻辑：非空校验（根据 required 和输入值判断）
const showError = computed(() => {
  if (!props.required) return false;
  // 获取输入值（通过原组件的 v-model 绑定，这里通过 $attrs.modelValue 访问）
  const value = $attrs.modelValue;
  return !value || (typeof value === 'string' && value.trim() === '');
});
</script>

<style scoped lang="less">
.my-input-container {
  width: 100%;
  .my-input-icon {
    color: #999;
    cursor: pointer;
    &:hover {
      color: #1890ff;
    }
  }
  .my-input-error {
    margin-top: 4px;
    color: @error-color; // AntD 全局变量
    font-size: 12px;
  }
}
</style>