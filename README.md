# Atoms.LogDecoder

A client-side decoder for parsing Base64 encoded Gzipped text, useful if you are wanting to log larger blobs of text, but don't want to have big log messages.

## Data Encoding Process

The data encoding process involves three steps:
1. Serialize data to JSON
2. Compress the JSON using GZip
3. Encode the compressed data as Base64

This process significantly reduces the size of large log messages while maintaining readability and compatibility.

## Examples

### C# Example

```csharp
using System.IO.Compression;
using System.Text;
using System.Text.Json;

public async Task<string> EncodeData<T>(T data)
{
    // Serialize to JSON
    var json = JsonSerializer.SerializeToUtf8Bytes(data);
    
    // Prepare a MemoryStream to collect the base64 output
    using var base64Output = new MemoryStream();
    await using (var cryptoStream = new CryptoStream(
                    base64Output,
                    new ToBase64Transform(),
                    CryptoStreamMode.Write))
    await using (var gzipStream = new GZipStream(cryptoStream, CompressionMode.Compress))
    {
        // Write the serialized JSON to the GZipStream
        await gzipStream.WriteAsync(json, 0, json.Length);
    }

    return Encoding.Default.GetString(base64Output.ToArray());
}
```

### Python Example

```python
import json
import gzip
import base64

def encode_data(data):
    // Serialize to JSON
    json_data = json.dumps(data).encode('utf-8')
    
    // Compress with GZip and encode as Base64
    compressed = gzip.compress(json_data)
    base64_encoded = base64.b64encode(compressed).decode('utf-8')
    
    return base64_encoded
```

### JavaScript Example

```javascript
async function encodeData(data) {
    // Serialize to JSON
    const jsonString = JSON.stringify(data);
    const jsonBytes = new TextEncoder().encode(jsonString);
    
    // Compress with GZip
    const compressed = await new Response(
        new Blob([jsonBytes]).stream().pipeThrough(
            new CompressionStream('gzip')
        )
    ).arrayBuffer();
    
    // Encode as Base64
    const base64String = btoa(
        String.fromCharCode(...new Uint8Array(compressed))
    );
    
    return base64String;
}
```

## Usage

1. Encode your data using one of the examples above
2. Copy the resulting Base64 string
3. Paste it into the decoder on this website
4. View the decoded and formatted data

## Benefits

- **Reduced Size**: GZip compression significantly reduces the size of large log messages
- **Compatibility**: Base64 encoding ensures the data can be safely transmitted and stored
- **Client-Side**: All decoding happens in the browser, no server processing required
- **Privacy**: No data is sent to external servers

## Technical Details

The encoding process follows these steps:
1. Data is serialized to JSON using the native serializer for each language
2. The JSON string is compressed using GZip compression
3. The compressed data is encoded as Base64 to ensure safe transmission

The decoder reverses these steps to display the original data in a readable format.
