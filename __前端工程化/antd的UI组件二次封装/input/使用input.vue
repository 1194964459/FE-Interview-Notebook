<template>
  <!-- 基础使用（继承原 Input 所有能力） -->
  <MyInput
    v-model="username"
    required
    error-message="用户名不能为空"
    maxLength="20"  <!-- 透传原组件 props -->
    @change="handleChange"  <!-- 透传原组件事件 -->
  />

  <!-- 自定义 prefix 插槽（覆盖默认搜索图标） -->
  <MyInput>
    <template #prefix>
      <UserOutlined />
    </template>
  </MyInput>
</template>