<template>
  <a-form
    v-bind="mergeProps"
    v-on="$attrs"
    :model="formModel"
    :rules="formRules"
    ref="formRef"
  >
    <!-- 透传表单字段插槽 -->
    <slot />

    <!-- 扩展：默认提交/重置按钮 -->
    <div v-if="showButton" class="my-form-button-group">
      <a-button type="primary" @click="handleSubmit">
        {{ submitText }}
      </a-button>
      <a-button @click="handleReset" style="margin-left: 8px;">
        {{ resetText }}
      </a-button>
    </div>
  </a-form>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Form as AForm, Button as AButton } from 'ant-design-vue';

const props = defineProps({
  // 表单模型（双向绑定）
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  // 表单校验规则
  rules: {
    type: Object,
    default: () => ({}),
  },
  // 业务默认值：标签宽度、布局
  labelCol: {
    type: Object,
    default: () => ({ span: 6 }),
  },
  wrapperCol: {
    type: Object,
    default: () => ({ span: 16 }),
  },
  // 按钮配置
  showButton: {
    type: Boolean,
    default: true,
  },
  submitText: {
    type: String,
    default: '提交',
  },
  resetText: {
    type: String,
    default: '重置',
  },
});

const emit = defineEmits(['update:modelValue', 'submit', 'reset']);

// 表单实例
const formRef = ref(null);

// 双向绑定表单模型
const formModel = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

// 合并校验规则（业务规则 + 用户规则）
const formRules = computed(() => ({
  // 业务默认规则（如必填项提示统一）
  ...Object.fromEntries(
    Object.keys(props.rules).map(key => [
      key,
      props.rules[key].map(rule => ({
        message: rule.message || `请输入${key}`,
        ...rule,
      })),
    ])
  ),
  ...$attrs.rules, // 透传额外规则
}));

// 合并原组件 props
const mergeProps = computed(() => ({
  labelCol: props.labelCol,
  wrapperCol: props.wrapperCol,
  ...$attrs,
}));

// 提交逻辑
const handleSubmit = async () => {
  try {
    await formRef.value.validate(); // 表单校验
    emit('submit', formModel.value); // 校验通过，触发提交事件
  } catch (error) {
    console.error('表单校验失败：', error);
  }
};

// 重置逻辑
const handleReset = () => {
  formRef.value.resetFields(); // 重置表单字段
  emit('reset'); // 触发重置事件
};
</script>

<style scoped lang="less">
.my-form-button-group {
  margin-top: 16px;
  padding-left: 60px; // 对齐标签宽度
}
</style>