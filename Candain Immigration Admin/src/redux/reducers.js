// @flow
import { combineReducers } from 'redux';
import Auth from './auth/reducers';
import Layout from './layout/reducers';
import { EmployeeList, EmployeeCreate, EmployeeUpdate, EmployeeDetails } from './employee/reducers';
import { StoreList, StoreCreate, StoreUpdate, StoreDetails } from './locationStore/reducers';
import { OrderList } from "./transactions/order/reducers"
import { PackageList } from './transactions/packageList/reducer'
import { AssignedPackageList, AssignPackageCreate } from './transactions/assignedPackageList/reducer'
import { AdminProfile } from './organizations/adminProfile/reducers';
import { SmsAndEmail } from './organizations/smsAndEmailSetting/reducers';
import { ServiceCategoryList, ServiceCategoryUpdate } from './productService/serviceCategory/reducers'
import { BrandList, BrandCreate, BrandUpdate } from './productService/productBrand/reducers'
import { DefectList, DefectCreate, DefectUpdate } from './productService/productDefects/reducers'

export default (combineReducers({
    Auth,
    Layout,
    EmployeeList,
    EmployeeCreate,
    EmployeeUpdate,
    EmployeeDetails,
    StoreList,
    StoreCreate,
    StoreDetails,
    StoreUpdate,
    OrderList,
    PackageList,
    AssignedPackageList,
    AssignPackageCreate,
    AdminProfile,
    SmsAndEmail,
    BrandList,
    BrandCreate,
    BrandUpdate,
    ServiceCategoryList,
    ServiceCategoryUpdate,
    DefectList,
    DefectCreate,
    DefectUpdate,
    AssignedPackageList, AssignPackageCreate
}));
