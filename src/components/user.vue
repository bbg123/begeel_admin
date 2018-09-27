<template>
  <div class="user">
    <!-- 添加用户按钮 -->
    <div class="add_btn">
      <el-button @click="dialogFormVisible = true" type="success">添加用户</el-button>
    </div>
    <!-- 列表 -->
    <el-table
    :data="dataList"
    border
    style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别"
        width="180">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop=""
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="handleRevise(scope.row)" type="primary" icon="el-icon-edit" size="small">编辑</el-button>
          <el-button @click="handleDel(scope.row.id)" type="danger" icon="el-icon-delete" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加,编辑弹出框 -->
    <el-dialog title="用户列表" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="70px" class="demo-ruleForm" status-icon>
        <el-form-item label="姓名:" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄:" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="gender">
          <el-radio-group v-model="ruleForm.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地址:" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="handleAdd('ruleForm', ruleForm)">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getUserList, delUser, addUser, reviseUser } from '../api/index.js'
export default {
  data () {
    return {
      dataList: [],
      dialogFormVisible: false,
      ruleForm: {
        name: '',
        age: '',
        gender: '',
        address: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'change' }
        ],
        age: [
          { required: true, message: '年龄不能为空', trigger: 'change' },
          { type: 'number', message: '年龄必须为数字值', trigger: 'change' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 删除用户
    handleDel (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUser({id: id}).then(res => {
          if (res.code === 200) {
            this.$notify({
              title: '成功',
              message: res.msg,
              type: 'success'
            })
            this.get_user_list()
          } else {
            this.$notify.error({
              title: '错误',
              message: res.msg
            })
          }
        })
      })
    },
    // 获取用户数据
    get_user_list () {
      getUserList().then(res => {
        this.dataList = res.list
        this.dataList.forEach((item, i) => {
          // 把性别转换
          if (item.gender === '0') {
            this.dataList[i].gender = '男'
          } else {
            this.dataList[i].gender = '女'
          }
        })
      })
    },
    // 添加用户框
    handleAdd (formName, form) {
      this.$refs[formName].validate((valid) => {
        if (valid && form.age >= 0) {
          if (form.id) {
            reviseUser({
              id: form.id,
              name: form.name,
              address: form.address,
              age: form.age,
              gender: form.gender === '男' ? 0 : 1
            }).then(res => {
              if (res.code === 200) {
                this.$notify({
                  title: '成功',
                  message: res.msg,
                  type: 'success'
                })
                this.get_user_list()
                this.$refs[formName].resetFields()
              } else {
                this.$notify.error({
                  title: '错误',
                  message: res.msg
                })
              }
            })
          } else {
            addUser({
              name: form.name,
              address: form.address,
              age: form.age,
              gender: form.gender === '男' ? 0 : 1
            }).then(res => {
              if (res.code === 200) {
                this.$notify({
                  title: '成功',
                  message: res.msg,
                  type: 'success'
                })
                this.get_user_list()
                this.ruleForm.name = ''
                this.ruleForm.age = ''
                this.ruleForm.gender = ''
                this.ruleForm.address = ''
                this.$refs[formName].resetFields()
              } else {
                this.$notify.error({
                  title: '错误',
                  message: res.msg
                })
              }
            })
          }
          this.dialogFormVisible = false
        } else {
          this.$message.error('信息不正确!!!')
        }
      })
    },
    // 修改用户
    handleRevise (form) {
      this.ruleForm = form
      this.dialogFormVisible = true
    },
    // 取消
    handleCancel (formName) {
      this.dialogFormVisible = false
      this.$refs[formName].clearValidate()
    }
  },
  mounted () {
    this.get_user_list()
  }
}
</script>

<style scoped>
.add_btn {
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
  padding: 0 50px;
}
</style>
