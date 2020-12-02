"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jale_1 = require("../utils/jale");
const myCnf = `[client]
user=root
password=root
host=localhost

[mysqld]
sql_mode="NO_ENGINE_SUBSTITUTION"
innodb_file_per_table=OFF
show_compatibility_56=ON
open_files_limit=999999
log-error=${jale_1.jaleLogsPath}/mysql.log
local_infile=ON
secure_file_priv=""
max_allowed_packet=1073741824
max_connections=100000
key_buffer_size=1024M
innodb_buffer_pool_size=1024M
query_cache_size=67108864
query_cache_type=1
query_cache_limit=4194304
table_open_cache=4096
innodb_buffer_pool_instances=24
myisam_sort_buffer_size=1024M
innodb_sort_buffer_size=1024M
sort_buffer_size=1024M
innodb_flush_log_at_trx_commit=0
innodb_log_file_size=25M
interactive_timeout=3600
max_connect_errors=1000000
thread_cache_size=1024
[mysqld_safe]
open_files_limit=999999
`;
exports.default = myCnf;
//# sourceMappingURL=myCnf.js.map