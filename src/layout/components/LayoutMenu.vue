<script lang="jsx">
import { ref, toRaw } from "vue";
import useUserStore from "@/stores/user";
import { useRouter, useRoute } from "vue-router";
import useRouteStore from "@/stores/route";

export default defineComponent({
  setup(props, { emit }) {
    const router = useRouter();
    const route = useRoute();
    const User = useUserStore();

    const routeStore = useRouteStore();
    const tabslist = routeStore.getTabslist;
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
      console.log(tabslist);
    };
    const handleClick = ({ item, key, keyPath }) => {
      console.log(item, key, keyPath);
      router.push(key);
    };
    function renderMenu(menus) {
      let data = toRaw(menus);
      return data.map((item) => {
        if (item.children && item.children.length > 0) {
          return (
            <a-sub-menu
              index={item.path}
              key={item.path}
              v-slots={{
                title: () => {
                  return <span>{item.name}</span>;
                },
                icon: () => {
                  return (
                    <icon-font
                      style={{ "font-size": "20px" }}
                      type={item.source}
                    />
                  );
                },
              }}
            >
              {/* <span>{item.meta.title}</span> */}

              {renderMenu(item.children)}
            </a-sub-menu>
          );
        } else {
          return (
            <a-menu-item
              key={item.path}
              v-slots={{
                icon: () => {
                  return (
                    <icon-font
                      style={{ "font-size": "20px" }}
                      type={item.source}
                    />
                  );
                },
              }}
            >
              <a-space>{item.name}</a-space>
            </a-menu-item>
          );
        }
      });
    }

    return () => (
      <a-menu
        selectedKeys={[route.path]}
        mode="inline"
        onOpenChange={handleOpen}
        onClick={handleClick}
      >
        {renderMenu(User.getCurrentMenus)}
      </a-menu>
    );
  },
});
</script>

<style lang="less" scoped>
.layout-menu {
  height: 500px;
}
</style>
