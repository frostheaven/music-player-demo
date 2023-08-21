import Vue from 'vue'
//对应于el-后的名称（首字母大写）
import {Container, Aside, Header, Main} from 'element-ui';
import {Menu, Submenu, MenuItemGroup, MenuItem, Dropdown, DropdownItem, DropdownMenu, Table, TableColumn} from 'element-ui'
import { RadioGroup, Radio, RadioButton } from 'element-ui';
import { Button } from 'element-ui';
import { Input } from 'element-ui';
import {Form, FormItem} from 'element-ui';
import {Slider} from 'element-ui';
import {Carousel, CarouselItem} from 'element-ui';
import { Pagination } from 'element-ui'

//引入element-ui主题文件
import '../common/element-variables.scss'

//全局注册
Vue.component(Container.name, Container)
Vue.component(Aside.name, Aside)
Vue.component(Header.name, Header)
Vue.component(Main.name, Main)
Vue.component(Menu.name, Menu)
Vue.component(Submenu.name, Submenu)
Vue.component(MenuItemGroup.name, MenuItemGroup)
Vue.component(MenuItem.name, MenuItem)
Vue.component(Dropdown.name, Dropdown)
Vue.component(DropdownMenu.name, DropdownMenu)
Vue.component(DropdownItem.name, DropdownItem)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(RadioGroup.name,RadioGroup)
Vue.component(Radio.name,Radio)
Vue.component(RadioButton.name,RadioButton)
Vue.component(Button.name, Button)
Vue.component(Input.name, Input)
Vue.component(Form.name,Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Slider.name, Slider)
Vue.component(Carousel.name,Carousel)
Vue.component(CarouselItem.name,CarouselItem)
Vue.component(Pagination.name, Pagination)