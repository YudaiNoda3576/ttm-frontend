<template>
  <div>
      <template>
        <v-data-table
          :headers="headers"
          :items="dankaList"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          sort-by="calories"
          class="elevation-1"
          @page-count="pageCount = $event"
          hide-default-footer
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>檀家一覧</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    新規作成
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.seshuName"
                            label="施主名"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.koshuName"
                            label="戸主名"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.koshuName2"
                            label="戸主名２"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.phonenumber"
                            label="電話番号"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.mailAddress"
                            label="メールアドレス"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.address"
                            label="住所"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.remark"
                            label="備考"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      取消
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save()">
                      保存
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5"
                    >削除してもよろしいですか？</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >取消</v-btn
                    >
                    <v-btn color="red darken-1" text @click="deleteItemConfirm"
                      >削除</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon  color="green" class="mr-6" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon color="red" @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="getDanakList()"> Reset </v-btn>
          </template>
        </v-data-table>
        <div class="text-right pt-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
          <v-text-field
            :value="itemsPerPage"
            label="Items per page"
            type="number"
            min="-1"
            max="15"
            @input="itemsPerPage = parseInt($event, 10)"
          ></v-text-field>
        </div>
      </template>
  </div>
</template>

<script>
export default {
  name: "DankaList",
  data: () => ({
    dankaList: [],
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "施主名",
        align: "start",
        value: "dnkSeshuName",
      },
      { text: "戸主名", value: "dnkKoshuName" },
      { text: "戸主名２", value: "dnkKoshuName2" },
      { text: "住所", value: "dnkAddress1" },
      { text: "電話番号", value: "dnkPhonenumber1" },
      { text: "メールアドレス", value: "dnkEmail1" },
      { text: "備考", value: "dnkBikou1" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      seshuName: "",
      koshuName: "",
      koshuName2: "",
      address: "",
      phonenumber: "",
      mailAddress: "",
      remark: ""
    },
    defaultItem: {
      seshuName: "",
      koshuName: "",
      koshuName2: "",
      address: "",
      phonenumber: "",
      mailAddress: "",
      remark: ""
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "新規登録" : "編集";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.getDanakList();
  },
  methods: {
    getDanakList() {
      const _this = this;
      this.$axios.get("/danka").then(response => {
        console.log(response.data);
        _this.dankaList = response.data;
      });
    },
    editItem(item) {
      this.editedIndex = this.dankaList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.dankaList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.dankaList.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      // 編集の場合はif句の処理、新規登録の場合はelse句の処理
      if (this.editedIndex > -1) {
        const dankaId = this.editedIndex + 1;
        
        Object.assign(this.dankaList[this.editedIndex], this.editedItem);
        
        this.$axios.post(`/dankaList/update/${dankaId}`, {
        seshuName: this.editedItem.seshuName,
        koshuName: this.editedItem.koshuName,
        koshuName2: this.editedItem.koshuName2,
        address: this.editedItem.address,
        phonenumber: this.editedItem.phonenumber,
        mailAddress: this.editedItem.mailAddress,
        remark: this.editedItem.remark
        }).then(() => {
          console.log("更新に成功しました");
        })
      } else {
        // const _this = this;
        this.$axios.post(`/dankaList/save`, {
          seshuName: this.editedItem.seshuName,
          koshuName: this.editedItem.koshuName,
          koshuName2: this.editedItem.koshuName2,
          address: this.editedItem.address,
          phonenumber: this.editedItem.phonenumber,
          mailAddress: this.editedItem.mailAddress,
          remark: this.editedItem.remark
        }).then(() => {
          console.log("保存に成功しました");
        })
      }
      this.close();
    },
  },
};
</script>
