SELECT (SUM(time) - MIN(time) - MAX(time)) / 10
FROM (SELECT time 
	  from solves
	  order by solve_id desc
	  limit 12
	 ) as avg_table;