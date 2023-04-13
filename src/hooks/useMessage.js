import { message } from "ant-design-vue";
export default function useMessage() {
  const success = (content) => {
    message.success(content);
  };
  const error = (content) => {
    message.error(content);
  };
  const warning = (content) => {
    message.warning(content);
  };
  const info = (content) => {
    message.info(content);
  };
  const loading = (content) => {
    message.loading(content);
  };
  return {
    success,
    error,
    warning,
    info,
    loading,
  };
}
