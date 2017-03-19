<?php
$fp = fopen('php://input', 'rb');
stream_filter_append($fp, 'dechunk', STREAM_FILTER_READ);
$postData = stream_get_contents($fp);
if ($postData)
{
      // Get the data
      $imageData=$postData;

      // Remove the headers (data:,) part.
      // A real application should use them according to needs such as to check image type
      $filteredData=substr($imageData, strpos($imageData, ",")+1);

      // Need to decode before saving since the data we received is already base64 encoded
      $unencodedData=base64_decode($filteredData,TRUE);

      echo "unencodedData".$unencodedData;

      // Save file.  This example uses a hard coded filename for testing,
      // but a real application can specify filename in POST variable
      $fp = fopen( '/var/www/html/demos/images/test.png', 'wb' );
      fwrite( $fp, $unencodedData);
      fclose( $fp );
}
else
{
	echo "ERROR: no submission";
}
?>
