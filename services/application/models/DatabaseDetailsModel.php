<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/* @author         Akshatha */
class DatabaseDetailsModel extends CI_model
{

	protected $databaseDetailsFields = [
		"Instance_Name",
		"Database_Host",
		"Login_Id",
		"Password",
		"Path_Id",
		"Active_Status"
	];
	function __construct()
	{
		parent::__construct();
	}
	public function fetch_all_database()
	{
		$query = $this->db->get('tb_server_db_details');
		if($query->num_rows() > 0 )
		{
			return $query->result();
		}
	}

	public function addDatabaseDetails($data)
	{
		$values = array();
        foreach ($data as $key => $value) {
            if (in_array($key, $this->databaseDetailsFields)) {
                $values[$key] = $value;
            }
        }
		$this->db->insert('tb_server_db_details', $values);
		return $this->db->insert_id();
	}

	public function updateDatabaseDetails($data)
	{
		$values = array();
        foreach ($data as $key => $value) {
            if (in_array($key, $this->databaseDetailsFields)) {
                $values[$key] = $value;
            }
        }
		$this->db->where('Id', $data["Id"]);
        $this->db->update('tb_server_db_details', $values);
    }
}
?>